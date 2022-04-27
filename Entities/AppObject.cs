using System;

namespace Entities
{
    public class AppObject
    {
        public int Id { get; set; }
        public string ObjType { get; set; }
        public string ObjName { get; set; }
        public string ObjDesc { get; set; }
        public string ObjText { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public bool Active { get; set; }
    }
}