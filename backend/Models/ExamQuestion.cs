using System;
using System.Collections.Generic;

namespace OIT1_API.Models
{
    public class ExamQuestion
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string OptionsRaw { get; set; } = string.Empty; // Joined by "|"
        public int CorrectOptionIndex { get; set; }
        public string Explanation { get; set; } = string.Empty;
        public string SyllabusConcept { get; set; } = string.Empty;

        public List<string> Options
        {
            get => string.IsNullOrEmpty(OptionsRaw) ? new List<string>() : new List<string>(OptionsRaw.Split('|'));
            set => OptionsRaw = string.Join("|", value);
        }
    }

    public class UserScore
    {
        public int Id { get; set; }
        public string Username { get; set; } = "Estudiante OIT1";
        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
