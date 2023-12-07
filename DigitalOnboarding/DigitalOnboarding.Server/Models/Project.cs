using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace DigitalOnboarding.Server.Models
{
	public class Project
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string? ProjectName { get; set; }
		public string? ProjectDescription { get; set; }
		public override string ToString()
		{
			return JsonSerializer.Serialize(this, new JsonSerializerOptions
			{
				WriteIndented = true // Optional: to make the JSON string more readable
			});
		}
	}
}
