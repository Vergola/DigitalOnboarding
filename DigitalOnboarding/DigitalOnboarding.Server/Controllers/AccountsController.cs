using DigitalOnboarding.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DigitalOnboarding.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AccountsController : Controller
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;

		public AccountsController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
		}

		[HttpPost]
		public async Task<IActionResult> Register([FromBody] Account account)
		{
			try
			{
				// Validate the model
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				// Create a new ApplicationUser with the provided email
				var user = new ApplicationUser { UserName = account.Email, Email = account.Email };

				// Use UserManager to create the user with the provided password
				var result = await _userManager.CreateAsync(user, account.Password);

				// Check if the user creation was successful
				if (result.Succeeded)
				{
					// Sign in the user if registration is successful
					//await _signInManager.SignInAsync(user, isPersistent: false);

					// You can customize the response based on your application's needs
					return Ok(new { Message = "Registration successful", UserId = user.Id });
				}
				else
				{
					// If there are errors, return them as part of the response
					return BadRequest(new { Errors = result.Errors.Select(error => error.Description) });
				}
			}
			catch (Exception ex)
			{
				// Log the exception and return a generic error message
				Console.Error.WriteLine($"Error during registration: {ex.Message}");
				return StatusCode(500, new { Message = "An error occurred during registration." });
			}
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] Account account)
		{
			try
			{
				// Validate the model
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}

				// Use SignInManager to sign in the user with the provided email and password
				var result = await _signInManager.PasswordSignInAsync(account.Email, account.Password, isPersistent: false, lockoutOnFailure: false);

				// Check if the sign in was successful
				if (result.Succeeded)
				{
					// You can customize the response based on your application's needs
					return Ok(new { Message = "Login successful" });
				}
				else
				{
					// If there are errors, return them as part of the response
					return BadRequest(new { Errors = "Invalid email or password" });
				}
			}
			catch (Exception ex)
			{
				// Log the exception and return a generic error message
				Console.Error.WriteLine($"Error during login: {ex.Message}");
				return StatusCode(500, new { Message = "An error occurred during login." });
			}
		}

		[HttpPost("logout")]
		public async Task<IActionResult> Logout()
		{
			try
			{
				// Use SignInManager to sign out the user
				await _signInManager.SignOutAsync();

				// You can customize the response based on your application's needs
				return Ok(new { Message = "Logout successful" });
			}
			catch (Exception ex)
			{
				// Log the exception and return a generic error message
				Console.Error.WriteLine($"Error during logout: {ex.Message}");
				return StatusCode(500, new { Message = "An error occurred during logout." });
			}
		}

		[HttpGet("status")]
		public IActionResult Status()
		{
			bool isAuthenticated = _signInManager.IsSignedIn(User);

			return Ok(new { isAuthenticated });
		}
	}
}
