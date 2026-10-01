import re
import urllib.parse

# Multilingual Dictionary for Threat Explanations & Actions
TRANSLATIONS = {
    'EN': {
        'critical_summary': 'CRITICAL THREAT: High probability of a malicious scam or phishing attempt! Multiple severe red flags detected.',
        'high_summary': 'HIGH RISK: Strong indicators of deceptive digital content designed to manipulate or trick you.',
        'caution_summary': 'CAUTION: Minor suspicious patterns found. Verify the source independently before proceeding.',
        'safe_summary': 'SAFE / LOW RISK: Content appears generally benign. No high-severity threat markers found.',
        'why_header': 'Why is this suspicious?',
        'actions': [
            "Do NOT click any unknown links or download attachments.",
            "Do NOT share your OTP, PIN, password, or banking credentials under any circumstances.",
            "Verify the message directly through the official website or mobile app of the organization.",
            "Block and report the sender on your messaging platform or phone.",
            "If money was lost, immediately report to your bank and local cyber crime portal (Dial 1930 in India)."
        ]
    },
    'HI': {
        'critical_summary': 'गंभीर खतरा (CRITICAL THREAT): यह एक धोखाधड़ी (Scam) या फ़िशिंग प्रयास होने की बहुत अधिक संभावना है!',
        'high_summary': 'उच्च जोखिम (HIGH RISK): आपको गुमराह करने या धोखा देने के मजबूत संकेत पाए गए हैं।',
        'caution_summary': 'सावधानी (CAUTION): कुछ संदिग्ध पैटर्न मिले हैं। आगे बढ़ने से पहले आधिकारिक स्रोत से पुष्टि करें।',
        'safe_summary': 'सुरक्षित / कम जोखिम: कोई गंभीर खतरा नहीं पाया गया।',
        'why_header': 'यह संदेश संदिग्ध क्यों है?',
        'actions': [
            "किसी भी अज्ञात लिंक पर क्लिक न करें और न ही कोई फाइल डाउनलोड करें।",
            "किसी भी परिस्थिति में अपना OTP, PIN, पासवर्ड या बैंक विवरण साझा न करें।",
            "संबंधित संस्था की आधिकारिक वेबसाइट या ऐप के माध्यम से ही पुष्टि करें।",
            "संदेश भेजने वाले नंबर/ईमेल को तुरंत ब्लॉक और रिपोर्ट करें।",
            "यदि वित्तीय धोखाधड़ी हुई है, तो तुरंत अपने बैंक और साइबर हेल्पलाइन (1930) पर रिपोर्ट करें।"
        ]
    },
    'HINGLISH': {
        'critical_summary': 'CRITICAL THREAT ALERT: Yeh ek dangerous scam ya phishing message hone ki 100% chance hai!',
        'high_summary': 'HIGH RISK: Aapko bewakoof banane aur paise/data churane ke strong signals mile hain.',
        'caution_summary': 'CAUTION REQUIRED: Thode suspicious signals mile hain. Direct official app se verify karein.',
        'safe_summary': 'SAFE / LOW RISK: Koi bada threat signal nahi mila. Normally proceed kar sakte hain.',
        'why_header': 'Yeh message suspicious kyun hai?',
        'actions': [
            "Pehli baat: Kisi bhi unknown link par click bilkul na karein.",
            "Kabhi bhi apna OTP, PIN, Password ya Bank details kisi ko na dein.",
            "Bank ya company ki official app/website khol kar direct check karein.",
            "Sender ko तुरंत Block aur Report karein.",
            "Agar galti se money transfer ho gaya, toh immediately 1930 cyber helpline par call karein."
        ]
    }
}

