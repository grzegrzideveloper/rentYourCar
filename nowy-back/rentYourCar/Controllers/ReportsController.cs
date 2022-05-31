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

    [HttpPut("{id}")]
    public IActionResult Update(int id, bool state)
    {
        var report = _context.Reports.Find(id);
        if (report == null) throw new KeyNotFoundException("Report not found!");

        report.Resolved = state;

        _context.Reports.Update(report);
        _context.SaveChanges();

        return Ok();
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


