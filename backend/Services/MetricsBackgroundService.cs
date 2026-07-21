using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OIT1_API.Hubs;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OIT1_API.Services
{
    public class MetricsBackgroundService : BackgroundService
    {
        private readonly IHubContext<DataHub> _hubContext;
        private readonly ILogger<MetricsBackgroundService> _logger;
        private readonly Random _random = new Random();

        public MetricsBackgroundService(IHubContext<DataHub> hubContext, ILogger<MetricsBackgroundService> logger)
        {
            _hubContext = hubContext;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Metrics Background Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Generate simulated metrics
                    var cpuUsage = Math.Round(_random.NextDouble() * 30 + 15, 1); // 15% - 45%
                    var ramUsage = Math.Round(_random.NextDouble() * 10 + 40, 1); // 40% - 50%
                    var sensorTemp = Math.Round(_random.NextDouble() * 5 + 22.5, 2); // 22.5 - 27.5 °C
                    var sensorHumidity = Math.Round(_random.NextDouble() * 10 + 50, 1); // 50% - 60%
                    
                    var metrics = new
                    {
                        CpuUsage = cpuUsage,
                        RamUsage = ramUsage,
                        SensorTemperature = sensorTemp,
                        SensorHumidity = sensorHumidity,
                        Timestamp = DateTime.UtcNow
                    };

                    // Broadcast to SignalR clients
                    await _hubContext.Clients.All.SendAsync("ReceiveMetrics", metrics, stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred executing metrics broadcasting.");
                }

                await Task.Delay(1000, stoppingToken); // Broadcast every second
            }

            _logger.LogInformation("Metrics Background Service is stopping.");
        }
    }
}
