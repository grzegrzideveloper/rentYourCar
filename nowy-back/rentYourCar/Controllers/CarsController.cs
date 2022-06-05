namespace WebApi.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Helpers;
using WebApi.Models.Cars;
using WebApi.Entities;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class CarsController : ControllerBase
{
    private DataContext _context;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    private readonly IWebHostEnvironment _hostEnvironment;
    public CarsController(
        DataContext context,
        IMapper mapper,
        IOptions<AppSettings> appSettings,
        IWebHostEnvironment hostEnvironment)
    {
        _context = context;
        _mapper = mapper;
        _appSettings = appSettings.Value;
        _hostEnvironment = hostEnvironment;
    }

    [HttpPost("AddCar")]
    public async Task<IActionResult> AddCar([FromForm] AddRequest model)
    {
        var car = _mapper.Map<Car>(model);    
        car.IsActive = true;

        car.ImageName = await SaveImage(model.ImageFile);
        _context.Cars.Add(car);
        _context.SaveChanges();

        return Ok(car);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GetResponse>>> GetAll()
    {
        return await _context.Cars
            .Select(car => new GetResponse(){
            Id = car.Id,
            UserId = car.UserId,
            Brand = car.Brand,
            Model = car.Model,
            NumPassangers = car.NumPassangers,
            Transmission = car.Transmission,
            PricePerDay = car.PricePerDay,
            Adress = car.Adress,
            City = car.City,
            PostalCode = car.PostalCode,
            IsActive = car.IsActive,
            ImageName = car.ImageName,
            ImageUrl = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, car.ImageName)
            })
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var car = getCar(id);

        var getResponse = new GetResponse() {
            Id = car.Id,
            UserId = car.UserId,
            Brand = car.Brand,
            Model = car.Model,
            NumPassangers = car.NumPassangers,
            Transmission = car.Transmission,
            PricePerDay = car.PricePerDay,
            Adress = car.Adress,
            City = car.City,
            PostalCode = car.PostalCode,
            IsActive = car.IsActive,
            ImageName = car.ImageName,
            ImageUrl = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, car.ImageName)
        };

        return Ok(getResponse);

    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<IEnumerable<GetResponse>>> GetByUser(int id)
    {
        return await _context.Cars
            .Where(car => car.UserId == id).Select(car => new GetResponse()
            {
                Id = car.Id,
                UserId = car.UserId,
                Brand = car.Brand,
                Model = car.Model,
                NumPassangers = car.NumPassangers,
                Transmission = car.Transmission,
                PricePerDay = car.PricePerDay,
                Adress = car.Adress,
                City = car.City,
                PostalCode = car.PostalCode,
                IsActive = car.IsActive,
                ImageName = car.ImageName,
                ImageUrl = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, car.ImageName)
            })
            .ToListAsync();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<GetResponse>>> SearchCar(SearchCarRequest model)
    {
        return await _context.Cars
            .Where(car =>  
               (string.IsNullOrEmpty(model.Brand) || car.Brand.Contains(model.Brand))
            && (string.IsNullOrEmpty(model.Model) || car.Model.Contains(model.Model))
            && (string.IsNullOrEmpty(model.NumPassangers) || car.NumPassangers.Contains(model.NumPassangers)) 
            && (string.IsNullOrEmpty(model.Transmission) || car.Transmission.Contains(model.Transmission))
            && (string.IsNullOrEmpty(model.Adress) || car.Adress.Contains(model.Adress))
            && (string.IsNullOrEmpty(model.City) || car.City.Contains(model.City))
            && (string.IsNullOrEmpty(model.PostalCode) || car.PostalCode.Contains(model.PostalCode))
            && (model.MaxPricePerDay == null || car.PricePerDay <= model.MaxPricePerDay)
            && (model.MinPricePerDay == null || car.PricePerDay >= model.MinPricePerDay)
            ).Select(car => new GetResponse()
            {
                Id = car.Id,
                UserId = car.UserId,
                Brand = car.Brand,
                Model = car.Model,
                NumPassangers = car.NumPassangers,
                Transmission = car.Transmission,
                PricePerDay = car.PricePerDay,
                Adress = car.Adress,
                City = car.City,
                PostalCode = car.PostalCode,
                IsActive = car.IsActive,
                ImageName = car.ImageName,
                ImageUrl = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, car.ImageName)
            })
            .ToListAsync();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] UpdateCarRequest model)
    {
        var car = getCar(id);
        _mapper.Map(model, car);

        if (model.ImageFile != null)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", car.ImageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);

            car.ImageName = await SaveImage(model.ImageFile);
        }

        _context.Cars.Update(car);
        _context.SaveChanges();

        return Ok(new { message = "Car updated successfully" });
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var carModel = await _context.Cars.FindAsync(id);

        var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", carModel.ImageName);
        if (System.IO.File.Exists(imagePath))
            System.IO.File.Delete(imagePath);
        _context.Cars.Remove(carModel);
        _context.SaveChanges();
        return Ok(carModel);
    }

    [NonAction]
    public async Task<string> SaveImage(IFormFile imageFile) 
    {
        string imageName = new String( Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
        imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
        var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
        using (var fileStream = new FileStream(imagePath, FileMode.Create))
        {
           await imageFile.CopyToAsync(fileStream);
        }
        return imageName;
    }

    [NonAction]
    private Car getCar(int id)
    {
        var car = _context.Cars.Find(id);
        if (car == null) throw new KeyNotFoundException("Car not found");
        return car;
    }
}

