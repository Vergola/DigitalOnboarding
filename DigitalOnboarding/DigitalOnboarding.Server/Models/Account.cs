using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalOnboarding.Server.Models
{
	public class Account
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}
}
