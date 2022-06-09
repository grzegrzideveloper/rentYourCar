namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Helpers;
using WebApi.Models.Booking;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("[controller]")]

public class BookingsController : ControllerBase
{
    private DataContext _context;
    private readonly AppSettings _appSettings;

    public BookingsController(
       DataContext context,
       IOptions<AppSettings> appSettings
       )
    {
        _context = context;
        _appSettings = appSettings.Value;

    }

    [HttpPost("AddBooking")]
    public IActionResult AddBooking(AddBookingRequest model)
    {
        var booking = new Booking();
        booking.UserId = model.UserId;
        booking.CarId = model.CarId;
        booking.StartDate = model.StartDate;
        booking.EndDate = model.EndDate;
        booking.IsActive = true;

        _context.Bookings.Add(booking);
        _context.SaveChanges();

        return Ok(booking);

    }

    [HttpGet]
    public IEnumerable<Booking> GetAll()
    {
        var bookings = _context.Bookings.Where(booking => booking.IsActive==true);

        foreach(Booking booking in bookings)
        {
            if(DateTime.Parse(booking.EndDate) <= DateTime.Today.AddDays(-2))
            {
                booking.IsActive = false;
            }

            _context.Bookings.Update(booking);
            _context.SaveChanges();
        }

        return _context.Bookings;
    }

    [HttpGet("{id}")]
    public Booking GetById(int id)
    {
        var booking = _context.Bookings.Find(id);
        if (booking == null) throw new KeyNotFoundException("Booking not found");
        return booking;
    }

    [HttpGet("user/{id}")]
    public IEnumerable<Booking> GetByUser(int id)
    {
        return _context.Bookings.Where(booking => booking.UserId == id);

    }

    [HttpGet("car/{id}")]
    public IEnumerable<Booking> GetByCar(int id)
    {
        return _context.Bookings.Where(booking => booking.CarId == id);

    }

}

