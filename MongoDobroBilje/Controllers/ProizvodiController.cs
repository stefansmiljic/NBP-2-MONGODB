using MongoDobroBilje.Models;
using MongoDobroBilje.Services;
using Microsoft.AspNetCore.Mvc;

namespace MongoDobroBilje.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProizvodiController : ControllerBase
{
    private readonly ProizvodiService _proizvodiService;

    public ProizvodiController(ProizvodiService proizvodiService) =>
        _proizvodiService = proizvodiService;

    [HttpGet("GetProducts")]
    public async Task<List<Proizvod>> Get() =>
        await _proizvodiService.GetAllProducts();

    [HttpGet("GetProductsPaginated")]
    public async Task<List<Proizvod>> GetPaginated(int page=1, int pageSize=5, int type=-1) =>
        await _proizvodiService.GetAsyncPaginated(page, pageSize, type);

    
    [HttpGet("GetProduct{id:length(24)}")]
    public async Task<ActionResult<Proizvod>> GetProduct(string id)
    {
        var proizvod = await _proizvodiService.GetAsync(id);

        if(proizvod is null)
        {
            return NotFound();
        }

        return proizvod;
    }

    [HttpPost("PostProduct")]
    public async Task<IActionResult> Post(Proizvod newProizvod)
    {
        await _proizvodiService.CreateAsync(newProizvod);

        return CreatedAtAction(nameof(Get), new { id = newProizvod.Id}, newProizvod);
    }

    [HttpPut("UpdateProduct{id:length(24)}")]
    public async Task<IActionResult> UpdateProduct(string id, Proizvod updatedProizvod)
    {
        var proizvod = await _proizvodiService.GetAsync(id);

        if(proizvod is null)
        {
            return NotFound();
        }

        updatedProizvod.Id = proizvod.Id;

        await _proizvodiService.UpdateAsync(id, updatedProizvod);

        return NoContent();
    }

    [HttpDelete("DeleteProduct{id:length(24)}")]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        var proizvod = await _proizvodiService.GetAsync(id);

        if(proizvod is null)
        {
            return NotFound();
        }

        await _proizvodiService.RemoveAsync(id);
        
        return NoContent();
    }

    [HttpGet("CountPages")]
    public async Task<IActionResult> CountPages(int pageSize, int type)
    {
        if(pageSize<=0)
            return BadRequest("Velicina stranice ne moze biti nula!");
        var numberOfProducts = (await _proizvodiService.GetNumberOfProducts(type)) / pageSize + ((await _proizvodiService.GetNumberOfProducts(type)) % pageSize == 0 ? 0 : 1);
        int[] niz = new int[numberOfProducts];
        for(int i=0;i<numberOfProducts;i++)
            niz[i] = i;
        return Ok(niz);
    }
}