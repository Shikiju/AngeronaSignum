namespace AngeronaSignum.WebApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;

    using Dapper;
    using AngeronaSignum.Services;
    using AngeronaSignum.WebApi.Models;
    using AngeronaSignum.Filters;
    using AngeronaSignum.Controllers;

    [AuthenticationFilter]
    public class CredentialController : BaseController
    {
        private IDatabaseService databaseService;

        public CredentialController(IDatabaseService databaseService)
        {
            this.databaseService = databaseService;
        }

        [HttpGet]
        public IEnumerable<Credential> Index()
        {
            var credentials = Enumerable.Empty<Credential>();
            using (var connection = this.databaseService.GetOpenConnection())
            {
                credentials = connection.Query<Credential>("SELECT * FROM credential WHERE userid = @userid", new { userid = this.User });
            }

            return credentials;
        }

        [HttpGet]
        public Credential Index(int id)
        {
            var credential = new Credential();
            using (var connection = this.databaseService.GetOpenConnection())
            {
                credential = connection.Query<Credential>("SELECT * FROM credential WHERE id = @id AND userid = @userid", new { id = id, userid = this.User }).FirstOrDefault();
            }

            return credential;
        }

        [HttpPut]
        public Credential Put(Credential credential)
        {
            using (var connection = this.databaseService.GetOpenConnection())
            {
                credential = connection.Query<Credential>(
                    @"UPDATE credential 
                    SET    Name = @Name, 
                           Login = @Login, 
                           Password = @Password, 
                           GroupName = @GroupName, 
                           IsFavorite = @IsFavorite 
                    WHERE  Id = @id 
                           AND userid = @userid", new { credential, userid = this.User }).FirstOrDefault();
            }

            return credential;
        }

        [HttpPost]
        public Credential Post(Credential credential)
        {
            var user = this.User;

            using (var connection = this.databaseService.GetOpenConnection())
            {
                connection.Execute("INSERT INTO credential (Name, Login, Password, GroupName, IsFavorite) VALUES (@Name, @Login,@Password, @GroupName, @IsFavorite)", credential);
            }

            return credential;
        }

        [HttpDelete]
        public void Delete(Credential credential)
        {
            using (var connection = this.databaseService.GetOpenConnection())
            {
                connection.Execute("DELETE FROM credential WHERE id = @id ", credential);
            }
        }

        [HttpOptions]
        public void Options(Credential credential)
        {
            return;
        }
    }
}
