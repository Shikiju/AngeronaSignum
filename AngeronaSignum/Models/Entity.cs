namespace AngeronaSignum.WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Entity
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}