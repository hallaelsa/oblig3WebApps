using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace s315579IndividuellOppgave.Models
{
    public class QuestionModel
    {
        [Required]
        public string Question { get; set; }
        [Required]
        [RegularExpression(@"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
         @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$")]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"[0-9]+")]
        public int CategoryId { get; set; }
    }
}
