using MongoDobroBilje.Models;
using MongoDobroBilje.Services;
using Microsoft.AspNetCore.Mvc;
using Isopoh.Cryptography.Argon2;
using System.Security.Cryptography;

namespace MongoDobroBilje.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    public AuthController(AuthService authService) =>
        _authService = authService;

    [HttpPost("Register")]
    public async Task<IActionResult> Register(Korisnik newKorisnik)
    {
        Korisnik k = await _authService.GetKorisnikAsync(newKorisnik.Username);
        if(k!=null)
        {
            return BadRequest("Korisnik sa tim korisnickim imenom vec postoji.");
        }      
        var passwordHash = Argon2.Hash(newKorisnik.Password);
        newKorisnik.Password = passwordHash;
        await _authService.CreateKorisnikAsync(newKorisnik);

        Korpa korpa = new(newKorisnik.Username);
        await _authService.CreateKorpaAsync(korpa);

        return Ok(); 
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(string username, string password)
    {
        var user = await _authService.GetKorisnikAsync(username);
        if(user==null)
        {
            return BadRequest("Korisnicko ime ili lozinka koje ste uneli nije tacna.");
        }
        if(Argon2.Verify(user.Password, password))
        {
            Token token = new(username);
            await _authService.CreateTokenAsync(token);
            
            var response = new
            {
                Token = token.TokenString,
                User = new {
                    id = user.Id,
                    username = user.Username,
                    isAdmin = user.IsAdmin
                }
            };

            return Ok(response);
        }
        return BadRequest("Korisnicko ime ili lozinka koje ste uneli nije tacna.");
    }

    [HttpDelete("DeleteAccount")]
    public async Task<IActionResult> DeleteAccount(string username)
    {
        var korisnik = await _authService.GetKorisnikAsync(username);

        if(korisnik is null)
        {
            return NotFound();
        }

        await _authService.RemoveTokenAsync(username);
        await _authService.RemoveKorpaAsync(username);
        await _authService.RemoveKorisnikAsync(username);
        
        return NoContent();
    }
    
    [HttpDelete("Logout")]
    public async Task<IActionResult> Logout(string token)
    {
        if(token!=null)
        {
            await _authService.RemoveTokenAsync(token);
            return Ok("Uspesno ste se izlogovoali.");
        }
        return BadRequest();
    }

    [HttpGet("GetUserByToken")]
    public async Task<ActionResult<Korisnik>> GetUserByToken(string token)
    {
        var userToken = await _authService.GetTokenByStringAsync(token);
        var username = userToken.UsernameKorisnika;
        var korisnik = await _authService.GetKorisnikAsync(username);
        if(korisnik!=null)
            return Ok(korisnik);
        return BadRequest("Greska!");
    }

    [HttpPut("UpdateUser")]
    public async Task<IActionResult> UpdateKorisnik(string id, Korisnik updatedKorisnik)
    {
        var korisnik = await _authService.GetKorisnikByIdAsync(id);
        if(korisnik is null)
        {
            return NotFound();
        }

        updatedKorisnik.Id = korisnik.Id;
        var passwordHash = Argon2.Hash(updatedKorisnik.Password);
        updatedKorisnik.Password = passwordHash;

        await _authService.UpdateKorisnikAsync(id, updatedKorisnik);

        return NoContent();
    }
}