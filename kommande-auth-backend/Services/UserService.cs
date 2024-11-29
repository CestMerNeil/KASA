using System.Text.RegularExpressions;
using kommande_auth_backend.Data;
using kommande_auth_backend.Models;
using kommande_auth_backend.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace kommande_auth_backend.Services;

public class UserService(AppDbContext context) : IUserService
{
    public async Task<User?> GetUser(string userId)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        return user;
    }

    public async Task<User?> Authenticate(string email, string password)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;

        if (PasswordHasher.HashPassword(password) != user.PasswordHash)
            return null;
        return user;
    }
    
    public async Task<User> Register(User user)
    {
        var validEmail = await IsValidEmail(user.Email);
        var validName = await IsValidName(user.Name);
        var validPassword = await IsValidPassword(user.PasswordHash);
        
        
        if (!validEmail)
        {
            throw new ArgumentException("Format email invalide.");
        }

        if (!validName)
        {
            throw new ArgumentException("User déjà existant.");
        }

        if (!validPassword)
        {
            throw new ArgumentException("Mot de passe invalide.");
        }
        
        user.PasswordHash = PasswordHasher.HashPassword(user.PasswordHash);
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
        
    }
    
    public async Task<bool> IsValidEmail(string email)
    {
        Regex EmailRegex = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled);
        var isEmailExisted = await context.Users.AnyAsync(u => u.Email == email);
        return !string.IsNullOrEmpty(email) && EmailRegex.IsMatch(email) && !isEmailExisted;
    }

    public async Task<bool> IsValidName(string userName)
    {
        var isNameExisted = await context.Users.AnyAsync(u => u.Name == userName);
        return !isNameExisted && !string.IsNullOrEmpty(userName);
    }

    public async Task<bool> IsValidPassword(string passwordHash)
    {
        return !string.IsNullOrEmpty(passwordHash);
    }
}