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
            Token token = new Token(username);
            await _authService.CreateTokenAsync(token);
            return Ok(token.TokenString);
        }
        return BadRequest("Korisnicko ime ili lozinka koje ste uneli nije tacna.");
    }
}