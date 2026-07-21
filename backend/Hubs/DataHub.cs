using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace OIT1_API.Hubs
{
    public class DataHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveSystemMessage", "Connected to OIT 1 Real-time SignalR feed");
            await base.OnConnectedAsync();
        }
    }
}
