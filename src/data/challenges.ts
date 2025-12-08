import { Shield, Target, Database, Globe, type LucideIcon } from 'lucide-react'

export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type ChallengeSummary = {
  id: string
  title: string
  description: string
  difficulty: ChallengeDifficulty
  xpReward: number
  timeEstimate: string
  isCompleted: boolean
  isUnlocked: boolean
  category: string
}

export type MissionPath = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  color: 'primary' | 'secondary' | 'accent' | 'success'
  totalChallenges: number
  completedChallenges: number
  challenges: ChallengeSummary[]
}

export type QuestionType =
  | 'code-analysis'
  | 'payload-craft'
  | 'multiple-choice'
  | 'vulnerability-spot'
  | 'vulnerability-analysis'
  | 'defense-identify'
  | 'attack-vector'
  | 'mitigation'
  | 'logic-flaw'
  | 'session-analysis'
  | 'bypass-technique'
  | 'secure-implementation'

export type ChallengeQuestion = {
  type: QuestionType
  question: string
  code?: string
  context?: string
  options?: string[]
  answer: string | number
  hint?: string
  explanation?: string
}

export type ChallengeConfig = {
  id: string
  title: string
  description: string
  xpReward: number
  difficulty: ChallengeDifficulty
  category: string
  questions: ChallengeQuestion[]
}

