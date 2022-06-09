namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using WebApi.Entities;


[ApiController]
[Route("[controller]")]
public class ReviewsController : ControllerBase
{
    private DataContext _context;
    public ReviewsController(DataContext context) => _context = context;


    [HttpPost("AddReport")]
    public IActionResult AddReport(Review model)
    {
        _context.Reviews.Add(model);
        _context.SaveChanges();


        return Ok(model);
    }

    [HttpGet]
    public IEnumerable<Review> GetAll()
    {
        return _context.Reviews;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var model = _context.Reviews.Find(id);
        if (model == null) throw new KeyNotFoundException("Review not found!");
        return Ok(model);

    }

    [HttpGet("car/{id}")]
    public IEnumerable<Review> GetByCar(int id)
    {
        var model = _context.Reviews.Where(review => review.CarId == id);
        if (model == null) throw new KeyNotFoundException("Review not found!");
        return model;

    }

    [HttpGet("user/{id}")]
    public IEnumerable<Review> GetByUser(int id)
    {
        var model = _context.Reviews.Where(review => review.UserId == id);
        if (model == null) throw new KeyNotFoundException("Review not found!");
        return model;

    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var model = await _context.Reviews.FindAsync(id);
        _context.Reviews.Remove(model);
        _context.SaveChanges();
        return Ok(model);
    }

}

