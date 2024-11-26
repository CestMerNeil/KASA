using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace kommande_auth_backend.Models;

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type", UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FailSerialization)] 
[JsonDerivedType(typeof(BasicUser), "BasicUser")]
[JsonDerivedType(typeof(GoogleUser), "GoogleUser")]
public class User
{
    [Key] 
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}