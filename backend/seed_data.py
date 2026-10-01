import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'threat_core.settings')
django.setup()

from analyzer.models import ThreatReport, SimulationScenario

def seed_database():
    print("Seeding database with initial threat intelligence and simulation scenarios...")
    
    # Clear existing
    ThreatReport.objects.all().delete()
    SimulationScenario.objects.all().delete()

    # 1. Threat Reports
    reports_data = [
        {
            "title": "Urgent Bank Account Deactivation SMS",
            "threat_type": "SMS",
            "content_sample": "ALERT: Your HDFC Bank account access has been suspended due to pending KYC update. Click http://hdfc-kyc-verify-portal.xyz/update to reactivate within 12 hours.",
            "evidence_summary": "Punycode/Fake domain (.xyz) combined with high panic urgency (12 hour deadline) pretending to be a major financial institution.",
            "risk_score": 95,
            "severity": "CRITICAL",
            "reporter_name": "CyberSafety Watch",
            "upvotes": 42
        },
        {
            "title": "Unsolicited FedEx Package Delivery Fee Email",
            "threat_type": "EMAIL",
            "content_sample": "From: delivery-notice@gmail.com\nSubject: Package #FDX-9981 delivery failure notice\nYour shipment is held at central hub. Pay $2.99 custom clearance fee immediately to avoid return to sender: https://fedex-clearance-track.top/pay",
            "evidence_summary": "Sender address is a generic @gmail.com account rather than @fedex.com. Demands immediate credit card payment via a high-abuse .top domain.",
            "risk_score": 88,
            "severity": "HIGH",
            "reporter_name": "TechGuard India",
            "upvotes": 29
        },
        {
            "title": "Reverse QR Code Payment Request Scam",
            "threat_type": "PAYMENT",
            "content_sample": "Scammer sent QR code on WhatsApp saying: 'I am sending your $50 item payment. Scan this QR code and enter your UPI PIN to credit the money into your account.'",
            "evidence_summary": "Entering a PIN on any UPI or payment gateway (GPay, PhonePe, Paytm, Zelle) ALWAYS DEBITS money. You NEVER enter a PIN to receive funds.",
            "risk_score": 100,
            "severity": "CRITICAL",
            "reporter_name": "Financial Crime Cell",
            "upvotes": 118
        },
        {
            "title": "Fake Job Offer WhatsApp Message",
            "threat_type": "SOCIAL",
            "content_sample": "Part-time job opportunity! Earn $300-$800 daily by liking YouTube videos. No experience required. Daily payout via Telegram bot: http://t.me/CryptoTasksBot",
            "evidence_summary": "Classic advance fee task scam. Asks user to perform trivial online tasks then demands cash deposit to 'unlock VIP commission levels'.",
            "risk_score": 82,
            "severity": "HIGH",
            "reporter_name": "Antigravity Intel",
            "upvotes": 64
        }
    ]

    for item in reports_data:
        ThreatReport.objects.create(**item)

    # 2. Simulation Scenarios
    scenarios_data = [
        {
            "title": "The Suspicious Security Alert",
            "scenario_type": "Phishing Email",
            "difficulty": "Beginner",
            "sender": "no-reply-security@paypal-auth-verify.xyz",
            "content": "Dear Customer,\n\nWe noticed an unauthorized login attempt on your account from IP address 185.220.101.5. To protect your funds, we have temporarily locked your PayPal balance.\n\nPlease verify your full SSN, billing address, and password immediately at http://paypal.security-update-verify.xyz/login to restore access.\n\nThank you,\nPayPal Security Team",
            "red_flags": [
                {"id": 1, "text": "paypal-auth-verify.xyz", "explanation": "The email domain ends in .xyz instead of official paypal.com domain."},
                {"id": 2, "text": "temporarily locked your PayPal balance", "explanation": "Creates panic so you react emotionally before verifying."},
                {"id": 3, "text": "verify your full SSN, billing address, and password", "explanation": "Legitimate security teams never ask for your password or SSN via email."}
            ],
            "safe_explanation": "Notice the domain difference! Always check the text after the last dot in the web address.",
            "action_tips": ["Check sender email address", "Never click embedded links in security warnings", "Log in directly via paypal.com"]
        },
        {
            "title": "The Urgent SMS Electricity Cut-Off",
            "scenario_type": "Smishing SMS",
            "difficulty": "Intermediate",
            "sender": "+91-9876543210 (Unknown Mobile)",
            "content": "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM from power office because your previous month bill was not updated. Immediately call electricity officer at 98765-XXXXX.",
            "red_flags": [
                {"id": 1, "text": "+91-9876543210", "explanation": "Official utility boards use verified SMS headers (e.g., AD-MSEB), not personal 10-digit mobile numbers."},
                {"id": 2, "text": "disconnected tonight at 9:30 PM", "explanation": "Urgency pressure tactic to make you call the fraudster directly."},
                {"id": 3, "text": "call electricity officer at 98765-XXXXX", "explanation": "Directs you to a private line where scammers trick you into installing remote access apps (e.g. AnyDesk)."}
            ],
            "safe_explanation": "Power companies follow legal notice periods and send official paper/email statements, never sudden night-time WhatsApp/SMS cut-offs.",
            "action_tips": ["Check your official bill online", "Do not call personal mobile numbers in SMS", "Report number to cyber cell"]
        }
    ]

    for scenario in scenarios_data:
        SimulationScenario.objects.create(**scenario)

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed_database()
