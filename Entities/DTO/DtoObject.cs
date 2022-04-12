using System.Collections.Generic;

namespace Entities.DTO
{
    public class DtoObject
    {
        public int Id { get; set; }
        public string ObjName { get; set; }
        public string ObjDesc { get; set; }
        public List<string> Parents { get; set; }
    }
}