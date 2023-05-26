using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data;
using ANBFarma.Models;

namespace ANBFarma.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManufController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ManufController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select id, name, country, town from
                            dbo.manufacturers
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
    }
}
