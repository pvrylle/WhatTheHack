import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import type { ChallengeQuestion } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { category, id } = await params

    const { data: challenge, error } = await supabaseAdmin
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !challenge) {
      console.error('Supabase challenge error:', error)
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    let questions = challenge.questions || []
    if (typeof questions === 'string') {
      try {
        questions = JSON.parse(questions)
      } catch {
        console.error('Failed to parse questions JSON')
        questions = []
      }
    }

    const transformedChallenge = {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      xp_reward: challenge.xp_reward,
      difficulty: challenge.difficulty,
      category: challenge.category,
      category_id: category,
      questions: questions,
    }

    return NextResponse.json(transformedChallenge)
  } catch (error) {
    console.error('Challenge detail API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch challenge' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { category, id } = await params
    const body = await request.json()
    const { questionIndex, answer } = body

    const { data: challenge, error } = await supabaseAdmin
      .from('challenges')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !challenge) {
      return NextResponse.json(
        { success: false, error: 'Challenge not found' },
        { status: 404 }
      )
    }

    let questions: ChallengeQuestion[] = []
    if (typeof challenge.questions === 'string') {
      try {
        questions = JSON.parse(challenge.questions)
      } catch {
        questions = []
      }
    } else {
      questions = (challenge.questions as ChallengeQuestion[]) || []
    }
    
    const question = questions[questionIndex]
    
    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question not found' },
        { status: 404 }
      )
    }

    const isCorrect =
      typeof question.answer === 'number'
        ? answer === question.answer
        : String(answer).toLowerCase().includes(String(question.answer).toLowerCase())

    if (isCorrect && challenge.completed_challenges !== null && challenge.total_challenges !== null) {
      if (challenge.completed_challenges < challenge.total_challenges) {
        await supabaseAdmin
          .from('challenges')
          .update({ completed_challenges: challenge.completed_challenges + 1 })
          .eq('id', id)
      }
    }

    const xpPerQuestion = questions.length > 0 
      ? Math.round((challenge.xp_reward || 0) / questions.length) 
      : 0

    return NextResponse.json({
      success: true,
      data: {
        isCorrect,
        explanation: question.explanation,
        xpEarned: isCorrect ? xpPerQuestion : 0,
      },
    })
  } catch (error) {
    console.error('Challenge submit API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit answer' },
      { status: 500 }
    )
  }
}
