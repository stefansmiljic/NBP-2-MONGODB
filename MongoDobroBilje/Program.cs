using MongoDobroBilje.Models;
using MongoDobroBilje.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ProdavnicaDatabaseSettings>(
    builder.Configuration.GetSection("ProdavnicaDatabase"));

builder.Services.AddSingleton<ProizvodiService>();
builder.Services.AddSingleton<AuthService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin();
        corsPolicyBuilder.AllowAnyHeader();
        corsPolicyBuilder.AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
