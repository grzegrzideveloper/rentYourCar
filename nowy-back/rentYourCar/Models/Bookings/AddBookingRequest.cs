namespace WebApi.Models.Booking;

using System.ComponentModel.DataAnnotations;

public class AddBookingRequest
{
    [Required]
    public int CarId { get; set; }
    [Required]
    public int UserId { get; set; }
    [Required]
    public string StartDate { get; set; }
    [Required]
    public string EndDate { get; set; }

}

