using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppObject> AppObject { get; set; }
        public DbSet<AppObjassoc> AppObjassoc { get; set; }
    }
}