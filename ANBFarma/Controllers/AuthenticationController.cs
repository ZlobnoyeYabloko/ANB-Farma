using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Data;
using ANBFarma.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;

namespace ANBFarma.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public AuthenticationController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpPost]
        [Route("Registration")]
        public JsonResult Post(Users user)
        {
            string query = @"
                           insert into dbo.users
                           values (@FirstName, @Password, @Email)
                            ";

            string msg = string.Empty;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPost]
        [Route("Login")]
        public JsonResult GetLogin(Users user)
        {
            string query = @"
                            select FirstName, Password from
                            dbo.users WHERE  FirstName=@FirstName and Password=@Password
                            ";

            DataTable table = new DataTable();
            string msg = string.Empty;
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                    if(table.Rows.Count > 0)
                    {
                        msg = "You logined";
                    }
                    else
                    {
                        msg = "Wrong data";
                    }
                }
            }

            return new JsonResult(msg);
        }
    }
}
