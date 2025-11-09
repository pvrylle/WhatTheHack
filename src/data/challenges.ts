import {
  Shield,
  Target,
  Database,
  Globe,
  type LucideIcon,
} from "lucide-react"

export type ChallengeDifficulty = "Beginner" | "Intermediate" | "Advanced"

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
  color: "primary" | "secondary" | "accent" | "success"
  totalChallenges: number
  completedChallenges: number
  challenges: ChallengeSummary[]
}

export type QuestionType =
  | "code-analysis"
  | "payload-craft"
  | "multiple-choice"
  | "vulnerability-spot"
  | "vulnerability-analysis"
  | "defense-identify"
  | "attack-vector"
  | "mitigation"
  | "logic-flaw"
  | "session-analysis"
  | "bypass-technique"
  | "secure-implementation"

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
  "web-security": {
    id: "web-security",
    title: "Web Application Security",
    description: "Master web penetration testing and vulnerability assessment",
    icon: Shield,
    color: "primary",
    totalChallenges: 12,
    completedChallenges: 4,
    challenges: [
      {
        id: "sql-injection-1",
        title: "SQL Injection Detective",
        description: "Analyze vulnerable login forms and identify SQL injection payloads",
        difficulty: "Beginner",
        xpReward: 250,
        timeEstimate: "30 min",
        isCompleted: true,
        isUnlocked: true,
        category: "SQL Injection",
      },
      {
        id: "xss-basic",
        title: "Cross-Site Scripting Hunter",
        description: "Find and exploit XSS vulnerabilities in web applications",
        difficulty: "Beginner",
        xpReward: 200,
        timeEstimate: "25 min",
        isCompleted: true,
        isUnlocked: true,
        category: "XSS",
      },
      {
        id: "csrf-protection",
        title: "CSRF Token Bypass",
        description: "Learn to identify and exploit CSRF vulnerabilities",
        difficulty: "Intermediate",
        xpReward: 300,
        timeEstimate: "45 min",
        isCompleted: true,
        isUnlocked: true,
        category: "CSRF",
      },
      {
        id: "file-upload",
        title: "Malicious File Upload",
        description: "Exploit file upload vulnerabilities to gain system access",
        difficulty: "Intermediate",
        xpReward: 350,
        timeEstimate: "40 min",
        isCompleted: true,
        isUnlocked: true,
        category: "File Upload",
      },
      {
        id: "authentication-bypass",
        title: "Authentication Bypass",
        description: "Break authentication mechanisms using various techniques",
        difficulty: "Intermediate",
        xpReward: 400,
        timeEstimate: "50 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Authentication",
      },
      {
        id: "directory-traversal",
        title: "Directory Traversal Master",
        description: "Access restricted files using path traversal techniques",
        difficulty: "Intermediate",
        xpReward: 320,
        timeEstimate: "35 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Path Traversal",
      },
      {
        id: "api-security",
        title: "REST API Exploitation",
        description: "Find and exploit vulnerabilities in REST APIs",
        difficulty: "Advanced",
        xpReward: 500,
        timeEstimate: "60 min",
        isCompleted: false,
        isUnlocked: false,
        category: "API Security",
      },
      {
        id: "jwt-attacks",
        title: "JWT Token Manipulation",
        description: "Learn to attack JSON Web Token implementations",
        difficulty: "Advanced",
        xpReward: 450,
        timeEstimate: "55 min",
        isCompleted: false,
        isUnlocked: false,
        category: "JWT",
      },
    ],
  },
  "network-exploitation": {
    id: "network-exploitation",
    title: "Network Exploitation",
    description: "Learn network scanning, enumeration, and exploitation techniques",
    icon: Target,
    color: "secondary",
    totalChallenges: 15,
    completedChallenges: 9,
    challenges: [
      {
        id: "port-scanning",
        title: "Port Scanning Detective",
        description: "Master network reconnaissance and port scanning techniques",
        difficulty: "Intermediate",
        xpReward: 300,
        timeEstimate: "40 min",
        isCompleted: true,
        isUnlocked: true,
        category: "Reconnaissance",
      },
      {
        id: "network-sniffing",
        title: "Network Traffic Analysis",
        description: "Analyze network packets and identify malicious traffic",
        difficulty: "Advanced",
        xpReward: 350,
        timeEstimate: "45 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Traffic Analysis",
      },
      {
        id: "wifi-cracking",
        title: "WiFi Security Assessment",
        description: "Learn wireless network security testing techniques",
        difficulty: "Advanced",
        xpReward: 400,
        timeEstimate: "60 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Wireless Security",
      },
    ],
  },
  cryptography: {
    id: "cryptography",
    title: "Cryptography & Encryption",
    description: "Understand encryption algorithms and learn to break weak implementations",
    icon: Globe,
    color: "accent",
    totalChallenges: 18,
    completedChallenges: 3,
    challenges: [
      {
        id: "caesar-cipher",
        title: "Caesar Cipher Detective",
        description: "Crack ancient encryption methods and decode secret messages",
        difficulty: "Beginner",
        xpReward: 200,
        timeEstimate: "30 min",
        isCompleted: true,
        isUnlocked: true,
        category: "Classical Ciphers",
      },
      {
        id: "hash-cracking",
        title: "Hash Function Analysis",
        description: "Understand hash functions and identify vulnerabilities",
        difficulty: "Intermediate",
        xpReward: 300,
        timeEstimate: "45 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Hash Functions",
      },
      {
        id: "rsa-attacks",
        title: "RSA Cryptanalysis",
        description: "Learn to exploit weak RSA implementations",
        difficulty: "Advanced",
        xpReward: 500,
        timeEstimate: "90 min",
        isCompleted: false,
        isUnlocked: false,
        category: "Public Key Crypto",
      },
    ],
  },
  "database-security": {
    id: "database-security",
    title: "Database Security",
    description: "SQL injection mastery and database security assessment",
    icon: Database,
    color: "success",
    totalChallenges: 10,
    completedChallenges: 8,
    challenges: [
      {
        id: "sql-injection",
        title: "SQL Injection Hunter",
        description: "Master advanced SQL injection techniques and bypasses",
        difficulty: "Intermediate",
        xpReward: 400,
        timeEstimate: "50 min",
        isCompleted: true,
        isUnlocked: true,
        category: "SQL Injection",
      },
      {
        id: "database-hardening",
        title: "Database Security Hardening",
        description: "Learn to secure databases against common attacks",
        difficulty: "Advanced",
        xpReward: 350,
        timeEstimate: "60 min",
        isCompleted: false,
        isUnlocked: true,
        category: "Security Hardening",
      },
      {
        id: "nosql-injection",
        title: "NoSQL Injection Techniques",
        description: "Exploit NoSQL databases like MongoDB and CouchDB",
        difficulty: "Advanced",
        xpReward: 450,
        timeEstimate: "55 min",
        isCompleted: false,
        isUnlocked: true,
        category: "NoSQL Security",
      },
    ],
  },
}

