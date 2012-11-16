namespace AngeronaSignum.Controllers
{
    using AngeronaSignum.Models;
    using System.Web.Http;

    public class BaseController : ApiController
    {
        public User User { get; set; }

        public BaseController() 
            : base()
        { 
        }
    }
}
