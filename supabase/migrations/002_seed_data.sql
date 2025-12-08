-- =====================================================
-- WhatTheHack Seed Data
-- Run this after the migration to populate initial data
-- =====================================================

-- =====================================================
-- MISSIONS
-- =====================================================

INSERT INTO missions (id, title, description, icon, color, order_index) VALUES
('web-security', 'Web Application Security', 'Master web penetration testing and vulnerability assessment', 'Shield', 'primary', 1),
('network-exploitation', 'Network Exploitation', 'Learn network scanning, enumeration, and exploitation techniques', 'Target', 'secondary', 2),
('cryptography', 'Cryptography & Encryption', 'Understand encryption algorithms and learn to break weak implementations', 'Globe', 'accent', 3),
('database-security', 'Database Security', 'SQL injection mastery and database security assessment', 'Database', 'success', 4);

-- =====================================================
-- CHALLENGES - Web Security
-- =====================================================

INSERT INTO challenges (id, mission_id, title, description, difficulty, xp_reward, time_estimate, category, order_index, prerequisites) VALUES
('sql-injection-1', 'web-security', 'SQL Injection Detective', 'Analyze vulnerable login forms and identify SQL injection payloads', 'Beginner', 250, '30 min', 'SQL Injection', 1, '[]'),
('xss-basic', 'web-security', 'Cross-Site Scripting Hunter', 'Find and exploit XSS vulnerabilities in web applications', 'Beginner', 200, '25 min', 'XSS', 2, '[]'),
('csrf-protection', 'web-security', 'CSRF Token Bypass', 'Learn to identify and exploit CSRF vulnerabilities', 'Intermediate', 300, '45 min', 'CSRF', 3, '["sql-injection-1", "xss-basic"]'),
('file-upload', 'web-security', 'Malicious File Upload', 'Exploit file upload vulnerabilities to gain system access', 'Intermediate', 350, '40 min', 'File Upload', 4, '["csrf-protection"]'),
('authentication-bypass', 'web-security', 'Authentication Bypass', 'Break authentication mechanisms using various techniques', 'Intermediate', 400, '50 min', 'Authentication', 5, '["file-upload"]'),
('directory-traversal', 'web-security', 'Directory Traversal Master', 'Access restricted files using path traversal techniques', 'Intermediate', 320, '35 min', 'Path Traversal', 6, '["authentication-bypass"]'),
('api-security', 'web-security', 'REST API Exploitation', 'Find and exploit vulnerabilities in REST APIs', 'Advanced', 500, '60 min', 'API Security', 7, '["directory-traversal"]'),
('jwt-attacks', 'web-security', 'JWT Token Manipulation', 'Learn to attack JSON Web Token implementations', 'Advanced', 450, '55 min', 'JWT', 8, '["api-security"]');

-- =====================================================
-- CHALLENGES - Network Exploitation
-- =====================================================

INSERT INTO challenges (id, mission_id, title, description, difficulty, xp_reward, time_estimate, category, order_index, prerequisites) VALUES
('port-scanning', 'network-exploitation', 'Port Scanning Detective', 'Master network reconnaissance and port scanning techniques', 'Beginner', 250, '40 min', 'Reconnaissance', 1, '[]'),
('network-sniffing', 'network-exploitation', 'Network Traffic Analysis', 'Analyze network packets and identify malicious traffic', 'Intermediate', 350, '45 min', 'Traffic Analysis', 2, '["port-scanning"]'),
('wifi-cracking', 'network-exploitation', 'WiFi Security Assessment', 'Learn wireless network security testing techniques', 'Advanced', 400, '60 min', 'Wireless Security', 3, '["network-sniffing"]'),
('arp-spoofing', 'network-exploitation', 'ARP Spoofing Attack', 'Perform man-in-the-middle attacks using ARP spoofing', 'Advanced', 450, '50 min', 'MITM', 4, '["wifi-cracking"]'),
('dns-hijacking', 'network-exploitation', 'DNS Hijacking Techniques', 'Redirect traffic through DNS manipulation', 'Advanced', 500, '55 min', 'DNS Security', 5, '["arp-spoofing"]');

-- =====================================================
-- CHALLENGES - Cryptography
-- =====================================================

