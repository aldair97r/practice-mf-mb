using System.Net;

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

builder.Services.AddHttpClient("productos", client =>
{
    client.BaseAddress = new Uri("http://localhost:3001");
    client.Timeout = TimeSpan.FromSeconds(5);
});

var app = builder.Build();

app.UseCors();

List<Pedido> pedidos = new();

app.MapGet("/pedidos", () => pedidos);

app.MapPost("/pedidos", async (CrearPedido datos, IHttpClientFactory fabrica) =>
{
    // 1. Pide a la fábrica el cliente "productos" (CreateClient)
    var cliente = fabrica.CreateClient("productos");

    // 2. Declara: HttpResponseMessage respuesta;
    //    Dentro de un try, llama a GetAsync($"/productos/{datos.ProductoId}")
    //    En el catch (HttpRequestException), devuelve Results.StatusCode(503)
    HttpResponseMessage respuesta;
    try
    {
        respuesta = await cliente.GetAsync($"/productos/{datos.ProductoId}");
    }
    catch (HttpRequestException)
    {
        return Results.StatusCode(503);
    }

    // 3. Si respuesta.StatusCode es HttpStatusCode.NotFound,
    //    devuelve Results.NotFound(new { error = "..." })
    if (respuesta.StatusCode == HttpStatusCode.NotFound)
    {
        return Results.NotFound(new { error = "Producto no encontrado" });
    }

    // 4. Lee el producto: await respuesta.Content.ReadFromJsonAsync<ProductoDto>()
    var producto = await respuesta.Content.ReadFromJsonAsync<ProductoDto>();

    // 5. Crea el Pedido: Id = pedidos.Count + 1, Total = precio × cantidad
    //    Agrégalo a la lista
    var pedido = new Pedido(
        Id: pedidos.Count + 1,
        ProductoId: datos.ProductoId,
        Cantidad: datos.Cantidad,
        Total: producto!.Precio * datos.Cantidad
    );
    pedidos.Add(pedido);

    // 6. Devuelve Results.Created($"/pedidos/{pedido.Id}", pedido)
    return Results.Created($"/pedidos/{pedido.Id}", pedido);
});

app.Run();

record CrearPedido(int ProductoId, int Cantidad);
record ProductoDto(int Id, string Nombre, decimal Precio);
record Pedido(int Id, int ProductoId, int Cantidad, decimal Total);