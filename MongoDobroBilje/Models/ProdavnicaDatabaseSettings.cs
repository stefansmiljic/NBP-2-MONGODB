namespace MongoDobroBilje.Models;

public class ProdavnicaDatabaseSettings
{
    public string ConnectionString { get; set; } = null;
    public string DatabaseName { get; set; } = null;
    public string ProductsCollectionName { get; set; } = null!;
}