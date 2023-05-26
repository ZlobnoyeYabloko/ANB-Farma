namespace ANBFarma.Models
{
    public class Pharm
    {
        public int id { get; set; }
        public string name { get; set; }
        public int packing { get; set; }
        public int price { get; set; }
        public int manufactures_id { get; set; }
        public int pharmaceutical_types_id { get; set; }
        public string imageUrl { get; set; }
    }
}
