using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebCoursework.Models;

using Microsoft.AspNetCore.Identity;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationUserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users;
            return Ok(users);
        }

        [HttpGet("GetPlayerIds")]
        public async Task<IActionResult> GetSelectedPlayerIds([FromQuery] string email)
        {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

            return Ok(user.SelectedPlayerIds ?? "No players selected.");
        }

        [HttpDelete]
        public async Task<IActionResult> ClearSelectedPlayerIds([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"User not found.");
            }
            user.SelectedPlayerIds = null;
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok("Fantasy team reset");
            }

            // If the update failed, return an error response
            return BadRequest("Failed to reset PlayerIDs storing the users fantasy team");
        }


        [HttpPost("AddPlayers")]
        public async Task<IActionResult> AddPlayers([FromBody] PlayerAddModel model)
        {
            // Find the user by email, check if they exist on the system
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            user.SelectedPlayerIds =  model.PlayerIds;

            // Save changes using UserManager
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok($"Updated player list for user {user.Email}.");
            }
            else
            {
                return BadRequest("Failed to update player list.");
            }
        }

      
        [HttpPut("AddPlayers")]
        public async Task<IActionResult> EditPlayers([FromBody] PlayerAddModel model)
        {
            // Find the user by email, check if they exist on the system
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            user.SelectedPlayerIds =  model.PlayerIds;

            // Save changes using UserManager
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok($"Updated player list for user {user.Email}.");
            }
            else
            {
                return BadRequest("Failed to update player list.");
            }
        }


        [HttpPost("RemovePlayer")]
        public async Task<IActionResult> RemovePlayer([FromBody] PlayerAddModel model)
        {
            // Find the user by ID using UserManager, find email from front end response once logged in
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (string.IsNullOrEmpty(user.SelectedPlayerIds))
            {
                return BadRequest("The team has no players to remove.");
            }
            else
            {
                var playerIds = user.SelectedPlayerIds.Split(',').ToList();
                if (playerIds.Contains(model.PlayerIds))
                {
                    playerIds.Remove(model.PlayerIds);
                    user.SelectedPlayerIds = string.Join(",", playerIds); // Join back to CSV string
                }
                else
                {
                    return BadRequest("Player not on the team");
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest("HELLO" + result.Errors);
            }

            return Ok("Player removed successfully.");
        }


    }
}
