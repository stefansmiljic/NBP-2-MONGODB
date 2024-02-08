using MongoDobroBilje.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MongoDobroBilje.Services;

public class KorpaService
{
    private readonly IMongoCollection<Korisnik> _korisniciCollection;
    private readonly IMongoCollection<Token> _tokeniCollection;
    private readonly IMongoCollection<Korpa> _korpeCollection;

    public KorpaService(IOptions<ProdavnicaDatabaseSettings> prodavnicaDatabaseSettings)
    {
        var mongoClient = new MongoClient(prodavnicaDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(prodavnicaDatabaseSettings.Value.DatabaseName);
        _korisniciCollection = mongoDatabase.GetCollection<Korisnik>(prodavnicaDatabaseSettings.Value.UsersCollectionName);
        _tokeniCollection = mongoDatabase.GetCollection<Token>(prodavnicaDatabaseSettings.Value.TokenCollectionName);
        _korpeCollection = mongoDatabase.GetCollection<Korpa>(prodavnicaDatabaseSettings.Value.KorpeCollectionName);
    }

    public async Task<Korpa> GetKorpaAsync(string username) =>
        await _korpeCollection.Find(x=>x.UsernameKorisnika == username).FirstOrDefaultAsync();

    public async Task UpdateKorpaAsync(string username, Korpa updatedKorpa) =>
        await _korpeCollection.ReplaceOneAsync(x=>x.UsernameKorisnika == username, updatedKorpa);

    public async Task RemoveKorpaAsync(string username) =>
        await _korpeCollection.DeleteOneAsync(x=>x.UsernameKorisnika == username);
}