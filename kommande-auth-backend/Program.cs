using kommande_auth_backend.Data;
using kommande_auth_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/user", async (AppDbContext db, [FromQuery] string name)=>
{
    // Recherchez un utilisateur avec le mot de passe haché fourni
    //var hashedPassword = HashPassword(password); // Méthode de hachage à définir
    var user = await db.Users.FirstOrDefaultAsync(u => u.Name == name);
    
    return user is not null ? Results.Ok(user) : Results.NotFound("User not found");
});

app.MapPost("/user", async (AppDbContext db, [FromBody] User user) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();

    return Results.Created($"/user/{user.Id}", user);
});

/*string HashPassword(string password)
{
    using var sha256 = SHA256.Create();
    byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
    return Convert.ToBase64String(hashedBytes);
}*/

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();  // Appliquer les migrations et créer la BDD si elle n'existe pas
}

app.UseHttpsRedirection();

app.Run();
