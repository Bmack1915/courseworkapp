using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string SelectedPlayerIds { get; set; } // CSV of player IDs
}
