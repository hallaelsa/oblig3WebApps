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
    [Route("api/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly FAQ faq;

        public HomeController(BLL.FAQ faq)
        {
            this.faq = faq;
        }

        [Route("categories")]
        public List<GroupedCategoriesModel> GetCategories()
        {
            return faq.GetCategories();
        }

        [Route("sendquestion")]
        public bool PostQuestion([FromBody] QuestionModel model)
        {
            bool ok = faq.SetQuestion(model);
            return ok;
        }

        [Route("faqs")]
        public List<QaModel> GetFAQs()
        {
            return faq.GetFAQs();
        }

        [Route("upvote/{id}")]
        public bool PostUpVote(int id)
        {
            bool ok = faq.UpVote(id);
            return ok;
        }

        [Route("downvote/{id}")]
        public bool PostDownVote(int id)
        {
            bool ok = faq.DownVote(id);
            return ok;
        }

    }
}