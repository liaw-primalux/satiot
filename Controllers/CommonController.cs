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
            List<AppObject> objects = await (from o in _context.AppWpObject where o.ObjType == objType orderby o.ObjName select o).ToListAsync();
            return Ok(objects);
        }

        [HttpGet("GetDevicesByCat")]
        public async Task<ActionResult<List<AppObject>>> GetDevicesByCat(int parentId)
        {
            List<AppObject> objects = await (from oa in _context.AppObjassoc join o in _context.AppWpObject on oa.ChildId equals o.Id where oa.ParentId == parentId select o).ToListAsync();
            return Ok(objects);
        }

        [HttpGet("GetDeviceById")]
        public async Task<ActionResult<List<AppObject>>> GetDeviceById(int id)
        {
            AppObject appObject = await (from o in _context.AppWpObject where o.Id == id select o).FirstOrDefaultAsync();
            return Ok(appObject);
        }
    }
}