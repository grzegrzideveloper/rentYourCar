namespace WebApi.Entities;

using System.Text.Json.Serialization;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Phone { get; set; }
    public string Adress { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }

    [JsonIgnore]
    public string PasswordHash { get; set; }

    public bool? Admin { get; set; }

    public bool? IsActive { get; set; } 
}