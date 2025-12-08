import { NextResponse } from 'next/server'

// Mock data for challenges - in production, this would come from a database
const challenges = {
  'web-security': {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Master web penetration testing and vulnerability assessment',
    icon: 'Shield',
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
    ],
  },
  'network-exploitation': {
    id: 'network-exploitation',
    title: 'Network Exploitation',
    description: 'Learn network scanning, enumeration, and exploitation techniques',
    icon: 'Target',
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
    ],
  },
  cryptography: {
    id: 'cryptography',
    title: 'Cryptography & Encryption',
    description: 'Understand encryption algorithms and learn to break weak implementations',
    icon: 'Globe',
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
    ],
  },
  'database-security': {
    id: 'database-security',
    title: 'Database Security',
    description: 'SQL injection mastery and database security assessment',
    icon: 'Database',
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
    ],
  },
}

// GET /api/challenges - Get all mission paths
export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json({
      success: true,
      data: challenges,
      meta: {
        total: Object.keys(challenges).length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch challenges' },
      { status: 500 }
    )
  }
}
