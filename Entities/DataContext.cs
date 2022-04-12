using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppObject> AppWpObject { get; set; }
        public DbSet<AppObjassoc> AppObjassoc { get; set; }
    }
}