INSERT INTO challenges (id, mission_id, title, description, difficulty, xp_reward, time_estimate, category, order_index, prerequisites) VALUES
('caesar-cipher', 'cryptography', 'Caesar Cipher Detective', 'Crack ancient encryption methods and decode secret messages', 'Beginner', 200, '30 min', 'Classical Ciphers', 1, '[]'),
('frequency-analysis', 'cryptography', 'Frequency Analysis Master', 'Break substitution ciphers using statistical analysis', 'Beginner', 250, '35 min', 'Classical Ciphers', 2, '["caesar-cipher"]'),
('hash-cracking', 'cryptography', 'Hash Function Analysis', 'Understand hash functions and identify vulnerabilities', 'Intermediate', 300, '45 min', 'Hash Functions', 3, '["frequency-analysis"]'),
('symmetric-crypto', 'cryptography', 'Symmetric Encryption Attacks', 'Attack weak implementations of AES and DES', 'Intermediate', 400, '60 min', 'Symmetric Crypto', 4, '["hash-cracking"]'),
('rsa-attacks', 'cryptography', 'RSA Cryptanalysis', 'Learn to exploit weak RSA implementations', 'Advanced', 500, '90 min', 'Public Key Crypto', 5, '["symmetric-crypto"]');

-- =====================================================
-- CHALLENGES - Database Security
-- =====================================================

INSERT INTO challenges (id, mission_id, title, description, difficulty, xp_reward, time_estimate, category, order_index, prerequisites) VALUES
('sql-basics', 'database-security', 'SQL Fundamentals', 'Learn SQL basics before diving into injection techniques', 'Beginner', 150, '20 min', 'SQL Basics', 1, '[]'),
('sql-injection-advanced', 'database-security', 'Advanced SQL Injection', 'Master blind SQL injection and time-based attacks', 'Intermediate', 400, '50 min', 'SQL Injection', 2, '["sql-basics"]'),
('nosql-injection', 'database-security', 'NoSQL Injection Techniques', 'Exploit NoSQL databases like MongoDB and CouchDB', 'Advanced', 450, '55 min', 'NoSQL Security', 3, '["sql-injection-advanced"]'),
('database-hardening', 'database-security', 'Database Security Hardening', 'Learn to secure databases against common attacks', 'Advanced', 350, '60 min', 'Security Hardening', 4, '["nosql-injection"]');

-- =====================================================
-- CHALLENGE QUESTIONS - SQL Injection Detective
-- =====================================================

INSERT INTO challenge_questions (challenge_id, question, type, code_snippet, correct_answer, hint, explanation, order_index) VALUES
('sql-injection-1', 'Identify the vulnerability in this PHP login code:', 'code-analysis', 
'$username = $_POST[''username''];
$password = $_POST[''password''];
$query = "SELECT * FROM users WHERE username=''$username'' AND password=''$password''";
$result = mysqli_query($connection, $query);',
'sql injection', 
'Look at how user input is directly inserted into the SQL query',
'Direct string concatenation without input validation allows SQL injection attacks.', 1),

('sql-injection-1', 'What payload would bypass this login check? (Username field)', 'payload-craft',
'Query: SELECT * FROM users WHERE username=''INPUT'' AND password=''test''',
'admin'' --',
'Use SQL comments to ignore the password requirement',
'The payload admin'' -- logs in as admin and comments out the password check.', 2),

('sql-injection-1', 'Which of these is the BEST defense against SQL injection?', 'multiple-choice',
NULL,
'1',
NULL,
'Prepared statements separate SQL logic from user data, preventing injection.', 3);

-- Update the options for the multiple choice question
UPDATE challenge_questions 
SET options = '["Input length validation", "Prepared statements with parameterized queries", "HTML entity encoding", "CAPTCHA verification"]'
WHERE challenge_id = 'sql-injection-1' AND type = 'multiple-choice';

-- =====================================================
-- CHALLENGE QUESTIONS - XSS Basic
-- =====================================================

INSERT INTO challenge_questions (challenge_id, question, type, code_snippet, correct_answer, hint, explanation, order_index) VALUES
('xss-basic', 'Find the XSS vulnerability in this PHP code:', 'vulnerability-spot',
'<?php
$search = $_GET[''q''];
echo "<h2>Search results for: " . $search . "</h2>";
?>',
'no sanitization',
'User input is directly displayed without any filtering or encoding',
'The search parameter is echoed directly without HTML encoding, allowing XSS.', 1),

('xss-basic', 'Craft an XSS payload to display an alert box:', 'payload-craft',
NULL,
'<script>alert(''XSS'')</script>',
'Use JavaScript within HTML script tags',
'This basic XSS payload executes JavaScript to show an alert dialog.', 2),

('xss-basic', 'Which function properly prevents XSS in this context?', 'defense-identify',
'Displaying user input in HTML: echo $userInput;',
'1',
NULL,
'htmlspecialchars() converts special characters to HTML entities, preventing XSS.', 3);

UPDATE challenge_questions 
SET options = '["strip_tags()", "htmlspecialchars()", "base64_encode()", "md5()"]'
WHERE challenge_id = 'xss-basic' AND type = 'defense-identify';

-- =====================================================
-- CHALLENGE QUESTIONS - CSRF Protection
-- =====================================================

