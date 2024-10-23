using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private static readonly User[] Users = new[]
    {
        new User() { Name = "Weston Walker"},
        new User() { Name = "Cole Walker"}
    };

    private readonly ILogger<UserController> _logger;
    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetUsers")]
    public IEnumerable<User> Get()
    {
        return Users.ToList();
    }
}

public class User {
    public string Name {get;set;} = String.Empty;
}
