using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Entities.DTO;
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
            try
            {
                List<AppObject> objects = await (from o in _context.AppObject where o.ObjType == objType orderby o.ObjName select o).ToListAsync();
                return Ok(objects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet("GetChildrenByParentId")]
        public async Task<ActionResult<List<AppObject>>> GetChildrenByParentId(int parentId)
        {
            try
            {
                List<AppObject> objects = await (from oa in _context.AppObjassoc join o in _context.AppObject on oa.ChildId equals o.Id where oa.ParentId == parentId orderby o.ObjName select o).ToListAsync();
                return Ok(objects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("GetChildrenByParentList")]
        public async Task<ActionResult<List<AppObject>>> GetChildrenByParentList(List<int> parentIds)
        {
            try
            {
                List<AppObject> objects = await (from oa in _context.AppObjassoc join o in _context.AppObject on oa.ChildId equals o.Id where parentIds.Contains(oa.ParentId) orderby o.ObjName select o).ToListAsync();
                return Ok(objects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetDeviceById")]
        public async Task<ActionResult<List<AppObject>>> GetDeviceById(int id)
        {
            try
            {
                AppObject appObject = await (from o in _context.AppObject where o.Id == id select o).FirstOrDefaultAsync();
                return Ok(appObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("GetThreatsByComponents")]
        public async Task<ActionResult<List<DtoThreatList>>> GetThreatsByComponents(List<int> parentIds)
        {
            try
            {
                List<DtoThreatList> objects = await (from oa in _context.AppObjassoc
                                                     join o in _context.AppObject on oa.ChildId equals o.Id
                                                     where parentIds.Contains(oa.ParentId)
                                                     orderby o.ObjName
                                                     select new DtoThreatList
                                                     {
                                                         Id = o.Id,
                                                         ObjName = o.ObjName,
                                                         ObjDesc = o.ObjDesc
                                                     }).Distinct().ToListAsync();

                foreach (var threat in objects)
                {
                    threat.Parents = await (from oa in _context.AppObjassoc join o in _context.AppObject on oa.ParentId equals o.Id where parentIds.Contains(oa.ParentId) && oa.ChildId == threat.Id select o.ObjName).ToListAsync();
                }
                return Ok(objects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}