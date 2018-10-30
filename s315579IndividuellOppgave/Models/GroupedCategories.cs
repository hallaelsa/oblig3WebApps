using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace s315579IndividuellOppgave.Models
{
    public class GroupedCategories
    {
        public Category Parent { get; set; }
        public List<Category> Categories { get; set; }
    }
}
