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

    [HttpGet]
    public async Task<List<Proizvod>> Get() =>
        await _proizvodiService.GetAsync();
    
    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Proizvod>> Get(string id)
    {
        var proizvod = await _proizvodiService.GetAsync(id);

        if(proizvod is null)
        {
            return NotFound();
        }

        return proizvod;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Proizvod newProizvod)
    {
        await _proizvodiService.CreateAsync(newProizvod);

        return CreatedAtAction(nameof(Get), new { id = newProizvod.Id}, newProizvod);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Proizvod updatedProizvod)
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

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var proizvod = await _proizvodiService.GetAsync(id);

        if(proizvod is null)
        {
            return NotFound();
        }

        await _proizvodiService.RemoveAsync(id);
        
        return NoContent();
    }
}