using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Entities
{
    public class Car
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string NumPassangers { get; set; }
        public string Transmission { get; set; }
        public int? PricePerDay { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public bool? IsActive { get; set; }
        public string ImageName { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageUrl { get; set; }
    }
}
