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
    private readonly KorpaService _korpaService;
    private readonly ProizvodiService _proizvodiService;
    public KupovinaController(AuthService authService, ProizvodiService proizvodiService, KorpaService korpaService)
    {
        _authService = authService;
        _proizvodiService = proizvodiService;
        _korpaService = korpaService;
    }
    
    [HttpGet("GetKorpa")]
    public async Task<ActionResult<Korpa>> GetKorpa(string username)
    {
        var korpa = await _korpaService.GetKorpaAsync(username);
        return korpa;
    }

    [HttpPut("DodajProizvodUKorpu")]
    public async Task<ActionResult> DodajUKorpu(string username, string proizvodId, int count = 1)
    {
        var korpa = await _korpaService.GetKorpaAsync(username);
        var proizvod = await _proizvodiService.GetAsync(proizvodId);
        for(int i = 0; i < count; i++)
        {
            korpa.ProizvodiIds.Add(proizvodId);
            korpa.UkupanRacun += proizvod.Cena;
        }
        await _korpaService.UpdateKorpaAsync(username, korpa);
        return Ok($"Proizvodi su uspesno dodati u korpu. Ukupan racun trenutno iznosi {korpa.UkupanRacun}");
    }

    [HttpPut("UkloniProizvodIzKorpe")]
    public async Task<ActionResult> UkloniIzKorpe(string username, string proizvodId)
    {
        var korpa = await _korpaService.GetKorpaAsync(username);
        var proizvod = await _proizvodiService.GetAsync(proizvodId);
        korpa.ProizvodiIds.Remove(proizvodId);
        korpa.UkupanRacun -= proizvod.Cena;
        await _korpaService.UpdateKorpaAsync(username, korpa);
        return Ok($"Proizvod je uspesno uklonjen iz korpe. Ukupan racun trenutno iznosi {korpa.UkupanRacun}");
    }

    [HttpPut("IsprazniKorpu")]
    public async Task<ActionResult> IsprazniKorpu(string username)
    {
        var korpa = await _korpaService.GetKorpaAsync(username);
        decimal racunOutput = korpa.UkupanRacun;
        korpa.ProizvodiIds.Clear();
        korpa.UkupanRacun = 0;
        await _korpaService.UpdateKorpaAsync(username, korpa);
        return Ok($"Uspesno ste ispraznili korpu, vas racun iznosi {racunOutput}");
    }

    [HttpPut("DodajPosecenProizvod")]
    public async Task<ActionResult> DodajPosecenProizvod(string username, string proizvodId)
    {
        var korisnik = await _authService.GetKorisnikAsync(username);
        var proizvod = await _proizvodiService.GetAsync(proizvodId);
        if(korisnik.NajskorijePoseceniProizvodi[4] is null or "")
        {
            for(int i=0; i<5; i++)
            {
                if(korisnik.NajskorijePoseceniProizvodi[i] is null or "")
                {
                    korisnik.NajskorijePoseceniProizvodi[i] = proizvod.ImeProizvoda;
                    break;
                }
                else if(korisnik.NajskorijePoseceniProizvodi[i] == proizvod.ImeProizvoda)
                {
                    return Ok();
                }
            }
        }
        else
        {
            for(int i=0; i<5; i++)
            {
                if(korisnik.NajskorijePoseceniProizvodi[i] == proizvod.ImeProizvoda)
                {
                    return Ok();
                }
            }
            for(int i=0; i<4; i++)
            {
                korisnik.NajskorijePoseceniProizvodi[i] = korisnik.NajskorijePoseceniProizvodi[i+1];
            }
            korisnik.NajskorijePoseceniProizvodi[4] = proizvod.ImeProizvoda;
        }
        await _authService.UpdateKorisnikAsync(username, korisnik);
        return Ok();
    }
}