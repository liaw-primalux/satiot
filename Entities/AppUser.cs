using System;
using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string UserDesc { get; set; }
        public string Email { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime? PasswordExpiry { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool Active { get; set; }
    }
}