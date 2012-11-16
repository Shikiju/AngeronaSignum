namespace AngeronaSignum.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class User
    {
        public int id { get; set; }
        public string hashedEmail { get; set; }
        public string hashedPassword { get; set; }
    }
}