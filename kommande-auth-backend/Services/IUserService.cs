using kommande_auth_backend.Models;

namespace kommande_auth_backend.Services;

public interface IUserService
{
    Task<User?> GetUser(string userId);
    
    Task<User?> Authenticate(string username, string password);
    
    Task<User> Register(User user);
}