namespace AngeronaSignum.Controllers
{
    using AngeronaSignum.Filters;
    using AngeronaSignum.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;

    [AuthenticationFilter]
    public class AuthenticationController : BaseController
    {
        //
        // GET: /Authentication/

        [HttpGet]
        public bool Index()
        {
            return this.User != null;
        }
    }
}
