namespace WebApi.Models.Users;

using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string Adress { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string PostalCode { get; set; }

    [Required]
    public string Phone { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}