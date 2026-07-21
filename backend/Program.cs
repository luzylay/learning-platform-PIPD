using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SignalR;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json.Serialization;
using OIT1_API.Hubs;
using OIT1_API.Services;

var builder = WebApplication.CreateBuilder(args);

// Configurar base de datos SQLite para ejecución local sin servidor
builder.Services.AddDbContext<LearningDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar servicios
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Configurar SignalR para comunicación en tiempo real
builder.Services.AddSignalR();

// Configurar CORS para Angular (permitir localhost:4200 y cualquier origen en Docker)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "OIT 1 Learning Platform API", 
        Version = "v1",
        Description = "API para el proyecto integrador de OIT 1"
    });
});

// Configurar HttpClient para el microservicio Python
var pythonApiUrl = builder.Configuration.GetValue<string>("PythonAPI:BaseAddress") ?? "http://localhost:8000";
builder.Services.AddHttpClient("PythonAPI", client =>
{
    client.BaseAddress = new Uri(pythonApiUrl);
});

// Registrar el servicio en segundo plano para SignalR
builder.Services.AddHostedService<MetricsBackgroundService>();

var app = builder.Build();

// Inicializar la base de datos y sembrar datos
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<LearningDbContext>();
        LearningDbContext.SeedData(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al inicializar y sembrar la base de datos.");
    }
}

// Configurar pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngular");
app.UseRouting();
app.MapControllers();

// Mapear SignalR Hub
app.MapHub<DataHub>("/datahub");

app.Run();
