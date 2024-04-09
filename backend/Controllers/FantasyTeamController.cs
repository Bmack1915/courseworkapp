using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebCoursework.Models;

using System.Linq;

public class FantasyTeamController : Controller
{
    private readonly ApplicationDbContext _context;

    public FantasyTeamController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult AddPlayerToTeam(int teamId, int playerId)
    {
        var team = _context.FantasyTeam.FirstOrDefault(t => t.FantasyTeamId == teamId);
        if (team != null)
        {
            var ids = team.SelectedPlayerIds.Split(',').Select(int.Parse).ToList();
            if (!ids.Contains(playerId))
            {
                ids.Add(playerId);
                team.SelectedPlayerIds = string.Join(",", ids);
                _context.SaveChanges();
            }
        }
        return RedirectToAction("Index");
    }

    public IActionResult RemovePlayerFromTeam(int teamId, int playerId)
    {
        var team = _context.FantasyTeam.FirstOrDefault(t => t.FantasyTeamId == teamId);
        if (team != null)
        {
            var ids = team.SelectedPlayerIds.Split(',').Select(int.Parse).ToList();
            ids.Remove(playerId);
            team.SelectedPlayerIds = string.Join(",", ids);
            _context.SaveChanges();
        }
        return RedirectToAction("Index");
    }
}
