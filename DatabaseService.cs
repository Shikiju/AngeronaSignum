namespace AngeronaSignum
{
    using MySql.Data.MySqlClient;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web;

    public static class DatabaseService
    {
        public static readonly string connectionString = "Server=localhost;Database=angeronasignum.database.mysql;Uid=root;Pwd=lkk3v%99;";

        public static MySqlConnection GetOpenConnection()
        {
            var connection = new MySqlConnection(connectionString);
            connection.Open();
            return connection;
        }

    }
}