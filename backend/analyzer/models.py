from django.db import models

class ThreatReport(models.Model):
    THREAT_TYPES = [
        ('EMAIL', 'Phishing Email'),
        ('SMS', 'Smishing SMS'),
        ('URL', 'Suspicious Web Link'),
        ('PAYMENT', 'Payment Request / Scam'),
        ('SOCIAL', 'Social Media / Impersonation'),
    ]

    SEVERITY_CHOICES = [
        ('SAFE', 'Safe / Low Risk'),
        ('CAUTION', 'Caution / Suspicious'),
        ('HIGH', 'High Risk'),
        ('CRITICAL', 'Critical Malicious Threat'),
    ]

    title = models.CharField(max_length=200)
    threat_type = models.CharField(max_length=20, choices=THREAT_TYPES, default='EMAIL')
    content_sample = models.TextField()
    evidence_summary = models.TextField()
    risk_score = models.IntegerField(default=0)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='CAUTION')
    reporter_name = models.CharField(max_length=100, default='Anonymous User')
    upvotes = models.IntegerField(default=1)
    is_verified = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.severity})"

class SimulationScenario(models.Model):
    title = models.CharField(max_length=200)
    scenario_type = models.CharField(max_length=50) # e.g. "Fake Bank Alert", "Crypto Giveaway", "Urgent Password Reset"
    difficulty = models.CharField(max_length=20, default='Intermediate') # Beginner, Intermediate, Advanced
    sender = models.CharField(max_length=150)
    content = models.TextField()
    red_flags = models.JSONField(help_text="List of red flag objects with position/id, text, and explanation")
    safe_explanation = models.TextField()
    action_tips = models.JSONField(default=list)

    def __str__(self):
        return self.title
