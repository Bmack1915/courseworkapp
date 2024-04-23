using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace WebCoursework.Models
{
	public class Team
	{
        public int TeamId { get; set; }
        public string Name { get; set; }
        public string? BadgeURL { get; set; }
        public double? lat {get; set; }
        public double? lng {get;set;} 
        public string? description  { get; set; }

        //FK
        public int LeagueId { get; set; }
        [JsonIgnore]
        public List<Player>? Players { get; set; }
    }
}

