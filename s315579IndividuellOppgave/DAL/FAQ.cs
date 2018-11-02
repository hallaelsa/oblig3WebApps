using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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

        public List<Models.CategoryModel> GetCategories()
        {
            var categories = dbService.Category
                .Select(dbCategory => ToCategoryModel(dbCategory))
                .ToList();
            return categories;
        }

        public List<Models.QaModel> GetFAQs()
        {
            var qa = dbService.QA
                .Include(c => c.Category)
                .Where(q => q.Answer != null)
                .OrderBy(q => q.Category.ParentId)
                .Select(a => ToQaModel(a))
                .ToList();
            return qa;
        }

        internal bool SetQuestion(QuestionModel model)
        {
            try
            {
                // it's ok if category is null. Then it is "other" and does not yet exist.
                var category = dbService.Category.FirstOrDefault(c => c.Id == model.CategoryId);
                var question = new QA
                {
                    Question = model.Question,
                    Answer = null,
                    UpVotes = 0,
                    DownVotes = 0,
                    Email = model.Email,
                    Category = category
                };

                dbService.Add(question);
                dbService.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        internal bool UpVote(int id)
        {
            try {
                var qa = dbService.QA.FirstOrDefault(q => q.Id == id);
                qa.UpVotes = qa.UpVotes + 1;
                dbService.SaveChanges();
                return true;
            } catch(Exception e)
            {
                return false;
            }
        }

        internal bool DownVote(int id)
        {
            try
            {
                var qa = dbService.QA.FirstOrDefault(q => q.Id == id);
                qa.DownVotes = qa.DownVotes + 1;
                dbService.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        private Models.QaModel ToQaModel(DbModels.QA dbQA)
        {
            return new Models.QaModel
            {
                Id = dbQA.Id,
                Question = dbQA.Question,
                Answer = dbQA.Answer,
                DownVotes = dbQA.DownVotes,
                UpVotes = dbQA.UpVotes,
                Category = ToCategoryModel(dbQA.Category)
            };
        }

        private Models.CategoryModel ToCategoryModel(DbModels.Category dbCategory)
        {
            return new Models.CategoryModel
            {
                Id = dbCategory.Id,
                ParentId = dbCategory.ParentId,
                Title = dbCategory.Title
            };
        }
    }
}
