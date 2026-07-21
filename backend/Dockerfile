# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Copy remaining files and build
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 8080 (ASP.NET Core 8.0 default container port)
EXPOSE 8080

ENTRYPOINT ["dotnet", "backend.dll"]
