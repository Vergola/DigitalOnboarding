using Microsoft.AspNetCore.Mvc;
using DigitalOnboarding.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace DigitalOnboarding.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	[Authorize]
	public class ProjectsController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly ApplicationDbContext _context;

		public ProjectsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
		{
			_context = context;
			_userManager = userManager;
		}

		// GET: <ProjectsController>
		[HttpGet(Name = "GetProjects")]
		public IEnumerable<Project> Get()
		{
			var userId = _userManager.GetUserId(User);
			return _context.Project.ToList().FindAll(p => p.UserId == userId);
		}


		// GET <ProjectsController>/5
		[HttpGet("{id}")]
		public Project Get(int id)
		{
			try
			{
				var userId = _userManager.GetUserId(User);
				return _context.Project.Single(p => p.Id == id && p.UserId == userId);
			}
			catch
			{
				return null;
			}
		}

		// POST <ProjectsController>
		[HttpPost]
		public IEnumerable<Project> Post([FromBody] Project project)
		{
			var userId = _userManager.GetUserId(User);
			project.UserId = userId;
			_context.Project.Add(project);
			_context.SaveChanges();
			return _context.Project.ToList();
		}

		// DELETE <ProjectsController>/5
		[HttpDelete("{id}")]
		public IEnumerable<Project> Delete(int id)
		{
			var userId = _userManager.GetUserId(User);
			var project = _context.Project.Single(p => p.Id == id && p.UserId == userId);
			_context.Project.Remove(project);
			_context.SaveChanges();
			return _context.Project.ToList();
		}

		// PUT <ProjectsController>
		[HttpPut]
		public IEnumerable<Project> Update([FromBody] Project project)
		{
			var userId = _userManager.GetUserId(User);
			var projectToUpdate = _context.Project.Single(p => p.Id == project.Id && p.UserId == userId);
			projectToUpdate.ProjectName = project.ProjectName;
			projectToUpdate.ProjectDescription = project.ProjectDescription;
			projectToUpdate.ProjectType = project.ProjectType;
			_context.SaveChanges();
			return _context.Project.ToList();
		}
	}
}
