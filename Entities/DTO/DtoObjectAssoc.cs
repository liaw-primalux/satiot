using System.Collections.Generic;

namespace Entities.DTO
{
    public class DtoObjectAssoc
    {
        public int Id { get; set; }
        public string ObjType { get; set; }
        public string ObjName { get; set; }
        public string ObjDesc { get; set; }
        public string ObjText { get; set; }
        public bool Active { get; set; }
        public List<DtoObjectAssoc> Child { get; set; }
    }
}