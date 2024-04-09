using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace WebCoursework.Models
{
	public class StartingTeam
	{
        public int UserId { get; set; }
        public List<Player> SelectedTeam { get; set; }
        public List<Player>? Players { get; set; }
    }
}

