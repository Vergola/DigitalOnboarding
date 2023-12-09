using Microsoft.EntityFrameworkCore;
using DigitalOnboarding.Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
		: base(options)
	{
	}

	public DbSet<Project> Project { get; set; }
}