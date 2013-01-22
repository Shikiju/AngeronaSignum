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
    public class EntityController : BaseController
    {
        [HttpGet]
        public IEnumerable<Entity> Index()
        {
            var entities = Enumerable.Empty<Entity>();
            using (var connection = DatabaseService.GetOpenConnection())
            {
                entities = connection.Query<Entity>("SELECT * FROM entity WHERE userid = @userid", new { userid = User.id } );
            }
            
            return entities;
        }

        [HttpGet]
        public Entity Index(int id)
        {
            var entity = new Entity();
            using (var connection = DatabaseService.GetOpenConnection())
            {
                entity = connection.Query<Entity>("SELECT * FROM entity WHERE id = @id", new { id = id }).FirstOrDefault();
            }

            return entity;
        }


        [HttpPost]
        public Entity Post(Entity entity)
        {
            var usar = this.User;

            using (var connection = DatabaseService.GetOpenConnection())
            {
                connection.Execute("INSERT INTO entity (name, login, password) VALUES (@name, @login,@password)", entity);
            }

            return entity;
        }

        [HttpOptions]
        public Entity Options(Entity entity)
        {
            return null;
        }
    }
}
