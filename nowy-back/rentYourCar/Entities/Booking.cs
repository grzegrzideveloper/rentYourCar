using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Entities
{
    public class Booking
    {
        public int Id { get; set; }

        public int CarId { get; set; }
        public int UserId { get; set; }

        public String StartDate { get; set; }
        public String EndDate { get; set; }

        public bool IsActive { get; set; }
    }
}
