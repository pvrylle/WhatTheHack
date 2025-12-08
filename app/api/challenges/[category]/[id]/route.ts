import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

// GET /api/challenges/[category]/[id] - Get specific challenge details with questions
export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const { category, id } = await params
    const supabase = await createSupabaseServerClient()

    // Fetch the challenge
    const { data: challengeData, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (challengeError || !challengeData) {
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    const challenge = challengeData as any

    // Fetch questions for this challenge
    const { data: questions, error: questionsError } = await supabase
      .from('challenge_questions')
      .select('*')
      .eq('challenge_id', id)
      .order('order_index', { ascending: true })

    if (questionsError) {
      console.error('Error fetching questions:', questionsError)
    }

    // Format questions for frontend (hide answers)
    const formattedQuestions = (questions || []).map((q) => ({
      type: q.type,
      question: q.question,
      code: q.code_snippet,
      context: q.context,
      options: q.options,
      hint: q.hint,
      // Don't send answer to frontend - validate on POST
    }))

    return NextResponse.json({
      success: true,
      data: {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        xpReward: challenge.xp_reward,
        difficulty: challenge.difficulty,
        category: challenge.category,
        pathCategory: category,
        questions: formattedQuestions,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error fetching challenge:', error)
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

    const supabase = await createSupabaseServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch the challenge
    const { data: challengeData, error: challengeError } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single()

    if (challengeError || !challengeData) {
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    const challenge = challengeData as any

    // Fetch the specific question
    const { data: questions, error: questionsError } = await supabase
      .from('challenge_questions')
      .select('*')
      .eq('challenge_id', id)
      .order('order_index', { ascending: true })

    if (questionsError || !questions || !questions[questionIndex]) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      )
    }

    const question = questions[questionIndex] as any as any

    // Check answer (case-insensitive for text, exact for numbers)
    let isCorrect = false
    if (typeof question.correct_answer === 'number') {
      isCorrect = answer === question.correct_answer
    } else if (typeof question.correct_answer === 'string') {
      isCorrect = answer.toLowerCase().includes(question.correct_answer.toLowerCase())
    } else if (Array.isArray(question.correct_answer)) {
      // For multiple correct answers
      isCorrect = question.correct_answer.some((a: string) => 
        answer.toLowerCase().includes(a.toLowerCase())
      )
    }

    const xpEarned = isCorrect ? Math.round(challenge.xp_reward / questions.length) : 0

    // If user is logged in and answer is correct, update progress
    if (user && isCorrect) {
      // Check if this is the last question
      const isLastQuestion = questionIndex === questions.length - 1

      // Update or create user progress
      const { data: existingProgressData } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', id)
        .single()

      const existingProgress = existingProgressData as any

      if (existingProgress) {
        const newQuestionsAnswered = (existingProgress.questions_answered || 0) + 1
        const totalXpEarned = (existingProgress.xp_earned || 0) + xpEarned

        await supabase
          .from('user_challenge_progress')
          // @ts-expect-error - Supabase type inference issue
          .update({
            questions_answered: newQuestionsAnswered,
            xp_earned: totalXpEarned,
            is_completed: isLastQuestion,
            completed_at: isLastQuestion ? new Date().toISOString() : null,
          })
          .eq('user_id', user.id)
          .eq('challenge_id', id)
      } else {
        await supabase
          .from('user_challenge_progress')
          // @ts-expect-error - Supabase type inference issue
          .insert({
            user_id: user.id,
            challenge_id: id,
            questions_answered: 1,
            xp_earned: xpEarned,
            is_completed: isLastQuestion,
            completed_at: isLastQuestion ? new Date().toISOString() : null,
          })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        explanation: question.explanation,
        xpEarned,
      },
    })
  } catch (error) {
    console.error('Error submitting answer:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    )
  }
}
