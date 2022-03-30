using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly DataContext _context;
        public CommonController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetObjectsByType")]
        public async Task<ActionResult<List<AppObject>>> GetObjectsByType(string objType)
        {
            List<AppObject> objects = await (from o in _context.AppWpObject where o.ObjType == objType select o).ToListAsync();
            return Ok(objects);
        }
    }
}