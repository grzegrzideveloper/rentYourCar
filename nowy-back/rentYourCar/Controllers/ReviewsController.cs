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
        var report = _context.Reviews.Find(id);
        if (report == null) throw new KeyNotFoundException("Review not found!");
        return Ok(report);

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