INSERT INTO challenge_questions (challenge_id, question, type, code_snippet, correct_answer, hint, explanation, order_index) VALUES
('csrf-protection', 'What makes this form vulnerable to CSRF attacks?', 'vulnerability-analysis',
'<form action="/transfer" method="POST">
  <input name="amount" type="text" />
  <input name="to_account" type="text" />
  <input type="submit" value="Transfer Money" />
</form>',
'no csrf token',
'Look for missing security tokens that verify the request origin',
'The form lacks CSRF protection tokens, allowing cross-site request forgery.', 1),

('csrf-protection', 'How would an attacker exploit this CSRF vulnerability?', 'attack-vector',
NULL,
'1',
NULL,
'Attackers create malicious sites with hidden forms that submit to the vulnerable endpoint.', 2),

('csrf-protection', 'What is the most effective CSRF protection mechanism?', 'mitigation',
NULL,
'csrf token',
'A unique, unpredictable token that must be included with each request',
'CSRF tokens are unique per session and must be validated server-side.', 3);

UPDATE challenge_questions 
SET options = '["Direct database access", "Malicious website with hidden form", "Buffer overflow attack", "Password brute force"]'
WHERE challenge_id = 'csrf-protection' AND type = 'attack-vector';

-- =====================================================
-- ACHIEVEMENTS
-- =====================================================

INSERT INTO achievements (name, description, icon, category, rarity, xp_reward, points, requirement) VALUES
('First Blood', 'Complete your first hacking challenge', '🎯', 'Milestone', 'Common', 50, 50, '{"type": "challenges_completed", "count": 1}'),
('SQL Injection Master', 'Successfully complete 5 SQL injection challenges', '💉', 'Web Security', 'Rare', 250, 250, '{"type": "category_completed", "category": "SQL Injection", "count": 5}'),
('Ghost in the Machine', 'Complete a challenge on your first attempt', '👻', 'Stealth', 'Epic', 500, 500, '{"type": "special", "condition": "first_attempt"}'),
('Code Breaker', 'Successfully complete 5 cryptography challenges', '🔓', 'Cryptography', 'Rare', 300, 300, '{"type": "mission_progress", "mission": "cryptography", "count": 5}'),
('Network Ninja', 'Complete all network security challenges', '🥷', 'Network', 'Legendary', 1000, 1000, '{"type": "mission_completed", "mission": "network-exploitation"}'),
('Bug Hunter', 'Complete 25 challenges', '🐛', 'Discovery', 'Epic', 750, 750, '{"type": "challenges_completed", "count": 25}'),
('Streak Master', 'Maintain a 7-day learning streak', '🔥', 'Dedication', 'Common', 100, 100, '{"type": "streak", "days": 7}'),
('XSS Expert', 'Complete 5 XSS-related challenges', '⚡', 'Web Security', 'Rare', 300, 300, '{"type": "category_completed", "category": "XSS", "count": 5}'),
('Dedicated Learner', 'Complete challenges for 30 consecutive days', '📚', 'Dedication', 'Legendary', 1500, 1500, '{"type": "streak", "days": 30}'),
('Web Security Pro', 'Complete all web security challenges', '🛡️', 'Web Security', 'Legendary', 1000, 1000, '{"type": "mission_completed", "mission": "web-security"}'),
('Rising Star', 'Reach level 5', '⭐', 'Milestone', 'Common', 100, 100, '{"type": "level_reached", "level": 5}'),
('Veteran Hacker', 'Reach level 20', '🏆', 'Milestone', 'Epic', 500, 500, '{"type": "level_reached", "level": 20}'),
('Quick Learner', 'Complete 5 challenges in one day', '⚡', 'Speed', 'Rare', 200, 200, '{"type": "daily_challenges", "count": 5}'),
('Perfectionist', 'Complete 10 challenges without any wrong answers', '💯', 'Skill', 'Epic', 750, 750, '{"type": "perfect_challenges", "count": 10}'),
('Database Guardian', 'Complete all database security challenges', '🗄️', 'Database', 'Legendary', 1000, 1000, '{"type": "mission_completed", "mission": "database-security"}'),
('Crypto Master', 'Complete all cryptography challenges', '🔐', 'Cryptography', 'Legendary', 1000, 1000, '{"type": "mission_completed", "mission": "cryptography"}');

-- =====================================================
-- VERIFICATION QUERIES (Optional - run to verify data)
-- =====================================================

-- Count records in each table
-- SELECT 'missions' as table_name, COUNT(*) as count FROM missions
-- UNION ALL
-- SELECT 'challenges', COUNT(*) FROM challenges
-- UNION ALL
-- SELECT 'challenge_questions', COUNT(*) FROM challenge_questions
-- UNION ALL
-- SELECT 'achievements', COUNT(*) FROM achievements;

-- View challenges by mission
-- SELECT m.title as mission, COUNT(c.id) as challenge_count
-- FROM missions m
-- LEFT JOIN challenges c ON m.id = c.mission_id
-- GROUP BY m.title;
