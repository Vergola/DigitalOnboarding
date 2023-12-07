using Microsoft.AspNetCore.Mvc;
using DigitalOnboarding.Server.Models;

namespace DigitalOnboarding.Server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class ProjectsController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public ProjectsController(ApplicationDbContext context)
		{
			_context = context;
		}

		// GET: <ProjectsController>
		[HttpGet(Name = "GetProjects")]
		public IEnumerable<Project> Get()
		{
			return _context.Project.ToList();
		}

		// GET <ProjectsController>/5
		[HttpGet("{id}")]
		public Project Get(int id)
		{
			return _context.Project.Find(id);
		}

		// POST <ProjectsController>
		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		// PUT <ProjectsController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE <ProjectsController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
