using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Identity;

namespace WebCoursework.Models
{
    public class FantasyTeam
    {
        public int FantasyTeamId { get; set; }  
        public int UserId { get; set; }
        public string SelectedPlayerIds { get; set; } //CSV stored values

    }
}
