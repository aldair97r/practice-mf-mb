var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy
        .WithOrigins(
            "http://localhost:4200",
            "http://localhost:4201",
            "http://localhost:4202",
            "http://localhost:4203")
        .AllowAnyHeader()
        .AllowAnyMethod()));

var app = builder.Build();

app.UseCors();

// La "base de datos" de este servicio. Nadie más accede a ella.
List<Producto> productos =
[
    new(1, "Teclado", 50m),
    new(2, "Mouse", 25m),
    new(3, "Monitor", 200m),
];

app.MapGet("/productos", () => productos);

app.MapGet("/productos/{id:int}", (int id) =>
{
    var producto = productos.FirstOrDefault(p => p.Id == id);

    return producto is null
        ? Results.NotFound(new { error = "Producto no encontrado" })
        : Results.Ok(producto);
});

app.Run();

record Producto(int Id, string Nombre, decimal Precio);