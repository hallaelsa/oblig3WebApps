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
            // parent categories
            var newCategory = new Category { ParentId = null,  Title = "Account" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = null, Title = "Purchase" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = null, Title = "Movies" };
            dbContext.Add(newCategory);

            dbContext.SaveChanges();

            // sub categories
            var accountId = dbContext.Category.FirstOrDefault(a => a.Title == "Account").Id;
            newCategory = new Category { ParentId = accountId, Title = "Login/Registration" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = accountId, Title = "Privacy" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = accountId, Title = "Delete account" };
            dbContext.Add(newCategory);

            var purchaseId = dbContext.Category.FirstOrDefault(a => a.Title == "Purchase").Id;
            newCategory = new Category { ParentId = purchaseId, Title = "Payment" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = purchaseId, Title = "Refund" };
            dbContext.Add(newCategory);

            var moviesId = dbContext.Category.FirstOrDefault(a => a.Title == "Movies").Id;
            newCategory = new Category { ParentId = moviesId, Title = "New movies" };
            dbContext.Add(newCategory);

            newCategory = new Category { ParentId = moviesId, Title = "Downloads" };
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

            var payment = dbContext.Category.FirstOrDefault(a => a.Title == "Payment");
            newQA = new QA
            {
                Question = "What types of cards do you accept?",
                Answer = "At the moment we only accept Visa cards.",
                UpVotes = 8,
                DownVotes = 0,
                Category = payment,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I was charged double for one order. What do I do?",
                Answer = "Please contact us at admin@admin.com and provide a document showing the transaction. We will fix the problem.",
                UpVotes = 11,
                DownVotes = 4,
                Category = payment,
            };
            dbContext.Add(newQA);

            var deleteAccount = dbContext.Category.FirstOrDefault(a => a.Title == "Delete account");
            newQA = new QA
            {
                Question = "I want to delete my accound. How do I do that?",
                Answer = "Make a request to have you account deleted. Be aware that your order history will also be deleted and thus you cannot download any purchased movies again if you deside to become a member again",
                UpVotes = 8,
                DownVotes = 0,
                Category = deleteAccount,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I deleted my account but want to be a member again",
                Answer = "Please register a new account. Be aware that your order history was deleted when deleting your account and thus you cannot download any previously purchased movies.",
                UpVotes = 8,
                DownVotes = 0,
                Category = deleteAccount,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "My account seems to be deleted, but I did not delete it myself.",
                Answer = "Your account might have been suspended due to violations of our terms of services.",
                UpVotes = 8,
                DownVotes = 0,
                Category = deleteAccount,
            };
            dbContext.Add(newQA);

            var privacy = dbContext.Category.FirstOrDefault(a => a.Title == "Privacy");
            newQA = new QA
            {
                Question = "Why do I have to give my age when registering?",
                Answer = "Our service is not available for children and thus all users must provide their age upon registration.",
                UpVotes = 8,
                DownVotes = 0,
                Category = privacy,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "How is my personal information used?",
                Answer = "Personal information collected on this site is never shared with third party applications. Contact information is only used to provide comminication with the users and will not be used for commercial unless the user has agreed to this.",
                UpVotes = 8,
                DownVotes = 0,
                Category = privacy,
            };
            dbContext.Add(newQA);

            var login = dbContext.Category.FirstOrDefault(a => a.Title == "Login/Registration");
            newQA = new QA
            {
                Question = "I cannot log in to this site!",
                Answer = "Please make sure you have created a user with our service. If you have created an account with us but cannot log in, please check if you are using the correct password. If you are not able to reset your passord you account might have been suspended due to validations with our terms of service.",
                UpVotes = 8,
                DownVotes = 0,
                Category = login,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I have problems creating a password.",
                Answer = "Our service requires you to create a strong password. Please make sure you are using both capital and small letters as well as numbers when creating a password.",
                UpVotes = 8,
                DownVotes = 0,
                Category = login,
            };
            dbContext.Add(newQA);

            newQA = new QA
            {
                Question = "I have forgotten my password.",
                Answer = "Please reset you password by contacting us at admin@admin.com.",
                UpVotes = 8,
                DownVotes = 0,
                Category = login,
            };
            dbContext.Add(newQA);

            dbContext.SaveChanges();
        }
    }
}
