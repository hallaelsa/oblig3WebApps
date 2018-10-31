using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using s315579IndividuellOppgave.BLL;
using s315579IndividuellOppgave.Models;

namespace s315579IndividuellOppgave.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly FAQ faq;

        public HomeController(BLL.FAQ faq)
        {
            this.faq = faq;
        }

        [HttpGet("[action]")]
        public List<GroupedCategories> Categories()
        {
            return faq.GetCategories();
        }

        [HttpGet("[action]")]
        public List<QA> FAQs()
        {
            return faq.GetFAQs();
        }
    }
}