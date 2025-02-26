using kommande_auth_backend.Models;
using kommande_auth_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace kommande_auth_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController(IUserService userService) : ControllerBase
{
    [HttpGet("user")]
    public async Task<IActionResult> GetUser([FromQuery] string userId)
    {
        var user = await userService.GetUser(userId);
    
        return user is not null ? Ok(user) : NotFound("User not found");
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Models.LoginRequest request)
    {
        var user = await userService.Authenticate(request.Email, request.Password);
        if (user == null)
        {
            return Unauthorized("Invalid request.");
        }

        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        User createdUser;
        try
        {
            createdUser = await userService.Register(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);

        }
        return Created($"/user/{createdUser.Id}", createdUser);
    }
}