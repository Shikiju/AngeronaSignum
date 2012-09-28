namespace AngeronaSignum.WebApi.Controllers
{
    using AngeronaSignum.WebApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using Dapper;

    public class EntityController : ApiController
    {
        [HttpGet]
        public IEnumerable<Entity> Index()
        {
            var entities = Enumerable.Empty<Entity>();
            using (var connection = DatabaseService.GetOpenConnection())
            {
                entities = connection.Query<Entity>("select * from entity");
            }
            
            return entities;
        }

        [HttpGet]
        public Entity Index(int id)
        {
            var entity = new Entity;
            using (var connection = DatabaseService.GetOpenConnection())
            {
                entity = connection.Query<Entity>("select * from entity where id = @id", new { id = id });
            }

            return entity;
        }


        [HttpPost]
        public Entity Post(Entity entity)
        {
            using (var connection = DatabaseService.GetOpenConnection())
            {
                connection.Query<Entity>("INSERT INTO entity (name, email, password) VALUES (@name, @email,@password)", entity);
            }

            return entity;
        }
    }
}
