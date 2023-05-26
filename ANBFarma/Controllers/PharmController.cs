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
    public class PharmController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public PharmController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select id, name, packing, price, manufactures_id, pharmaceutical_types_id, imageUrl from
                            dbo.pharmaceuticals
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
        [HttpPost]
        public JsonResult Post(Pharm pharm)
        {
            string query = @"
                           insert into dbo.pharmaceuticals
                           values (@name, @packing, @price, @manufactures_id, @pharmaceutical_types_id, @imageUrl)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@name", pharm.name);
                    myCommand.Parameters.AddWithValue("@packing", pharm.packing);
                    myCommand.Parameters.AddWithValue("@price", pharm.price);
                    myCommand.Parameters.AddWithValue("@manufactures_id", pharm.manufactures_id);
                    myCommand.Parameters.AddWithValue("@pharmaceutical_types_id", pharm.pharmaceutical_types_id);
                    myCommand.Parameters.AddWithValue("@imageUrl", pharm.imageUrl);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Pharm pharm)
        {
            string query = @"
                           update dbo.pharmaceuticals
                           set name = @name, packing = @packing, price = @price, manufactures_id = @manufactures_id, pharmaceutical_types_id = @pharmaceutical_types_id, imageUrl = @imageUrl
                            where id=@id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", pharm.id);
                    myCommand.Parameters.AddWithValue("@name", pharm.name);
                    myCommand.Parameters.AddWithValue("@packing", pharm.packing);
                    myCommand.Parameters.AddWithValue("@price", pharm.price);
                    myCommand.Parameters.AddWithValue("@manufactures_id", pharm.manufactures_id);
                    myCommand.Parameters.AddWithValue("@pharmaceutical_types_id", pharm.pharmaceutical_types_id);
                    myCommand.Parameters.AddWithValue("@imageUrl", pharm.imageUrl);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.pharmaceuticals
                            where id=@id
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DataBaseConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("upload.png");
            }
        }
    }
}
