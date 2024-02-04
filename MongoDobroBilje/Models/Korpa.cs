using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoDobroBilje.Models;

public class Korpa(string username)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string UsernameKorisnika { get; set; } = username;
    public List<string> ProizvodiIds { get; set; } = new List<string>();
}