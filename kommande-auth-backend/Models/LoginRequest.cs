using System.ComponentModel.DataAnnotations;

namespace kommande_auth_backend.Models;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    
    [Required]
    public required string Password { get; set; }
} 