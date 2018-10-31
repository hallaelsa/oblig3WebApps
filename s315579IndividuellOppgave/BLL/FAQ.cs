using System;
using System.Collections.Generic;
using System.Linq;
using s315579IndividuellOppgave.Models;

namespace s315579IndividuellOppgave.BLL
{
    public class FAQ
    {
        private readonly DAL.FAQ faq;

        public FAQ(DAL.FAQ faq)
        {
            this.faq = faq;
        }

        public List<GroupedCategories> GetCategories()
        {
            var categories = faq.GetCategories();
            var parents = categories.Where(c => c.ParentId == null).ToList();
            var groupedCategories = new List<GroupedCategories>();

            foreach(var parent in parents)
            {
                var subCategories = categories.Where(c => c.ParentId == parent.Id).ToList();
                var grouped = ToGroupedCategoriesModel(parent, subCategories);
                groupedCategories.Add(grouped);
            }

            return groupedCategories;
        }

        internal bool UpVote(int id)
        {
            return faq.UpVote(id);
        }

        public List<QA> GetFAQs()
        {
            return faq.GetFAQs();
        }

        internal bool DownVote(int id)
        {
            return faq.DownVote(id);
        }

        private GroupedCategories ToGroupedCategoriesModel(Category parent, List<Category> subCategories)
        {
            return new GroupedCategories
            {
                Parent = parent,
                Categories = subCategories
            };
        }
    }
}
