using Microsoft.EntityFrameworkCore;
using DigitalOnboarding.Server.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Project { get; set; }
}