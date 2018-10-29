using Microsoft.Extensions.DependencyInjection;
using s315579IndividuellOppgave.DAL.DbModels;
using System.Linq;

namespace s315579IndividuellOppgave.DAL
{
    public static class DbInit
    {
        public static void Initialize(IServiceScope serviceScope)
        {
            var dbContext = serviceScope.ServiceProvider.GetRequiredService<DbService>();
            dbContext.Database.EnsureCreated();

            if (!dbContext.Category.Any())
            {
                SeedCategory(dbContext);
                SeedQA(dbContext);
            }
        }

        private static void SeedCategory(DbService dbContext)
        {
            var newCategory = new Category
            {
                ParentId = null,
                Title = "Account"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = null,
                Title = "Purchase"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = null,
                Title = "Movies"
            };
            dbContext.Add(newCategory);

            dbContext.SaveChanges();

            var accountId = dbContext.Category.FirstOrDefault(a => a.Title == "Account").Id;
            newCategory = new Category
            {
                ParentId = accountId,
                Title = "Login"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = accountId,
                Title = "Privacy"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = accountId,
                Title = "Delete account"
            };
            dbContext.Add(newCategory);

            var purchaseId = dbContext.Category.FirstOrDefault(a => a.Title == "Purchase").Id;
            newCategory = new Category
            {
                ParentId = purchaseId,
                Title = "Payment"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = purchaseId,
                Title = "Refund"
            };
            dbContext.Add(newCategory);

            var moviesId = dbContext.Category.FirstOrDefault(a => a.Title == "Movies").Id;
            newCategory = new Category
            {
                ParentId = moviesId,
                Title = "New movies"
            };
            dbContext.Add(newCategory);

            newCategory = new Category
            {
                ParentId = moviesId,
                Title = "Downloads"
            };
            dbContext.Add(newCategory);

            dbContext.SaveChanges();

        }

        private static void SeedQA(DbService dbContext)
        {
            var downloads = dbContext.Category.FirstOrDefault(a => a.Title == "Downloads");
            var newQA = new QA
            {
                Question = "How do I download a movie?",
                Answer = "After you have purchased a movie you will find it under you 'My Orders' tab. There will be a download button next to the movie. Click it and the movie will be downloaded",
                UpVotes = 1,
                DownVotes = 1,
                Category = downloads,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I have problems downloading my movie",
                Answer = "If you have problems downloading a movie please check that you are connected to the internet",
                UpVotes = 5,
                DownVotes = 0,
                Category = downloads,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I downloaded the movie but I cannot find it",
                Answer = "The movie should end up in your 'downloads' folder on your computer unless you specified something else. You can search for it in the explorer.",
                UpVotes = 5,
                DownVotes = 0,
                Category = downloads,
            };
            dbContext.Add(newQA);

            var refund = dbContext.Category.FirstOrDefault(a => a.Title == "Refund");
            newQA = new QA
            {
                Question = "The movie I bought is not working. What do I do?",
                Answer = "You can request a refund and will be able to buy the movie again.",
                UpVotes = 5,
                DownVotes = 0,
                Category = refund,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "How do I ask for a refund?",
                Answer = "You can request a refund by email to admin@admin.com. Please include a description of why you need a refund. Only orders with faulty movies may be refunded.",
                UpVotes = 2,
                DownVotes = 1,
                Category = refund,
            };
            dbContext.Add(newQA);

            var newMovies = dbContext.Category.FirstOrDefault(a => a.Title == "New movies");
            newQA = new QA
            {
                Question = "When do you obtain the newest movies?",
                Answer = "We do our best at obtaining new movies as soon as they are released to the marked. If we do not have a movie you wish we had you can request it.",
                UpVotes = 8,
                DownVotes = 0,
                Category = newMovies,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "How do I request a movie?",
                Answer = "If we do not have a movie you wish we had you can request it by sending an email to admin@admin.com.",
                UpVotes = 30,
                DownVotes = 1,
                Category = newMovies,
            };
            dbContext.Add(newQA);


            dbContext.SaveChanges();
        }
    }
}
