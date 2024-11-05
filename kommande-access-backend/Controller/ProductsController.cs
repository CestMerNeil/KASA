using kommande_access_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace kommande_access_backend.Controller;

public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _productService.GetProductsFromApiAsync();
        return Ok(products);
    }
    
}