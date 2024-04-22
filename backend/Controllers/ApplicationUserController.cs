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

        [HttpPost("AddPlayer")]
        public async Task<IActionResult> AddPlayer([FromBody] PlayerAddModel model)
        {
            // Find the user by ID using UserManager, find email from front end response once logged in
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Add player ID to the user's SelectedPlayerIds property
            if (string.IsNullOrEmpty(user.SelectedPlayerIds))
            {
                user.SelectedPlayerIds = model.PlayerId;
            }
            else
            {
                var playerIds = user.SelectedPlayerIds.Split(',').ToList();
                if (playerIds.Count > 11)
                {
                    return BadRequest("A team cannot have more than 11 players");
                }
                if (!playerIds.Contains(model.PlayerId))
                {
                    playerIds.Add(model.PlayerId);
                    user.SelectedPlayerIds = string.Join(",", playerIds); // Join back to CSV string
                }
                else
                {
                    return BadRequest("Player already added.");
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Player added successfully.");
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
