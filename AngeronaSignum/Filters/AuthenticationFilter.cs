namespace AngeronaSignum.Filters
{
    using AngeronaSignum.Models;
    using AngeronaSignum.Services;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    using Dapper;
    using System.Net;
    using System.Web.Http;
    using AngeronaSignum.Controllers;

    public class AuthenticationFilter : ActionFilterAttribute 
    {
        private IDatabaseService databaseService;

        public AuthenticationFilter()
        {
            this.databaseService = (IDatabaseService)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IDatabaseService));
        }

        public override void OnActionExecuting(HttpActionContext filterContext)
        {
            if (filterContext.Request.Method == HttpMethod.Options)
            {
                return;
            }
            var headers = filterContext.Request.Headers;

            IEnumerable<string> hashedEmail;
            IEnumerable<string> hashedPassword;

            headers.TryGetValues("AngeronaSignum-Email", out hashedEmail);
            headers.TryGetValues("AngeronaSignum-Password", out hashedPassword);

            User user;
            using (var connection = this.databaseService.GetOpenConnection())
            {
                user = connection.Query<User>("select * from users where hashedEmail = @hashedEmail and hashedPassword = @hashedPassword", new { 
                    hashedEmail = hashedEmail.FirstOrDefault(),
                    hashedPassword = hashedPassword.FirstOrDefault()
                }).FirstOrDefault();
            }

            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.Forbidden);
            }

            ((BaseController)filterContext.ControllerContext.Controller).User = user;

            base.OnActionExecuting(filterContext); 
        }
    }
}