namespace WebApi.Models.Users;

public class UpdateRequest
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Adress { get; set; }

    public string City { get; set; }

    public string PostalCode { get; set; }

    public string Phone { get; set; }

    public string Username { get; set; }

    public string Password { get; set; }

    public bool? Admin { get; set; } = null;
}