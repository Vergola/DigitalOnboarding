using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalOnboarding.Server.Models
{
	public class Project
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? ProjectName { get; set; }
		public string? ProjectDescription { get; set; }
	}
}
