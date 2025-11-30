import { NextResponse } from 'next/server'

// Mock challenge details data
const challengeDetails: Record<string, any> = {
  'sql-injection-1': {
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
        explanation: 'Direct string concatenation without input validation allows SQL injection attacks.',
      },
      {
        type: 'payload-craft',
        question: 'What payload would bypass this login check? (Username field)',
        context: "Query: SELECT * FROM users WHERE username='INPUT' AND password='test'",
        answer: "admin' --",
        hint: 'Use SQL comments to ignore the password requirement',
        explanation: "The payload 'admin' --' logs in as admin and comments out the password check.",
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
  'xss-basic': {
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
    ],
  },
}

// GET /api/challenges/[category]/[id] - Get specific challenge details
export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const { category, id } = await params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    const challenge = challengeDetails[id]

    if (!challenge) {
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...challenge,
        pathCategory: category,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch challenge' },
      { status: 500 }
    )
  }
}

// POST /api/challenges/[category]/[id] - Submit challenge answer
export async function POST(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const { category, id } = await params
    const body = await request.json()
    const { questionIndex, answer } = body

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const challenge = challengeDetails[id]
    if (!challenge) {
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    const question = challenge.questions[questionIndex]
    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      )
    }

    // Check answer (case-insensitive for text, exact for numbers)
    const isCorrect =
      typeof question.answer === 'number'
        ? answer === question.answer
        : answer.toLowerCase().includes(question.answer.toLowerCase())

    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        explanation: question.explanation,
        xpEarned: isCorrect ? Math.round(challenge.xpReward / challenge.questions.length) : 0,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    )
  }
}