export const missionPaths: Record<string, MissionPath> = {
  'web-security': {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Master web penetration testing and vulnerability assessment',
    icon: Shield,
    color: 'primary',
    totalChallenges: 12,
    completedChallenges: 4,
    challenges: [
      {
        id: 'sql-injection-1',
        title: 'SQL Injection Detective',
        description: 'Analyze vulnerable login forms and identify SQL injection payloads',
        difficulty: 'Beginner',
        xpReward: 250,
        timeEstimate: '30 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'SQL Injection',
      },
      {
        id: 'xss-basic',
        title: 'Cross-Site Scripting Hunter',
        description: 'Find and exploit XSS vulnerabilities in web applications',
        difficulty: 'Beginner',
        xpReward: 200,
        timeEstimate: '25 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'XSS',
      },
      {
        id: 'csrf-protection',
        title: 'CSRF Token Bypass',
        description: 'Learn to identify and exploit CSRF vulnerabilities',
        difficulty: 'Intermediate',
        xpReward: 300,
        timeEstimate: '45 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'CSRF',
      },
      {
        id: 'file-upload',
        title: 'Malicious File Upload',
        description: 'Exploit file upload vulnerabilities to gain system access',
        difficulty: 'Intermediate',
        xpReward: 350,
        timeEstimate: '40 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'File Upload',
      },
      {
        id: 'authentication-bypass',
        title: 'Authentication Bypass',
        description: 'Break authentication mechanisms using various techniques',
        difficulty: 'Intermediate',
        xpReward: 400,
        timeEstimate: '50 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Authentication',
      },
      {
        id: 'directory-traversal',
        title: 'Directory Traversal Master',
        description: 'Access restricted files using path traversal techniques',
        difficulty: 'Intermediate',
        xpReward: 320,
        timeEstimate: '35 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Path Traversal',
      },
      {
        id: 'api-security',
        title: 'REST API Exploitation',
        description: 'Find and exploit vulnerabilities in REST APIs',
        difficulty: 'Advanced',
        xpReward: 500,
        timeEstimate: '60 min',
        isCompleted: false,
        isUnlocked: false,
        category: 'API Security',
      },
      {
        id: 'jwt-attacks',
        title: 'JWT Token Manipulation',
        description: 'Learn to attack JSON Web Token implementations',
        difficulty: 'Advanced',
        xpReward: 450,
        timeEstimate: '55 min',
        isCompleted: false,
        isUnlocked: false,
        category: 'JWT',
      },
    ],
  },
  'network-exploitation': {
    id: 'network-exploitation',
    title: 'Network Exploitation',
    description: 'Learn network scanning, enumeration, and exploitation techniques',
    icon: Target,
    color: 'secondary',
    totalChallenges: 15,
    completedChallenges: 9,
    challenges: [
      {
        id: 'port-scanning',
        title: 'Port Scanning Detective',
        description: 'Master network reconnaissance and port scanning techniques',
        difficulty: 'Intermediate',
        xpReward: 300,
        timeEstimate: '40 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'Reconnaissance',
      },
      {
        id: 'network-sniffing',
        title: 'Network Traffic Analysis',
        description: 'Analyze network packets and identify malicious traffic',
        difficulty: 'Advanced',
        xpReward: 350,
        timeEstimate: '45 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Traffic Analysis',
      },
      {
        id: 'wifi-cracking',
        title: 'WiFi Security Assessment',
        description: 'Learn wireless network security testing techniques',
        difficulty: 'Advanced',
        xpReward: 400,
        timeEstimate: '60 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Wireless Security',
      },
    ],
  },
  cryptography: {
    id: 'cryptography',
    title: 'Cryptography & Encryption',
    description: 'Understand encryption algorithms and learn to break weak implementations',
    icon: Globe,
    color: 'accent',
    totalChallenges: 18,
    completedChallenges: 3,
    challenges: [
      {
        id: 'caesar-cipher',
        title: 'Caesar Cipher Detective',
        description: 'Crack ancient encryption methods and decode secret messages',
        difficulty: 'Beginner',
        xpReward: 200,
        timeEstimate: '30 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'Classical Ciphers',
      },
      {
        id: 'hash-cracking',
        title: 'Hash Function Analysis',
        description: 'Understand hash functions and identify vulnerabilities',
        difficulty: 'Intermediate',
        xpReward: 300,
        timeEstimate: '45 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Hash Functions',
      },
      {
        id: 'rsa-attacks',
        title: 'RSA Cryptanalysis',
        description: 'Learn to exploit weak RSA implementations',
        difficulty: 'Advanced',
        xpReward: 500,
        timeEstimate: '90 min',
        isCompleted: false,
        isUnlocked: false,
        category: 'Public Key Crypto',
      },
    ],
  },
  'database-security': {
    id: 'database-security',
    title: 'Database Security',
    description: 'SQL injection mastery and database security assessment',
    icon: Database,
    color: 'success',
    totalChallenges: 10,
    completedChallenges: 8,
    challenges: [
      {
        id: 'sql-injection',
        title: 'SQL Injection Hunter',
        description: 'Master advanced SQL injection techniques and bypasses',
        difficulty: 'Intermediate',
        xpReward: 400,
        timeEstimate: '50 min',
        isCompleted: true,
        isUnlocked: true,
        category: 'SQL Injection',
      },
      {
        id: 'database-hardening',
        title: 'Database Security Hardening',
        description: 'Learn to secure databases against common attacks',
        difficulty: 'Advanced',
        xpReward: 350,
        timeEstimate: '60 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'Security Hardening',
      },
      {
        id: 'nosql-injection',
        title: 'NoSQL Injection Techniques',
        description: 'Exploit NoSQL databases like MongoDB and CouchDB',
        difficulty: 'Advanced',
        xpReward: 450,
        timeEstimate: '55 min',
        isCompleted: false,
        isUnlocked: true,
        category: 'NoSQL Security',
      },
    ],
  },
}

