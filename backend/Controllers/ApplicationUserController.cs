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
            _context = context; // Context initialized here
        }
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userManager.Users;
            return Ok(users);
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

            //Get the users existing team (CSV string of player Ids).
            var existingPlayerIds = new List<string>();
            if (!string.IsNullOrEmpty(user.SelectedPlayerIds))
            {
                existingPlayerIds = user.SelectedPlayerIds.Split(',').ToList();
            }

            //Get new players IDs sent from from end via PlayerAddModel
            var incomingPlayerIds = model.PlayerIds.Split(',').ToList();
            foreach (var playerId in incomingPlayerIds)
            {
                if (!existingPlayerIds.Contains(playerId))
                {
                    existingPlayerIds.Add(playerId);
                }
                else
                {
                    return BadRequest($"Player with ID {playerId} is already added.");
                }
            }

            // Update the user's SelectedPlayerIds
            user.SelectedPlayerIds = string.Join(",", existingPlayerIds);

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
                if (playerIds.Contains(model.PlayerId))
                {
                    playerIds.Remove(model.PlayerId);
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
