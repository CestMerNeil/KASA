namespace kommande_access_backend.Services;

public class ProductService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ProductService> _logger;

    public ProductService(HttpClient httpClient, ILogger<ProductService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<List<Product>> GetProductsFromApiAsync()
    {
        try
        {
            var api = "https://da60dbb1-af1a-4f29-a731-0ee1aed7521c.mock.pstmn.io/data";
            var products = await _httpClient.GetFromJsonAsync<List<Product>>(api);
            return products ?? new List<Product>();
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, ex.Message);
            return new List<Product>();
        }
    }
}