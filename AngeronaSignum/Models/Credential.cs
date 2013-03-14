namespace AngeronaSignum.WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Credential
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string GroupName { get; set; }
        public bool IsFavorite { get; set; }
        public int UserId { get; set; }
    }
}