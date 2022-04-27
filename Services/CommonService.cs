using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public interface ICommonService
    {
        Task<List<AppObject>> GetObjectListByType(string objType);
        Task<AppObject> GetObjectById(int id);
        Task<List<AppObject>> GetChildrenByParentId(int parentId);
        Task<List<AppObject>> GetChildrenByParentList(List<int> parentIds);
    }

    public class CommonService : ICommonService
    {
        private readonly DataContext _context;
        public CommonService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<AppObject>> GetObjectListByType(string objType)
        {
            var result = await (from co in _context.AppObject
                                where co.ObjType.Equals(objType) && co.Active
                                orderby co.ObjName, co.ObjDesc
                                select co).ToListAsync();
            return result;
        }

        public async Task<AppObject> GetObjectById(int id)
        {
            AppObject result = await (from o in _context.AppObject
                                      where o.Id == id
                                      orderby o.ObjName, o.ObjDesc
                                      select o).FirstOrDefaultAsync();
            return result;
        }

        public async Task<List<AppObject>> GetChildrenByParentId(int parentId)
        {
            List<AppObject> result = await (from oa in _context.AppObjassoc join o in _context.AppObject on oa.ChildId equals o.Id where oa.ParentId == parentId orderby o.ObjName select o).ToListAsync();
            return result;
        }

        public async Task<List<AppObject>> GetChildrenByParentList(List<int> parentIds)
        {
            List<AppObject> result = await (from oa in _context.AppObjassoc join o in _context.AppObject on oa.ChildId equals o.Id where parentIds.Contains(oa.ParentId) orderby o.ObjName select o).ToListAsync();
            return result;
        }
    }
}