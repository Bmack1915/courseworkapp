using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.Identity.Client;

namespace WebCoursework.Models
{
    public class FantasyTeam
    {
        public int FantasyTeamId { get; set; }  
        public int UserId { get; set; }
        public string SelectedPlayerIds { get; set; } // Stores player IDs as a comma-separated string
    }
}
