public record UserDto
{
    public UserDto()
    {
        Email = "Teste";
    }
    public string Email { get; set; }
    public string Name { get; set; } = string.Empty;
    public string GithubUsername { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
}