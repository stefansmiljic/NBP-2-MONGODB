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
    private readonly ProizvodiService _proizvodiService;
    public KupovinaController(AuthService authService, ProizvodiService proizvodiService)
    {
        _authService = authService;
        _proizvodiService = proizvodiService;
    }
    
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
        var proizvod = await _proizvodiService.GetAsync(proizvodId);
        for(int i = 0; i < count; i++)
        {
            korpa.ProizvodiIds.Add(proizvodId);
            korpa.UkupanRacun += proizvod.Cena;
        }
        await _authService.UpdateKorpaAsync(username, korpa);
        return Ok($"Proizvodi su uspesno dodati u korpu. Ukupan racun trenutno iznosi {korpa.UkupanRacun}");
    }

    [HttpPut("UkloniProizvodIzKorpe")]
    public async Task<ActionResult> UkloniIzKorpe(string username, string proizvodId)
    {
        var korpa = await _authService.GetKorpaAsync(username);
        var proizvod = await _proizvodiService.GetAsync(proizvodId);
        korpa.ProizvodiIds.Remove(proizvodId);
        korpa.UkupanRacun -= proizvod.Cena;
        await _authService.UpdateKorpaAsync(username, korpa);
        return Ok($"Proizvod je uspesno uklonjen iz korpe. Ukupan racun trenutno iznosi {korpa.UkupanRacun}");
    }

    [HttpPut("IsprazniKorpu")]
    public async Task<ActionResult> IsprazniKorpu(string username)
    {
        var korpa = await _authService.GetKorpaAsync(username);
        korpa.ProizvodiIds.Clear();
        korpa.UkupanRacun = 0;
        await _authService.UpdateKorpaAsync(username, korpa);
        return Ok("Uspesno ste ispraznili korpu");
    }


}