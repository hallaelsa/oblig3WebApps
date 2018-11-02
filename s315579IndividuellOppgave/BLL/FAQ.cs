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

        public List<GroupedCategoriesModel> GetCategories()
        {
            var categories = faq.GetCategories();
            var parents = categories.Where(c => c.ParentId == null).ToList();
            var groupedCategories = new List<GroupedCategoriesModel>();

            foreach(var parent in parents)
            {
                var subCategories = categories.Where(c => c.ParentId == parent.Id).ToList();
                var grouped = ToGroupedCategoriesModel(parent, subCategories);
                groupedCategories.Add(grouped);
            }

            return groupedCategories;
        }

        internal bool SetQuestion(QuestionModel model)
        {
            return faq.SetQuestion(model);
        }

        internal bool UpVote(int id)
        {
            return faq.UpVote(id);
        }

        public List<QaModel> GetFAQs()
        {
            return faq.GetFAQs();
        }

        internal bool DownVote(int id)
        {
            return faq.DownVote(id);
        }

        private GroupedCategoriesModel ToGroupedCategoriesModel(CategoryModel parent, List<CategoryModel> subCategories)
        {
            return new GroupedCategoriesModel
            {
                Parent = parent,
                Categories = subCategories
            };
        }
    }
}
