using MongoDobroBilje.Models;
using MongoDobroBilje.Services;
using Microsoft.AspNetCore.Mvc;
using Isopoh.Cryptography.Argon2;
using System.Security.Cryptography;

namespace MongoDobroBilje.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KupovinaController : ControllerBase
{
    private readonly AuthService _authService;
    public KupovinaController(AuthService authService) =>
        _authService = authService;
    
    [HttpGet("GetKorpa")]
    public async Task<ActionResult<Korpa>> GetKorpa(string username)
    {
        await _authService.GetKorpaAsync(username);
        return Ok();
    }

    [HttpPut("DodajProizvodUKorpu")]
    public async Task<ActionResult> DodajUKorpu(string username, string proizvodId, int count = 1)
    {
        var korpa = await _authService.GetKorpaAsync(username);
        for(int i = 0; i < count; i++)
            korpa.ProizvodiIds.Add(proizvodId);
        await _authService.UpdateKorpaAsync(username, korpa);
        return Ok();
    }
}