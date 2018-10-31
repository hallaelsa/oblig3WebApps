using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace s315579IndividuellOppgave.Models
{
    public class GroupedCategoriesModel
    {
        public CategoryModel Parent { get; set; }
        public List<CategoryModel> Categories { get; set; }
    }
}
