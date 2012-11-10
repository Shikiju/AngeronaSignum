namespace AngeronaSignum.Filters
{
    using AngeronaSignum.Models;
    using AngeronaSignum.Services;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Web;
    using System.Web.Http.Controllers;
    using System.Web.Http.Filters;

    using Dapper;

    public class AuthenticationFilter : ActionFilterAttribute 
    {
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
            using (var connection = DatabaseService.GetOpenConnection())
            {
                user = connection.Query<User>("select * from User where email = @hashedEmail and password ", new { 
                    hashedEmail = hashedEmail.FirstOrDefault(),
                    hashedPassword = hashedPassword.FirstOrDefault()
                }).FirstOrDefault();
            }

            base.OnActionExecuting(filterContext);
        }
    }
}