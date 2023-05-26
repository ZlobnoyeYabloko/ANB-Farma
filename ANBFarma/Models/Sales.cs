using System.ComponentModel.DataAnnotations;

namespace ANBFarma.Models
{
    public class Sales
    {
        public int id { get; set; }
        public int pharmaceuticals_id { get; set; }
        public float price { get; set; }
        public int count { get; set; }
        public int cash_receipts_id { get; set; }
        public int pharmacy_points_id { get; set; }
    }
}
