using System;
using System.Collections.Generic;
using System.Linq;
using s315579IndividuellOppgave.DAL.DbModels;
using s315579IndividuellOppgave.Models;

namespace s315579IndividuellOppgave.DAL
{
    public class FAQ
    {
        private readonly DbService dbService;

        public FAQ(DbService dbService)
        {
            this.dbService = dbService;
        }

        public List<Models.Category> GetCategories()
        {
            var categories = dbService.Category.Select(dbCategory => ToCategoryModel(dbCategory)).ToList();
            return categories;
        }

        private Models.Category ToCategoryModel(DbModels.Category dbCategory)
        {
            return new Models.Category
            {
                Id = dbCategory.Id,
                ParentId = dbCategory.ParentId,
                Title = dbCategory.Title
            };
        }
    }
}