def analyze_digital_content(content_text, content_type='GENERAL', source_sender='', source_url='', lang='EN'):
    """
    Enhanced Multi-Factor Threat Engine with Explainable AI & Multilingual Support
    """
    lang_code = lang.upper() if lang and lang.upper() in TRANSLATIONS else 'EN'
    t_dict = TRANSLATIONS[lang_code]

    text = (content_text or '').strip()
    text_lower = text.lower()
    sender_lower = (source_sender or '').lower()
    url_lower = (source_url or '').lower()

    # Highlighted Spans for Explainable AI
    highlighted_spans = []

    # Sub-factor risk scores (0 to 100)
    urgency_risk = 0
    link_risk = 0
    sensitive_req_risk = 0
    sender_risk = 0

    evidence = []
    why_reasons = []

    # Extract URLs from content
    found_urls = re.findall(r'https?://[^\s<>"]+|www\.[^\s<>"]+', text)
    if source_url and source_url not in found_urls:
        found_urls.append(source_url)

    # --------------------------------------------------------------------------
    # 1. URGENCY & PRESSURE ANALYSIS
    # --------------------------------------------------------------------------
    urgency_keywords = [
        'immediately', 'urgent', '24 hours', 'within 12 hours', 'suspended', 
        'terminated', 'unauthorized access', 'lockout', 'action required', 
        'final notice', 'warrant', 'police', 'legal action', 'arrest', 'turant', 'abhi', 'cut off'
    ]
    matched_urgency = [kw for kw in urgency_keywords if kw in text_lower]
    if matched_urgency:
        urgency_risk = min(len(matched_urgency) * 30, 95)
        why_reasons.append("Creates artificial urgency & panic pressure tactics")
        evidence.append({
            'id': 'urgency_pressure',
            'category': 'Urgency & Pressure',
            'severity': 'HIGH',
            'title': 'Artificial Urgency Tactic',
            'matched_snippet': ', '.join(matched_urgency[:3]),
            'technical_detail': f"Detected high-entropy pressure keywords: {', '.join(matched_urgency)}",
            'plain_language_explanation': "Scammers use strict deadlines (e.g. 'account blocked in 12 hrs') so you panic and skip verifying with the real provider.",
            'icon': 'ClockAlert'
        })
        for kw in matched_urgency:
            start_pos = text_lower.find(kw)
            if start_pos != -1:
                highlighted_spans.append({
                    'snippet': text[start_pos:start_pos+len(kw)],
                    'reason': 'Artificial Urgency Trigger',
                    'color': '#f59e0b'
                })

    # --------------------------------------------------------------------------
    # 2. SENSITIVE REQUESTS (OTP, PIN, Password, UPI PIN, SSN)
    # --------------------------------------------------------------------------
    sensitive_triggers = [
        'otp', 'pin', 'password', 'ssn', 'cvv', 'card number', 'enter pin', 
        'share otp', 'verify password', 'credentials', 'bank details', 'upi pin'
    ]
    matched_sensitives = [kw for kw in sensitive_triggers if kw in text_lower]
    if matched_sensitives:
        sensitive_req_risk = 95
        why_reasons.append("Requests sensitive credentials (OTP / PIN / Password)")
        evidence.append({
            'id': 'credential_harvesting',
            'category': 'Sensitive Request',
            'severity': 'CRITICAL',
            'title': 'Sensitive OTP / PIN / Password Request',
            'matched_snippet': ', '.join(matched_sensitives),
            'technical_detail': "Direct solicitation of high-security authentication secrets (OTP/PIN/Password).",
            'plain_language_explanation': "REAL BANKS WILL NEVER ASK YOU TO SHARE OR ENTER YOUR OTP, PIN, OR PASSWORD IN A MESSAGE OR UNVERIFIED LINK!",
            'icon': 'KeyRound'
        })
        for kw in matched_sensitives:
            start_pos = text_lower.find(kw)
            if start_pos != -1:
                highlighted_spans.append({
                    'snippet': text[start_pos:start_pos+len(kw)],
                    'reason': 'Sensitive Data Solicitation',
                    'color': '#ef4444'
                })

    # Payment specific trap: Scan QR or enter PIN to receive money
    if any(k in text_lower for k in ['receive', 'claim refund', 'scan qr to get money', 'enter pin to receive']):
        sensitive_req_risk = 100
        why_reasons.append("Contains reverse UPI payment trap (Scan QR/Enter PIN to receive money)")
        evidence.append({
            'id': 'reverse_upi_trap',
            'category': 'Payment Fraud',
            'severity': 'CRITICAL',
            'title': 'Reverse UPI Payment / QR Code Trap',
            'matched_snippet': 'Enter PIN / Scan QR to receive money',
            'technical_detail': "Reverse UPI payment fraud pattern. UPI PIN always DEBITS funds from sender.",
            'plain_language_explanation': "GOLDEN RULE: Receiving money NEVER requires entering your PIN. Entering your PIN sends your money to the fraudster!",
            'icon': 'CreditCard'
        })

    # --------------------------------------------------------------------------
    # 3. SUSPICIOUS LINK & DOMAIN ANALYSIS
    # --------------------------------------------------------------------------
    suspicious_tlds = ['.xyz', '.top', '.club', '.work', '.info', '.click', '.buzz', '.monster', '.online', '.site']
    brand_keywords = ['paypal', 'amazon', 'apple', 'google', 'microsoft', 'hdfc', 'icici', 'sbi', 'paytm', 'fedex', 'usps', 'dhl']

    for url_str in found_urls:
        try:
            parsed = urllib.parse.urlparse(url_str if url_str.startswith(('http://', 'https://')) else f'http://{url_str}')
            domain = parsed.netloc.lower() or parsed.path.lower().split('/')[0]

            # Check HTTPS
            if not url_str.startswith('https://'):
                link_risk = max(link_risk, 40)
                why_reasons.append("Uses unencrypted HTTP connection (No SSL certificate)")
                evidence.append({
                    'id': 'unencrypted_http',
                    'category': 'Link Security',
                    'severity': 'MEDIUM',
                    'title': 'Unencrypted Connection (No HTTPS)',
                    'matched_snippet': url_str,
                    'technical_detail': "URL lacks TLS/SSL transport encryption.",
                    'plain_language_explanation': "The website does not use secure HTTPS encryption, allowing eavesdroppers to intercept data.",
                    'icon': 'Link'
                })

            # Check IP address as domain
            if re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', domain):
                link_risk = 95
                why_reasons.append("Link domain is a raw numerical IP address instead of a company domain")
                evidence.append({
                    'id': 'raw_ip_host',
                    'category': 'Suspicious Link',
                    'severity': 'CRITICAL',
                    'title': 'Raw IP Address Hostname',
                    'matched_snippet': domain,
                    'technical_detail': "Host targets raw IP address instead of registered domain.",
                    'plain_language_explanation': "Legitimate businesses use domain names (e.g. bank.com), never raw IP numbers.",
                    'icon': 'Globe'
                })

            # Check Suspicious TLD
            for tld in suspicious_tlds:
                if domain.endswith(tld):
                    link_risk = max(link_risk, 85)
                    why_reasons.append(f"Link domain uses high-abuse extension ({tld})")
                    evidence.append({
                        'id': f'tld_{tld}',
                        'category': 'Suspicious Link',
                        'severity': 'HIGH',
                        'title': f"High-Risk Top-Level Extension ({tld})",
                        'matched_snippet': domain,
                        'technical_detail': f"Domain ends in high-abuse TLD: {tld}",
                        'plain_language_explanation': f"Websites ending in '{tld}' are frequently bought cheaply for short-term scam campaigns.",
                        'icon': 'Globe'
                    })

            # Check Brand Spoofing / Typosquatting
            for brand in brand_keywords:
                if brand in domain:
                    parts = domain.split('.')
                    root_domain = '.'.join(parts[-2:]) if len(parts) >= 2 else domain
                    if brand not in root_domain or '-' in root_domain:
                        link_risk = 100
                        why_reasons.append(f"Link domain doesn't match official brand ('{brand}')")
                        evidence.append({
                            'id': f'spoof_{brand}',
                            'category': 'Suspicious Link',
                            'severity': 'CRITICAL',
                            'title': f"Deceptive Brand Spoofing ('{brand}')",
                            'matched_snippet': domain,
                            'technical_detail': f"Brand name '{brand}' embedded in spoofed domain: {domain}",
                            'plain_language_explanation': f"The link includes the word '{brand}', but the actual domain is '{root_domain}'. It is a fake website!",
                            'icon': 'ShieldAlert'
                        })
        except Exception:
            pass

    # --------------------------------------------------------------------------
    # 4. SENDER IDENTITY ANALYSIS
    # --------------------------------------------------------------------------
    if source_sender:
        free_providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
        if any(fp in sender_lower for fp in free_providers):
            if any(b in text_lower for b in ['bank', 'paypal', 'amazon', 'support', 'fedex', 'security']):
                sender_risk = 80
                why_reasons.append("Sender uses public free email (@gmail/@yahoo) while claiming official corporate identity")
                evidence.append({
                    'id': 'free_email_impersonation',
                    'category': 'Sender Reputation',
                    'severity': 'HIGH',
                    'title': 'Public Free Email Impersonation',
                    'matched_snippet': source_sender,
                    'technical_detail': f"Corporate identity claimed from public webmail address: {source_sender}",
                    'plain_language_explanation': f"Official notices come from corporate domain emails (e.g. support@company.com), never from free @gmail accounts.",
                    'icon': 'Mail'
                })

    # --------------------------------------------------------------------------
    # 5. RISK SCORE CALCULATION & LEVEL ASSIGNMENT
    # --------------------------------------------------------------------------
    # Compute overall score weighted
    overall_risk_score = int(
        (urgency_risk * 0.25) + 
        (link_risk * 0.35) + 
        (sensitive_req_risk * 0.30) + 
        (sender_risk * 0.10)
    )

    # Adjust if evidence count is high
    if len(evidence) >= 2 and overall_risk_score < 60:
        overall_risk_score = 75
    elif len(evidence) == 0:
        overall_risk_score = 10

    overall_risk_score = min(max(overall_risk_score, 5), 100)

    # Categorize levels (Low / Medium / High)
    if overall_risk_score >= 70:
        risk_level = 'HIGH'
        summary_text = t_dict['critical_summary']
    elif overall_risk_score >= 35:
        risk_level = 'MEDIUM'
        summary_text = t_dict['high_summary']
    else:
        risk_level = 'LOW'
        summary_text = t_dict['safe_summary']

    # Convert numeric sub-factor risk scores into readable labels
    def get_factor_label(val):
        if val >= 75: return {'level': 'Very High', 'score': val, 'color': '#ef4444'}
        if val >= 45: return {'level': 'High', 'score': val, 'color': '#f97316'}
        if val >= 20: return {'level': 'Medium', 'score': val, 'color': '#f59e0b'}
        return {'level': 'Low', 'score': max(val, 5), 'color': '#34d399'}

    sub_factors = {
        'urgency': get_factor_label(urgency_risk),
        'suspicious_link': get_factor_label(link_risk),
        'sensitive_request': get_factor_label(sensitive_req_risk),
        'sender': get_factor_label(sender_risk)
    }

    return {
        'risk_score': overall_risk_score,
        'risk_level': risk_level, # LOW, MEDIUM, HIGH
        'red_flag_count': len(evidence),
        'summary': summary_text,
        'why_reasons': list(set(why_reasons)) if why_reasons else ["No major suspicious indicators detected."],
        'evidence': evidence,
        'highlighted_spans': highlighted_spans,
        'sub_factors': sub_factors,
        'recommended_actions': t_dict['actions'],
        'language': lang_code
    }
