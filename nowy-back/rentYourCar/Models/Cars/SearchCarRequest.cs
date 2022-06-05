namespace WebApi.Models.Cars
{
    public class SearchCarRequest
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public string NumPassangers { get; set; }
        public string Transmission { get; set; }
        public int? PricePerDay { get; set; }
        public string Adress { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }

    }
}