export const challengeDetails: Record<string, ChallengeConfig> = {
  "web-security/sql-injection-1": {
    id: "sql-injection-1",
    title: "SQL Injection Detective",
    description: "Analyze vulnerable login forms and identify SQL injection payloads",
    xpReward: 250,
    difficulty: "Beginner",
    category: "Web Security",
    questions: [
      {
        type: "code-analysis",
        question: "Identify the vulnerability in this PHP login code:",
        code: `$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($connection, $query);`,
        answer: "sql injection",
        hint: "Look at how user input is directly inserted into the SQL query",
        explanation:
          "Direct string concatenation without input validation allows SQL injection attacks.",
      },
      {
        type: "payload-craft",
        question: "What payload would bypass this login check? (Username field)",
        context: "Query: SELECT * FROM users WHERE username='INPUT' AND password='test'",
        answer: "admin' --",
        hint: "Use SQL comments to ignore the password requirement",
        explanation: "The payload 'admin' --' logs in as admin and comments out the password check.",
      },
      {
        type: "multiple-choice",
        question: "Which of these is the BEST defense against SQL injection?",
        options: [
          "Input length validation",
          "Prepared statements with parameterized queries",
          "HTML entity encoding",
          "CAPTCHA verification",
        ],
        answer: 1,
        explanation: "Prepared statements separate SQL logic from user data, preventing injection.",
      },
    ],
  },
  "web-security/xss-basic": {
    id: "xss-basic",
    title: "Cross-Site Scripting Hunter",
    description: "Find and exploit XSS vulnerabilities in web applications",
    xpReward: 200,
    difficulty: "Beginner",
    category: "Web Security",
    questions: [
      {
        type: "vulnerability-spot",
        question: "Find the XSS vulnerability in this PHP code:",
        code: `<?php
$search = $_GET['q'];
echo "<h2>Search results for: " . $search . "</h2>";
?>`,
        answer: "no sanitization",
        hint: "User input is directly displayed without any filtering or encoding",
        explanation: "The search parameter is echoed directly without HTML encoding, allowing XSS.",
      },
      {
        type: "payload-craft",
        question: "Craft an XSS payload to display an alert box:",
        answer: "<script>alert('XSS')</script>",
        hint: "Use JavaScript within HTML script tags",
        explanation: "This basic XSS payload executes JavaScript to show an alert dialog.",
      },
      {
        type: "defense-identify",
        question: "Which function properly prevents XSS in this context?",
        context: "Displaying user input in HTML: echo $userInput;",
        options: ["strip_tags()", "htmlspecialchars()", "base64_encode()", "md5()"],
        answer: 1,
        explanation: "htmlspecialchars() converts special characters to HTML entities, preventing XSS.",
      },
    ],
  },
  "web-security/csrf-protection": {
    id: "csrf-protection",
    title: "CSRF Token Bypass",
    description: "Learn to identify and exploit CSRF vulnerabilities",
    xpReward: 300,
    difficulty: "Intermediate",
    category: "Web Security",
    questions: [
      {
        type: "vulnerability-analysis",
        question: "What makes this form vulnerable to CSRF attacks?",
        code: `<form action="/transfer" method="POST">
  <input name="amount" type="text" />
  <input name="to_account" type="text" />
  <input type="submit" value="Transfer Money" />
</form>`,
        answer: "no csrf token",
        hint: "Look for missing security tokens that verify the request origin",
        explanation: "The form lacks CSRF protection tokens, allowing cross-site request forgery.",
      },
      {
        type: "attack-vector",
        question: "How would an attacker exploit this CSRF vulnerability?",
        options: [
          "Direct database access",
          "Malicious website with hidden form",
          "Buffer overflow attack",
          "Password brute force",
        ],
        answer: 1,
        explanation:
          "Attackers create malicious sites with hidden forms that submit to the vulnerable endpoint.",
      },
      {
        type: "mitigation",
        question: "What's the most effective CSRF protection mechanism?",
        answer: "csrf token",
        hint: "A unique, unpredictable token that must be included with each request",
        explanation: "CSRF tokens are unique per session and must be validated server-side.",
      },
    ],
  },
  "web-security/file-upload": {
    id: "file-upload",
    title: "Malicious File Upload",
    description: "Exploit file upload vulnerabilities to gain system access",
    xpReward: 350,
    difficulty: "Intermediate",
    category: "Web Security",
    questions: [
      {
        type: "vulnerability-spot",
        question: "What's wrong with this file upload validation?",
        code: `if (strpos($_FILES['upload']['name'], '.php') === false) {
    move_uploaded_file($_FILES['upload']['tmp_name'], '/uploads/' . $_FILES['upload']['name']);
    echo "File uploaded successfully";
}`,
        answer: "insufficient validation",
        hint: "The validation only checks for '.php' but not other dangerous extensions",
        explanation: "The check can be bypassed with extensions like .php5, .phtml, or .phps.",
      },
      {
        type: "bypass-technique",
        question: "How could you bypass this PHP file extension filter?",
        context: "Filter blocks: .php, .php3, .php4, .php5",
        answer: ".phtml",
        hint: "Look for alternative PHP file extensions that execute server-side code",
        explanation: ".phtml files are also executed as PHP by most web servers.",
      },
      {
        type: "secure-implementation",
        question: "Which is the BEST approach for secure file uploads?",
        options: [
          "Check file extension only",
          "Whitelist allowed MIME types + extension + content validation",
          "Rename files with random names",
          "Store files in web root directory",
        ],
        answer: 1,
        explanation: "Multi-layered validation with whitelisting provides the strongest security.",
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
        type: "code-analysis",
        question: "Challenge content coming soon.",
        context:
          "We're expanding the mission database. Check back shortly for the full interactive scenario.",
        answer: "coming soon",
        explanation:
          "This mission is under construction. In the meantime, continue exploring other challenges to keep your streak alive!",
      },
    ],
  } satisfies ChallengeConfig
}
