using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDobroBilje.Models;

public class Korisnik()
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public bool IsAdmin { get; set; } = false;
}