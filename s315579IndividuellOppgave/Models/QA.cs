using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace s315579IndividuellOppgave.Models
{
    public class QA
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int UpVotes { get; set; }
        public int DownVotes { get; set; }
        public string Email { get; set; }
        public Category Category { get; set; }
    }
}
