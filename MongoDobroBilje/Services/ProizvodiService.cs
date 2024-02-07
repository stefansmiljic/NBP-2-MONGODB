using MongoDobroBilje.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.AspNetCore.Mvc;

namespace MongoDobroBilje.Services;

public class ProizvodiService
{
    private readonly IMongoCollection<Proizvod> _proizvodiCollection;

    public ProizvodiService(IOptions<ProdavnicaDatabaseSettings> prodavnicaDatabaseSettings)
    {
        var mongoClient = new MongoClient(prodavnicaDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(prodavnicaDatabaseSettings.Value.DatabaseName);
        _proizvodiCollection = mongoDatabase.GetCollection<Proizvod>(prodavnicaDatabaseSettings.Value.ProductsCollectionName);
    }

    public async Task<List<Proizvod>> GetAllProducts() =>
        await _proizvodiCollection.Find(_ => true).ToListAsync();

    public async Task<List<Proizvod>> GetAsyncPaginated(int page=1, int pageSize=5, int type = -1)
    {
        var proizvodi = new List<Proizvod>();
        if(type == -1)
        {
            proizvodi = await _proizvodiCollection.Find(_ => true).Skip((page-1)*pageSize).Limit(pageSize).ToListAsync();
        }
        else
        {
            proizvodi = await _proizvodiCollection.Find(x => x.TipProizvoda == (TipProizvoda)type).Skip((page-1)*pageSize).Limit(pageSize).ToListAsync();
        }
        return proizvodi;
    }

    public async Task<int> GetNumberOfProducts()
    {
        var number = await _proizvodiCollection.Find(_ => true).ToListAsync();
        return number.Count;
    }

    public async Task<Proizvod> GetAsync(string id) =>
        await _proizvodiCollection.Find(x=>x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Proizvod newProizvod) =>
        await _proizvodiCollection.InsertOneAsync(newProizvod);

    public async Task UpdateAsync(string id, Proizvod updatedProizvod) =>
        await _proizvodiCollection.ReplaceOneAsync(x=>x.Id == id, updatedProizvod);

    public async Task RemoveAsync(string id) =>
        await _proizvodiCollection.DeleteOneAsync(x=>x.Id == id);
}