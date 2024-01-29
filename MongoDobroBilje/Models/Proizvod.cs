using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDobroBilje.Models;

public class Proizvod
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonElement("Name")]
    public string ImeProizvoda { get; set; }
    public string UrlSlike { get; set; }
    public decimal Cena { get; set; }
    public TipProizvoda TipProizvoda {get;set;}
}


public enum TipProizvoda
{
    Caj,
    Zacin,
    Preparat
}