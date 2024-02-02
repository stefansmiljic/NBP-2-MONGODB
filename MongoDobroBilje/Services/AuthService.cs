using MongoDobroBilje.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MongoDobroBilje.Services;

public class AuthService
{
    private readonly IMongoCollection<Korisnik> _korisniciCollection;
    private readonly IMongoCollection<Token> _tokeniCollection;

    public AuthService(IOptions<ProdavnicaDatabaseSettings> prodavnicaDatabaseSettings)
    {
        var mongoClient = new MongoClient(prodavnicaDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(prodavnicaDatabaseSettings.Value.DatabaseName);
        _korisniciCollection = mongoDatabase.GetCollection<Korisnik>(prodavnicaDatabaseSettings.Value.UsersCollectionName);
        _tokeniCollection = mongoDatabase.GetCollection<Token>(prodavnicaDatabaseSettings.Value.TokenCollectionName);
    }

    //user crud
    public async Task<Korisnik> GetKorisnikAsync(string username) =>
        await _korisniciCollection.Find(x=>x.Username == username).FirstOrDefaultAsync();

    public async Task CreateKorisnikAsync(Korisnik newKorisnik) =>
        await _korisniciCollection.InsertOneAsync(newKorisnik);

    public async Task UpdateKorisnikAsync(string username, Korisnik updatedKorisnik) =>
        await _korisniciCollection.ReplaceOneAsync(x=>x.Username == username, updatedKorisnik);

    public async Task RemoveKorisnikAsync(string username) =>
        await _korisniciCollection.DeleteOneAsync(x=>x.Username == username);

    //token crud
    public async Task<Token> GetTokenAsync(string username)
    {
        var nadjeniToken = await _tokeniCollection.Find(x=>x.UsernameKorisnika == username).FirstOrDefaultAsync();
        if(nadjeniToken==null)
            return null;
        if(nadjeniToken.VremeIsticanja.CompareTo(DateTime.Now)>=0)
        {
            await _tokeniCollection.DeleteOneAsync(x=>x.TokenString == nadjeniToken.TokenString);
            return null;
        }
        return nadjeniToken;
    }      

    public async Task CreateTokenAsync(Token newToken) =>
        await _tokeniCollection.InsertOneAsync(newToken);

    public async Task RemoveTokenAsync(string token) =>
        await _tokeniCollection.DeleteOneAsync(x=>x.TokenString == token);
}