export const challengeDetails: Record<string, ChallengeConfig> = {
  'web-security/sql-injection-1': {
    id: 'sql-injection-1',
    title: 'SQL Injection Detective',
    description: 'Analyze vulnerable login forms and identify SQL injection payloads',
    xpReward: 250,
    difficulty: 'Beginner',
    category: 'Web Security',
    questions: [
      {
        type: 'code-analysis',
        question: 'Identify the vulnerability in this PHP login code:',
        code: `$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($connection, $query);`,
        answer: 'sql injection',
        hint: 'Look at how user input is directly inserted into the SQL query',
        explanation:
          'Direct string concatenation without input validation allows SQL injection attacks.',
      },
      {
        type: 'payload-craft',
        question: 'What payload would bypass this login check? (Username field)',
        context: "Query: SELECT * FROM users WHERE username='INPUT' AND password='test'",
        answer: "admin' --",
        hint: 'Use SQL comments to ignore the password requirement',
        explanation:
          "The payload 'admin' --' logs in as admin and comments out the password check.",
      },
      {
        type: 'multiple-choice',
        question: 'Which of these is the BEST defense against SQL injection?',
        options: [
          'Input length validation',
          'Prepared statements with parameterized queries',
          'HTML entity encoding',
          'CAPTCHA verification',
        ],
        answer: 1,
        explanation: 'Prepared statements separate SQL logic from user data, preventing injection.',
      },
    ],
  },
  'web-security/xss-basic': {
    id: 'xss-basic',
    title: 'Cross-Site Scripting Hunter',
    description: 'Find and exploit XSS vulnerabilities in web applications',
    xpReward: 200,
    difficulty: 'Beginner',
    category: 'Web Security',
    questions: [
      {
        type: 'vulnerability-spot',
        question: 'Find the XSS vulnerability in this PHP code:',
        code: `<?php
$search = $_GET['q'];
echo "<h2>Search results for: " . $search . "</h2>";
?>`,
        answer: 'no sanitization',
        hint: 'User input is directly displayed without any filtering or encoding',
        explanation: 'The search parameter is echoed directly without HTML encoding, allowing XSS.',
      },
      {
        type: 'payload-craft',
        question: 'Craft an XSS payload to display an alert box:',
        answer: "<script>alert('XSS')</script>",
        hint: 'Use JavaScript within HTML script tags',
        explanation: 'This basic XSS payload executes JavaScript to show an alert dialog.',
      },
      {
        type: 'defense-identify',
        question: 'Which function properly prevents XSS in this context?',
        context: 'Displaying user input in HTML: echo $userInput;',
        options: ['strip_tags()', 'htmlspecialchars()', 'base64_encode()', 'md5()'],
        answer: 1,
        explanation:
          'htmlspecialchars() converts special characters to HTML entities, preventing XSS.',
      },
    ],
  },
  'web-security/csrf-protection': {
    id: 'csrf-protection',
    title: 'CSRF Token Bypass',
    description: 'Learn to identify and exploit CSRF vulnerabilities',
    xpReward: 300,
    difficulty: 'Intermediate',
    category: 'Web Security',
    questions: [
      {
        type: 'vulnerability-analysis',
        question: 'What makes this form vulnerable to CSRF attacks?',
        code: `<form action="/transfer" method="POST">
  <input name="amount" type="text" />
  <input name="to_account" type="text" />
  <input type="submit" value="Transfer Money" />
</form>`,
        answer: 'no csrf token',
        hint: 'Look for missing security tokens that verify the request origin',
        explanation: 'The form lacks CSRF protection tokens, allowing cross-site request forgery.',
      },
      {
        type: 'attack-vector',
        question: 'How would an attacker exploit this CSRF vulnerability?',
        options: [
          'Direct database access',
          'Malicious website with hidden form',
          'Buffer overflow attack',
          'Password brute force',
        ],
        answer: 1,
        explanation:
          'Attackers create malicious sites with hidden forms that submit to the vulnerable endpoint.',
      },
      {
        type: 'mitigation',
        question: "What's the most effective CSRF protection mechanism?",
        answer: 'csrf token',
        hint: 'A unique, unpredictable token that must be included with each request',
        explanation: 'CSRF tokens are unique per session and must be validated server-side.',
      },
    ],
  },
  'web-security/file-upload': {
    id: 'file-upload',
    title: 'Malicious File Upload',
    description: 'Exploit file upload vulnerabilities to gain system access',
    xpReward: 350,
    difficulty: 'Intermediate',
    category: 'Web Security',
    questions: [
      {
        type: 'vulnerability-spot',
        question: "What's wrong with this file upload validation?",
        code: `if (strpos($_FILES['upload']['name'], '.php') === false) {
    move_uploaded_file($_FILES['upload']['tmp_name'], '/uploads/' . $_FILES['upload']['name']);
    echo "File uploaded successfully";
}`,
        answer: 'insufficient validation',
        hint: "The validation only checks for '.php' but not other dangerous extensions",
        explanation: 'The check can be bypassed with extensions like .php5, .phtml, or .phps.',
      },
      {
        type: 'bypass-technique',
        question: 'How could you bypass this PHP file extension filter?',
        context: 'Filter blocks: .php, .php3, .php4, .php5',
        answer: '.phtml',
        hint: 'Look for alternative PHP file extensions that execute server-side code',
        explanation: '.phtml files are also executed as PHP by most web servers.',
      },
      {
        type: 'secure-implementation',
        question: 'Which is the BEST approach for secure file uploads?',
        options: [
          'Check file extension only',
          'Whitelist allowed MIME types + extension + content validation',
          'Rename files with random names',
          'Store files in web root directory',
        ],
        answer: 1,
        explanation: 'Multi-layered validation with whitelisting provides the strongest security.',
      },
    ],
  },
  'web-security/authentication-bypass': {
    id: 'authentication-bypass',
    title: 'Authentication Bypass',
    description: 'Break authentication mechanisms using various techniques',
    xpReward: 400,
    difficulty: 'Intermediate',
    category: 'Web Security',
    questions: [
      {
        type: 'code-analysis',
        question: 'What vulnerability exists in this authentication check?',
        code: `<?php
if ($_POST['username'] == 'admin' && $_POST['password'] == 'secret123') {
    $_SESSION['logged_in'] = true;
    $_SESSION['is_admin'] = $_POST['is_admin'];
}
?>`,
        answer: 'parameter manipulation',
        hint: 'Look at what happens with the is_admin parameter from user input',
        explanation: 'The code accepts is_admin from POST data, allowing users to escalate privileges by adding is_admin=1 to their request.',
      },
      {
        type: 'attack-vector',
        question: 'How would you bypass this authentication using the vulnerability?',
        context: 'Login form with username, password, and hidden is_admin field set to 0',
        options: [
          'SQL injection in username field',
          'Modify is_admin parameter to 1 in the request',
          'Brute force the password',
          'XSS in the login form',
        ],
        answer: 1,
        explanation: 'By intercepting and modifying the request to set is_admin=1, you can gain admin privileges.',
      },
      {
        type: 'bypass-technique',
        question: 'What authentication bypass technique uses timing differences?',
        answer: 'timing attack',
        hint: 'This attack exploits response time variations to gather information',
        explanation: 'Timing attacks analyze how long authentication takes to determine if username exists or password is partially correct.',
      },
      {
        type: 'secure-implementation',
        question: 'How should privilege levels be properly set?',
        options: [
          'Accept from user POST data',
          'Store in cookies',
          'Determine server-side based on database role',
          'Use hidden form fields',
        ],
        answer: 2,
        explanation: 'Privilege levels should always be determined server-side from a trusted database, never from user input.',
      },
    ],
  },
  'web-security/directory-traversal': {
    id: 'directory-traversal',
    title: 'Directory Traversal Master',
    description: 'Access restricted files using path traversal techniques',
    xpReward: 320,
    difficulty: 'Intermediate',
    category: 'Web Security',
    questions: [
      {
        type: 'vulnerability-spot',
        question: 'Identify the path traversal vulnerability:',
        code: `<?php
$file = $_GET['file'];
$content = file_get_contents("uploads/" . $file);
echo $content;
?>`,
        answer: 'no path validation',
        hint: 'User input is directly used in file path without sanitization',
        explanation: 'The code accepts any filename, allowing attackers to use ../ to access files outside uploads directory.',
      },
      {
        type: 'payload-craft',
        question: 'What payload would access /etc/passwd on a Linux system?',
        context: "File parameter in URL: ?file=PAYLOAD",
        answer: '../../../etc/passwd',
        hint: 'Use ../ to navigate up directories',
        explanation: 'Multiple ../ sequences traverse up the directory tree to reach the root and access system files.',
      },
      {
        type: 'bypass-technique',
        question: 'How would you bypass this filter?',
        code: `if (strpos($file, '../') !== false) {
    die('Access denied');
}`,
        answer: '..\\',
        hint: 'Try using backslash instead of forward slash',
        explanation: 'Using backslash (..\\) on Windows systems or URL encoding (%2e%2e%2f) can bypass simple filters.',
      },
      {
        type: 'mitigation',
        question: 'Best practice to prevent path traversal?',
        options: [
          'Block ../ in input',
          'Use whitelist of allowed filenames',
          'Encode the file parameter',
          'Use longer file paths',
        ],
        answer: 1,
        explanation: 'Whitelist approach with predefined allowed files is the most secure defense against path traversal.',
      },
    ],
  },
  'web-security/api-security': {
    id: 'api-security',
    title: 'REST API Security',
    description: 'Secure RESTful APIs against common vulnerabilities',
    xpReward: 400,
    difficulty: 'Advanced',
    category: 'Web Application Security',
    questions: [
      {
        type: 'vulnerability-analysis',
        question: 'What vulnerability exists in this API endpoint?',
        code: 'GET /api/users?id=123',
        answer: 'insecure direct object reference',
        hint: 'Users can access any user ID',
        explanation: 'IDOR allows attackers to access other users\' data by changing the ID parameter without authorization checks.',
      },
      {
        type: 'multiple-choice',
        question: 'Which HTTP method should be idempotent?',
        options: [
          'POST',
          'PUT',
          'PATCH',
          'DELETE (all except POST)',
        ],
        answer: 3,
        explanation: 'GET, PUT, DELETE should be idempotent (same result when called multiple times). POST creates new resources.',
      },
      {
        type: 'secure-implementation',
        question: 'How to secure API endpoints?',
        answer: 'authentication and authorization',
        hint: 'Verify who the user is and what they can access',
        explanation: 'Implement proper authentication (who you are) and authorization (what you can do) on all endpoints.',
      },
      {
        type: 'mitigation',
        question: 'Best practice for API rate limiting?',
        options: [
          'No limits needed',
          'Block after 1 request',
          'Implement throttling per user/IP',
          'Only limit POST requests',
        ],
        answer: 2,
        explanation: 'Rate limiting per user/IP prevents abuse, DDoS, and brute force attacks while allowing legitimate use.',
      },
    ],
  },
  'web-security/jwt-attacks': {
    id: 'jwt-attacks',
    title: 'JWT Token Vulnerabilities',
    description: 'Exploit and secure JSON Web Tokens',
    xpReward: 450,
    difficulty: 'Advanced',
    category: 'Web Application Security',
    questions: [
      {
        type: 'code-analysis',
        question: 'What vulnerability exists in this JWT verification?',
        code: `const decoded = jwt.decode(token);
if (decoded.role === 'admin') {
  // grant access
}`,
        answer: 'no signature verification',
        hint: 'decode() does not verify, verify() does',
        explanation: 'jwt.decode() only decodes without verifying the signature. Attackers can forge tokens.',
      },
      {
        type: 'attack-vector',
        question: 'What is the "none" algorithm attack?',
        answer: 'bypass signature verification',
        hint: 'Setting alg to "none" in JWT header',
        explanation: 'Changing algorithm to "none" can bypass signature checks if server accepts unsigned tokens.',
      },
      {
        type: 'vulnerability-spot',
        question: 'Why is storing JWTs in localStorage risky?',
        answer: 'xss vulnerability',
        hint: 'JavaScript can access localStorage',
        explanation: 'XSS attacks can steal tokens from localStorage. HttpOnly cookies are more secure.',
      },
      {
        type: 'mitigation',
        question: 'How to securely implement JWT?',
        options: [
          'Use decode() instead of verify()',
          'Store in localStorage',
          'Verify signature, use HTTPS, short expiration',
          'Allow "none" algorithm',
        ],
        answer: 2,
        explanation: 'Always verify signatures, use HTTPS, set short expiration times, and reject "none" algorithm.',
      },
    ],
  },
  'network-exploitation/port-scanning': {
    id: 'port-scanning',
    title: 'Port Scanning Detective',
    description: 'Master network reconnaissance and port scanning techniques',
    xpReward: 300,
    difficulty: 'Intermediate',
    category: 'Network Exploitation',
    questions: [
      {
        type: 'code-analysis',
        question: 'What does this nmap command do?',
        code: 'nmap -sS -p 1-65535 -T4 192.168.1.1',
        answer: 'stealth scan all ports',
        hint: '-sS means SYN/stealth scan, -p 1-65535 scans all ports',
        explanation: 'This performs a TCP SYN (stealth) scan on all 65,535 ports of the target with aggressive timing.',
      },
      {
        type: 'multiple-choice',
        question: 'Which scan type is most stealthy and avoids detection?',
        options: [
          'TCP Connect scan (-sT)',
          'SYN scan (-sS)',
          'UDP scan (-sU)',
          'Ping scan (-sn)',
        ],
        answer: 1,
        explanation: 'SYN scan never completes the TCP handshake, making it harder to detect in logs.',
      },
      {
        type: 'vulnerability-analysis',
        question: 'What security risk do open ports present?',
        answer: 'attack surface',
        hint: 'Think about entry points for attackers',
        explanation: 'Each open port is a potential entry point. Unnecessary open ports increase the attack surface.',
      },
      {
        type: 'mitigation',
        question: 'Best practice for port security?',
        options: [
          'Open all ports for flexibility',
          'Close all ports completely',
          'Only open necessary ports with firewall rules',
          'Change port numbers frequently',
        ],
        answer: 2,
        explanation: 'Only open required ports and use firewalls to restrict access to authorized sources.',
      },
    ],
  },
  'network-exploitation/network-sniffing': {
    id: 'network-sniffing',
    title: 'Network Traffic Analysis',
    description: 'Analyze network packets and identify malicious traffic',
    xpReward: 350,
    difficulty: 'Advanced',
    category: 'Network Exploitation',
    questions: [
      {
        type: 'code-analysis',
        question: 'What does this Wireshark filter capture?',
        code: 'tcp.port == 80 && http.request.method == "POST"',
        answer: 'http post requests',
        hint: 'Look at the protocol and method being filtered',
        explanation: 'This captures HTTP POST requests on port 80, often containing form submissions or API calls.',
      },
      {
        type: 'vulnerability-spot',
        question: 'What security issue exists with unencrypted HTTP traffic?',
        answer: 'plaintext transmission',
        hint: 'Think about data visibility',
        explanation: 'HTTP traffic is sent in plaintext, allowing anyone sniffing the network to read sensitive data.',
      },
      {
        type: 'attack-vector',
        question: 'Which attack intercepts network traffic between two parties?',
        options: [
          'SQL Injection',
          'Man-in-the-Middle (MITM)',
          'Cross-Site Scripting',
          'Buffer Overflow',
        ],
        answer: 1,
        explanation: 'MITM attacks position the attacker between two communicating parties to intercept or modify traffic.',
      },
      {
        type: 'secure-implementation',
        question: 'How to protect against network sniffing?',
        answer: 'encryption',
        hint: 'Make data unreadable to eavesdroppers',
        explanation: 'Use encryption protocols like HTTPS, TLS, or VPNs to protect data in transit from sniffing attacks.',
      },
    ],
  },
  'network-exploitation/wifi-cracking': {
    id: 'wifi-cracking',
    title: 'WiFi Security Assessment',
    description: 'Analyze wireless network security protocols',
    xpReward: 400,
    difficulty: 'Advanced',
    category: 'Network Exploitation',
    questions: [
      {
        type: 'vulnerability-analysis',
        question: 'Why is WEP encryption considered broken?',
        answer: 'weak initialization vector',
        hint: 'IV reuse and small keyspace',
        explanation: 'WEP uses weak 24-bit IV that repeats frequently, allowing attackers to crack keys in minutes.',
      },
      {
        type: 'multiple-choice',
        question: 'Which WiFi security protocol is most secure?',
        options: [
          'WEP',
          'WPA',
          'WPA2',
          'WPA3',
        ],
        answer: 3,
        explanation: 'WPA3 is the latest and most secure, using SAE (Simultaneous Authentication of Equals).',
      },
      {
        type: 'attack-vector',
        question: 'What attack captures WPA handshake for offline cracking?',
        answer: 'deauthentication attack',
        hint: 'Force clients to reconnect',
        explanation: 'Sending deauth frames forces clients to reconnect, allowing capture of the 4-way handshake.',
      },
      {
        type: 'mitigation',
        question: 'Best practice for WiFi security?',
        options: [
          'Hide SSID only',
          'Use MAC filtering only',
          'WPA3 with strong passphrase',
          'WEP with long password',
        ],
        answer: 2,
        explanation: 'WPA3 with a strong, complex passphrase provides the best security. SSID hiding and MAC filtering are easily bypassed.',
      },
    ],
  },
  'cryptography/caesar-cipher': {
    id: 'caesar-cipher',
    title: 'Caesar Cipher Detective',
    description: 'Crack ancient encryption methods and decode secret messages',
    xpReward: 200,
    difficulty: 'Beginner',
    category: 'Cryptography',
    questions: [
      {
        type: 'code-analysis',
        question: 'Decrypt this Caesar cipher with shift 3: KHOOR',
        answer: 'hello',
        hint: 'Shift each letter back by 3 positions in the alphabet',
        explanation: 'Caesar cipher shifts letters by a fixed number. Shifting KHOOR back by 3 gives HELLO.',
      },
      {
        type: 'vulnerability-analysis',
        question: 'Why is Caesar cipher insecure?',
        answer: 'only 25 possible keys',
        hint: 'How many different shift values exist?',
        explanation: 'With only 25 possible shifts, Caesar cipher can be easily broken by trying all combinations (brute force).',
      },
      {
        type: 'attack-vector',
        question: 'What attack method works best against Caesar cipher?',
        options: [
          'SQL Injection',
          'Brute Force',
          'Man-in-the-Middle',
          'Buffer Overflow',
        ],
        answer: 1,
        explanation: 'Brute force is effective because there are only 25 possible keys to try.',
      },
      {
        type: 'multiple-choice',
        question: 'What makes modern encryption stronger than Caesar cipher?',
        options: [
          'Longer passwords',
          'Large keyspace and complex algorithms',
          'Faster encryption',
          'Smaller file sizes',
        ],
        answer: 1,
        explanation: 'Modern encryption uses huge keyspaces (billions of combinations) and complex mathematical algorithms.',
      },
    ],
  },
  'cryptography/hash-cracking': {
    id: 'hash-cracking',
    title: 'Hash Function Analysis',
    description: 'Understand hash functions and identify vulnerabilities',
    xpReward: 300,
    difficulty: 'Intermediate',
    category: 'Cryptography',
    questions: [
      {
        type: 'code-analysis',
        question: 'What weakness exists in MD5 hashing?',
        answer: 'collision vulnerability',
        hint: 'Think about two different inputs producing the same output',
        explanation: 'MD5 is vulnerable to collision attacks where different inputs can produce the same hash value.',
      },
      {
        type: 'multiple-choice',
        question: 'Which hashing algorithm is currently recommended?',
        options: [
          'MD5',
          'SHA-1',
          'SHA-256',
          'ROT13',
        ],
        answer: 2,
        explanation: 'SHA-256 is part of SHA-2 family and is currently recommended for cryptographic security.',
      },
      {
        type: 'attack-vector',
        question: 'What attack uses pre-computed hash tables?',
        answer: 'rainbow table',
        hint: 'Pre-computed hashes of common passwords',
        explanation: 'Rainbow tables store pre-computed hashes to quickly crack passwords without computing each hash.',
      },
      {
        type: 'mitigation',
        question: 'How to defend against rainbow table attacks?',
        options: [
          'Use longer passwords',
          'Add salt before hashing',
          'Hash multiple times',
          'Use encryption instead',
        ],
        answer: 1,
        explanation: 'Adding a unique random salt to each password before hashing makes rainbow tables ineffective.',
      },
    ],
  },
  'cryptography/rsa-attacks': {
    id: 'rsa-attacks',
    title: 'RSA Cryptanalysis',
    description: 'Break weak RSA implementations and understand asymmetric encryption',
    xpReward: 500,
    difficulty: 'Advanced',
    category: 'Cryptography',
    questions: [
      {
        type: 'vulnerability-analysis',
        question: 'What makes RSA with small key sizes vulnerable?',
        answer: 'factorization attacks',
        hint: 'Breaking security relies on factoring large primes',
        explanation: 'Small RSA keys (< 2048 bits) can be factored using modern computing, breaking the encryption.',
      },
      {
        type: 'multiple-choice',
        question: 'What is the minimum recommended RSA key size today?',
        options: [
          '512 bits',
          '1024 bits',
          '2048 bits',
          '4096 bits',
        ],
        answer: 2,
        explanation: '2048-bit RSA is the current minimum standard, though 4096-bit provides even stronger security.',
      },
      {
        type: 'attack-vector',
        question: 'What attack exploits RSA without proper padding?',
        answer: 'chosen plaintext attack',
        hint: 'Attacker can encrypt chosen messages',
        explanation: 'Without padding (like OAEP), attackers can exploit mathematical properties to break RSA encryption.',
      },
      {
        type: 'secure-implementation',
        question: 'How to implement RSA securely?',
        options: [
          'Use 512-bit keys for speed',
          'No padding needed',
          '2048+ bit keys with OAEP padding',
          'Reuse same keys everywhere',
        ],
        answer: 2,
        explanation: 'Use minimum 2048-bit keys with proper padding schemes like OAEP to prevent attacks.',
      },
    ],
  },
  'database-security/database-hardening': {
    id: 'database-hardening',
    title: 'Database Security Hardening',
    description: 'Learn to secure databases against common attacks',
    xpReward: 350,
    difficulty: 'Advanced',
    category: 'Database Security',
    questions: [
      {
        type: 'vulnerability-analysis',
        question: 'What risk exists with default database credentials?',
        answer: 'unauthorized access',
        hint: 'Attackers know default usernames and passwords',
        explanation: 'Default credentials are publicly known, allowing attackers easy access if not changed.',
      },
      {
        type: 'secure-implementation',
        question: 'What is the principle of least privilege?',
        answer: 'minimum required permissions',
        hint: 'Only grant what is absolutely necessary',
        explanation: 'Users and applications should only have the minimum permissions needed to perform their tasks.',
      },
      {
        type: 'multiple-choice',
        question: 'Which practice enhances database security?',
        options: [
          'Disable all logging',
          'Encrypt sensitive data at rest',
          'Allow all remote connections',
          'Use shared database accounts',
        ],
        answer: 1,
        explanation: 'Encrypting data at rest protects it even if storage media is compromised.',
      },
      {
        type: 'mitigation',
        question: 'How to protect against SQL injection in stored procedures?',
        answer: 'parameterized queries',
        hint: 'Separate SQL code from user data',
        explanation: 'Parameterized queries treat user input as data, not executable SQL code.',
      },
    ],
  },
  'database-security/nosql-injection': {
    id: 'nosql-injection',
    title: 'NoSQL Injection Techniques',
    description: 'Exploit NoSQL databases like MongoDB and CouchDB',
    xpReward: 450,
    difficulty: 'Advanced',
    category: 'Database Security',
    questions: [
      {
        type: 'code-analysis',
        question: 'Identify the NoSQL injection vulnerability:',
        code: `db.users.find({
  username: req.body.username,
  password: req.body.password
})`,
        answer: 'operator injection',
        hint: 'Attacker can inject MongoDB operators like $ne',
        explanation: 'Attackers can send {"$ne": null} to bypass authentication by using MongoDB query operators.',
      },
      {
        type: 'payload-craft',
        question: 'What payload bypasses this MongoDB authentication?',
        context: 'Login endpoint expecting username and password',
        answer: '{"$ne": null}',
        hint: 'Use MongoDB not-equal operator',
        explanation: 'Sending {"$ne": null} makes the query match any user where password is not null.',
      },
      {
        type: 'multiple-choice',
        question: 'How does NoSQL injection differ from SQL injection?',
        options: [
          'Uses JavaScript instead of SQL',
          'Exploits JSON operators instead of SQL syntax',
          'Only works on MongoDB',
          'Is easier to prevent',
        ],
        answer: 1,
        explanation: 'NoSQL injection exploits query operators in JSON/BSON rather than SQL syntax.',
      },
      {
        type: 'mitigation',
        question: 'Best defense against NoSQL injection?',
        options: [
          'Use ORM only',
          'Validate and sanitize all inputs',
          'Disable JavaScript',
          'Use SQL database instead',
        ],
        answer: 1,
        explanation: 'Strict input validation and sanitization prevents injection of malicious operators.',
      },
    ],
  },
}

export const getChallengeDetail = (category: string, id: string) => {
  const key = `${category}/${id}`
  if (challengeDetails[key]) {
    return challengeDetails[key]
  }

  const mission = missionPaths[category]
  const summary = mission?.challenges.find((challenge) => challenge.id === id)

  if (!mission || !summary) {
    return undefined
  }

  return {
    id,
    title: summary.title,
    description: summary.description,
    xpReward: summary.xpReward,
    difficulty: summary.difficulty,
    category: mission.title,
    questions: [
      {
        type: 'code-analysis',
        question: 'Challenge content coming soon.',
        context:
          "We're expanding the mission database. Check back shortly for the full interactive scenario.",
        answer: 'coming soon',
        explanation:
          'This mission is under construction. In the meantime, continue exploring other challenges to keep your streak alive!',
      },
    ],
  } satisfies ChallengeConfig
}
