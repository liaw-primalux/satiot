using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly DataContext _context;
        private ICommonService _commonService;

        public CommonController(DataContext context, ICommonService commonService)
        {
            _context = context;
            _commonService = commonService;
        }

        [HttpGet("GetObjectsByType")]
        public async Task<ActionResult<List<AppObject>>> GetObjectsByType(string objType)
        {
            try
            {
                List<AppObject> result = await _commonService.GetObjectListByType(objType);
                return Ok(result);
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
                List<AppObject> result = await _commonService.GetChildrenByParentId(parentId);
                return Ok(result);
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
                List<AppObject> result = await _commonService.GetChildrenByParentList(parentIds);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetDeviceById")]
        public async Task<ActionResult<DtoObject>> GetDeviceById(int id)
        {
            try
            {
                AppObject appObject = await _commonService.GetObjectById(id);

                DtoObject result = new DtoObject()
                {
                    Id = appObject.Id,
                    ObjName = appObject.ObjName,
                    ObjDesc = appObject.ObjDesc,
                    Parents = (from oa in _context.AppObjassoc join oo in _context.AppObject on oa.ParentId equals oo.Id where oa.ChildId == appObject.Id orderby oo.ObjName select oo.ObjName).ToList()
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("GetChildAssocByParentIds")]
        public async Task<ActionResult<List<DtoObject>>> GetChildAssocByParentIds(List<int> parentIds)
        {
            try
            {
                List<DtoObject> objects = await (from oa in _context.AppObjassoc
                                                 join o in _context.AppObject on oa.ChildId equals o.Id
                                                 where parentIds.Contains(oa.ParentId)
                                                 orderby o.ObjName
                                                 select new DtoObject
                                                 {
                                                     Id = o.Id,
                                                     ObjName = o.ObjName,
                                                     ObjDesc = o.ObjDesc,
                                                     Active = o.Active
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

        [HttpGet("GetParentAndChildByParentType")]
        public async Task<ActionResult<List<DtoObjectAssoc>>> GetParentAndChildByParentType(string parentType)
        {
            try
            {
                List<DtoObjectAssoc> objects = await (from o in _context.AppObject
                                                      where o.ObjType == parentType && o.Active
                                                      orderby o.ObjName
                                                      select new DtoObjectAssoc
                                                      {
                                                          Id = o.Id,
                                                          ObjType = o.ObjType,
                                                          ObjName = o.ObjName,
                                                          ObjDesc = o.ObjDesc,
                                                          ObjText = o.ObjText,
                                                          Active = o.Active,
                                                          Child = (from oa in _context.AppObjassoc
                                                                   join oo in _context.AppObject on oa.ChildId equals oo.Id
                                                                   where oa.ParentId == o.Id && oa.ParentType == o.ObjType
                                                                   select new DtoObjectAssoc
                                                                   {
                                                                       Id = oo.Id,
                                                                       ObjType = oo.ObjType,
                                                                       ObjName = oo.ObjName,
                                                                       ObjDesc = oo.ObjDesc,
                                                                       ObjText = oo.ObjText,
                                                                       Active = oo.Active,
                                                                   }).ToList()
                                                      }).ToListAsync();

                return Ok(objects);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}