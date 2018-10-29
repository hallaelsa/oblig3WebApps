using Microsoft.EntityFrameworkCore;
using s315579IndividuellOppgave.DAL.DbModels;

namespace s315579IndividuellOppgave.DAL
{
    public class DbService : DbContext
    {
        public DbService(DbContextOptions<DbService> options)
                : base(options)
        { }

        public DbSet<QA> QA { get; set; }
        public DbSet<Category> Category { get; set; }
    }
}
