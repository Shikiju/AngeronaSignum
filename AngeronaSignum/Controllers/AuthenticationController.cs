namespace AngeronaSignum.Controllers
{
    using AngeronaSignum.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;

    public class AuthenticationController : ApiController
    {
        //
        // GET: /Authentication/

        public User Index()
        {
            var user = new User();
            return user;
        }

    }
}
