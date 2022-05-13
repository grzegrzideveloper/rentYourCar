namespace WebApi.Models.Cars;

using System.ComponentModel.DataAnnotations;
public class AddRequest
{

    [Required]
    public int UserId { get; set; }
    [Required]
    public string Brand { get; set; }
    [Required]
    public string Model { get; set; }
    [Required]
    public string NumPassangers { get; set; }
    [Required]
    public string Transmission { get; set; }
    [Required]
    public int PricePerDay { get; set; }
    [Required]
    public string Adress { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string PostalCode { get; set; }
    [Required]
    public IFormFile ImageFile { get; set; }
}
