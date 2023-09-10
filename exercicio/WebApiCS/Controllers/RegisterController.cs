using Microsoft.AspNetCore.Mvc;

namespace WebApiCS.Controllers;

[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] UserDto userDto)
    {
        return Created("", userDto);
    }

}
