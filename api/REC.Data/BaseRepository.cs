using Microsoft.Extensions.Options;
using System;
using System.Data;
using System.Data.SqlClient;

namespace REC.Data
{
    public class BaseRepository : IDisposable
    {
        private SqlConnection conn;

        private string connstr;

        public SqlConnection Context
        {
            get
            {
                if (conn == null)
                    conn = new SqlConnection(connstr);

                try
                {
                    if (conn.State != ConnectionState.Open)
                        conn.Open();

                    return conn;
                }
                catch (Exception ex) { throw ex; }
            }
        }

        public BaseRepository(IOptions<ConnOptions> config)
        {
            this.connstr = config.Value.DefaultConnection;
        }

        public void Dispose()
        {
            if (this.conn != null)
            {
                if (this.Context.State != ConnectionState.Closed)
                {
                    try
                    {
                        this.Context.Close();
                    }
                    catch (Exception) { throw; }
                }
            }
        }
    }
}
