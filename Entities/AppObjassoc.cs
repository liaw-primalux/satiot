namespace Entities
{
    public class AppObjassoc
    {
        public int Id { get; set; }
        public string ParentType { get; set; }
        public int ParentId { get; set; }
        public string ChildType { get; set; }
        public int ChildId { get; set; }
        public string AssocText { get; set; }
        public bool Active { get; set; }
    }
}