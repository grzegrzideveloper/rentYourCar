namespace WebApi.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using WebApi.Entities;


[ApiController]
[Route("[controller]")]
public class ReportsController : ControllerBase
{
    private DataContext _context;
    public ReportsController(DataContext context) => _context = context;

    [HttpPost("AddReport")]
    public IActionResult AddReport(Report model)
    {
        _context.Reports.Add(model);
        _context.SaveChanges();


        return Ok(model);
    }

    [HttpGet]
    public IEnumerable<Report> GetAll()
    {
        return _context.Reports;
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var report = _context.Reports.Find(id);
        if (report == null) throw new KeyNotFoundException("Report not found!");
        return Ok(report);

    }

    [HttpGet("user/{id}")]
    public IEnumerable<Report> GetByUser(int id)
    {
        var report = _context.Reports.Where(report => report.UserId == id); ;
        if (report == null) throw new KeyNotFoundException("Report not found!");
        return report;

    }

    [HttpGet("car/{id}")]
    public IEnumerable<Report> GetByCar(int id)
    {
        var report = _context.Reports.Where(report => report.CarId == id); ;
        if (report == null) throw new KeyNotFoundException("Report not found!");
        return report;

    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Report model)
    {
        var report = _context.Reports.Find(id);
        if (report == null) throw new KeyNotFoundException("Report not found!");

        report.Resolved = model.Resolved;

        _context.Reports.Update(report);
        _context.SaveChanges();

        return Ok(report);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var model = await _context.Reports.FindAsync(id);
        _context.Reports.Remove(model);
        _context.SaveChanges();
        return Ok(model);
    }

}


