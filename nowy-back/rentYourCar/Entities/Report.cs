using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Entities
{
    public class Report
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public int UserId { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public bool Resolved { get; set; } = false;
    }
}
