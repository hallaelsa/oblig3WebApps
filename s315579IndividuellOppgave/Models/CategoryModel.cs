using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace s315579IndividuellOppgave.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public List<QaModel> QA { get; set; }
    }
}
