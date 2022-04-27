using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Entities.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services;

namespace SATIoT.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private ICommonService _commonService;

        public AdminController(DataContext context, ICommonService commonService)
        {
            _context = context;
            _commonService = commonService;
        }

        [HttpGet("GetObjectsByType")]
        public async Task<ActionResult<List<AppObject>>> GetObjectsByType(string objType)
        {
            try
            {
                List<AppObject> result = await _commonService.GetObjectListByType(objType, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("InsertObj")]
        public async Task<ActionResult<AppObject>> InsertNew(AppObject appObject)
        {
            try
            {
                appObject.UpdatedOn = DateTime.Now;
                _context.AppObject.Add(appObject);
                await _context.SaveChangesAsync();
                return Ok(appObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("UpdateObj")]
        public async Task<ActionResult<AppObject>> Update(AppObject appObject)
        {
            try
            {
                appObject.UpdatedOn = DateTime.Now;
                _context.AppObject.Update(appObject);
                await _context.SaveChangesAsync();
                return Ok(appObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("DeleteObj")]
        public async Task<ActionResult<AppObject>> Delete(AppObject appObject)
        {
            try
            {
                _context.AppObject.Remove(appObject);
                await _context.SaveChangesAsync();
                return Ok(appObject);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}