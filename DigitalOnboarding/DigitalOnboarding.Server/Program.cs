using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DigitalOnboarding.Server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlite(connectionString));

//builder.Services.AddCors(options =>
//{
//	options.AddDefaultPolicy(builder =>
//	{
//		builder.AllowAnyOrigin()
//			   .AllowAnyHeader()
//			   .AllowAnyMethod();
//	});
//});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();
//var configuration = new ConfigurationBuilder()
//					.SetBasePath(Directory.GetCurrentDirectory())
//					.AddJsonFile("appsettings.json")
//					.Build();
//var jwtConfig = configuration.GetSection("Jwt");

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//	.AddJwtBearer(options =>
//	{
//		options.TokenValidationParameters = new TokenValidationParameters
//		{
//			ValidateLifetime = true,
//			ValidateIssuerSigningKey = true,
//			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig["Secret"]))
//		};
//	});
//builder.Services.AddAuthorization();
//builder.Services.AddAuthorization(options =>
//{
//	options.DefaultPolicy = new AuthorizationPolicyBuilder()
//		.RequireAuthenticatedUser()
//		.Build();
//});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseAuthentication();

//app.UseAuthorization();

//app.UseCors();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
