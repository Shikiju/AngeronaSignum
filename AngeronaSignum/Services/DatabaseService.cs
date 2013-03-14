namespace AngeronaSignum.Services
{
    using MySql.Data.MySqlClient;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web;

    public class DatabaseService : IDatabaseService
    {
        public MySqlConnection GetOpenConnection()
        {
            var connection = new MySqlConnection(ConfigurationManager.ConnectionStrings["AngeronaConnection"].ToString());
            connection.Open();
            return connection;
        }

    }
}