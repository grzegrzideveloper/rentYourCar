using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebApi.Entities
{

	public class Review
	{
		
		
		public int Id { get; set; }
		public int CarId { get; set; }
		public int UserId { get; set; }
		public string Content { get; set; }
		public int Rating { get; set; }
	
		
	}

}
