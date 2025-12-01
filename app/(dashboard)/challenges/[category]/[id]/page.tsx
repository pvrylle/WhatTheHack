'use client'

import { use, useEffect, useMemo, useState, useCallback } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle, Zap, Shield, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Text } from '@/components/atoms'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type QuestionType =
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

type ChallengeQuestion = {
  type: QuestionType
  question: string
  code?: string
  context?: string
  options?: string[]
  answer: string | number
  hint?: string
  explanation?: string
}

type ChallengeDetail = {
  id: string
  title: string
  description: string
  xp_reward: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  category_id: string
  questions: ChallengeQuestion[]
}

const normalizeAnswer = (value: string | number) => {
  if (typeof value === 'number') {
    return String(value).trim().toLowerCase()
  }
  return value.trim().toLowerCase()
}

export default function ChallengePage({
  params,
}: {
  params: Promise<{ category: string; id: string }>
}) {
  const { category, id } = use(params)
  
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showHints, setShowHints] = useState<boolean[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [explanations, setExplanations] = useState<boolean[]>([])

  useEffect(() => {
    async function fetchChallenge() {
      try {
        setLoading(true)
        const response = await fetch(`/api/challenges/${category}/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('not-found')
            return
          }
          throw new Error('Failed to fetch challenge')
        }
        
        const data = await response.json()
        setChallenge(data)
      } catch (err) {
        console.error('Error fetching challenge:', err)
        setError('Failed to load challenge')
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [category, id])

  useEffect(() => {
    if (challenge?.questions) {
      setCurrentQuestion(0)
      setIsCompleted(false)
      setScore(0)
      setUserAnswers(Array(challenge.questions.length).fill(''))
      setShowHints(Array(challenge.questions.length).fill(false))
      setExplanations(Array(challenge.questions.length).fill(false))
    }
  }, [challenge])

  const handleAnswerChange = useCallback((value: string) => {
    setUserAnswers(prev => {
      const answers = [...prev]
      answers[currentQuestion] = value
      return answers
    })
  }, [currentQuestion])

  const isCorrectAnswer = useCallback((value: string, expected: string | number) => {
    if (typeof expected === 'number') {
      return Number(value) === expected
    }
    const stringValue = typeof value === 'string' ? value : String(value)
    const normalizedExpected = normalizeAnswer(expected)
    const normalizedValue = normalizeAnswer(stringValue)
    return normalizedValue === normalizedExpected || normalizedValue.includes(normalizedExpected)
  }, [])

  const handleSubmit = useCallback(
    (selected?: string) => {
      if (!challenge) return
      
      const question = challenge.questions[currentQuestion]
      const userValue = selected ?? userAnswers[currentQuestion]

      if (!userValue) {
        toast('Enter an answer before submitting')
        return
      }

      const stringValue = typeof userValue === 'string' ? userValue : String(userValue)
      const correct = isCorrectAnswer(stringValue, question.answer)

      toast(correct ? 'Access Granted' : 'Access Denied', {
        description: correct
          ? 'Your exploit executed successfully.'
          : 'The payload failed. Adjust your approach and try again.',
        duration: 2000,
      })

      setExplanations(prev => {
        const explanationsState = [...prev]
        explanationsState[currentQuestion] = true
        return explanationsState
      })

      if (correct) {
        setScore((prev) => prev + 1)
      }
    },
    [currentQuestion, userAnswers, challenge, isCorrectAnswer]
  )

  const handleNextQuestion = useCallback(() => {
    if (!challenge) return
    
    const nextIndex = currentQuestion + 1
    if (nextIndex < challenge.questions.length) {
      setCurrentQuestion(nextIndex)
    } else {
      setIsCompleted(true)
      toast.success('Mission Completed', {
        description: `You earned ${challenge.xp_reward} XP`,
      })
    }
  }, [currentQuestion, challenge])

  const toggleHint = useCallback(() => {
    setShowHints(prev => {
      const hints = [...prev]
      hints[currentQuestion] = !hints[currentQuestion]
      return hints
    })
  }, [currentQuestion])

  const handleRetry = useCallback(() => {
    if (!challenge) return
    
    setCurrentQuestion(0)
    setIsCompleted(false)
    setScore(0)
    setUserAnswers(Array(challenge.questions.length).fill(''))
    setShowHints(Array(challenge.questions.length).fill(false))
    setExplanations(Array(challenge.questions.length).fill(false))
  }, [challenge])

  const handleOptionSelect = useCallback(
    (index: number) => {
      setUserAnswers(prev => {
        const answers = [...prev]
        answers[currentQuestion] = String(index)
        return answers
      })
      handleSubmit(String(index))
    },
    [currentQuestion, handleSubmit]
  )

  // Loading state
  if (loading) {
    return <LoadingSkeleton variant="page" />
  }

  // Not found state
  if (error === 'not-found' || !challenge) {
    notFound()
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  // No questions state
  if (!challenge.questions || challenge.questions.length === 0) {
    notFound()
  }

  const question = challenge.questions[currentQuestion]

  const renderAnswerInput = () => {
    if (question.options) {
      return (
        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={option}
              variant={userAnswers[currentQuestion] === String(index) ? 'default' : 'outline'}
              className="justify-start text-left h-auto py-3"
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      )
    }

    const longAnswer = Boolean(question.code && question.code.length > 120)

    if (question.type === 'payload-craft' || longAnswer) {
      return (
        <Textarea
          value={userAnswers[currentQuestion] || ''}
          onChange={(event) => handleAnswerChange(event.target.value)}
          placeholder="Enter your answer or payload"
          className="min-h-[120px]"
        />
      )
    }

    return (
      <Input
        value={userAnswers[currentQuestion] || ''}
        onChange={(event) => handleAnswerChange(event.target.value)}
        placeholder="Enter your answer"
      />
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <Button variant="outline" size="sm" asChild className="font-mono border-primary/30">
          <Link href={`/challenges/${category}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Challenges
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {challenge.title}
            </h1>
            <p className="text-sm text-muted-foreground font-mono max-w-2xl">
              {challenge.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono border-primary/30">
              {challenge.category}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'font-mono',
                challenge.difficulty === 'Beginner' && 'border-emerald-500/30 text-emerald-400',
                challenge.difficulty === 'Intermediate' && 'border-amber-500/30 text-amber-400',
                challenge.difficulty === 'Advanced' && 'border-red-500/30 text-red-400'
              )}
            >
              {challenge.difficulty}
            </Badge>
            <Badge className="font-mono bg-primary/20 text-primary border-primary/30">
              <Zap className="w-3 h-3 mr-1" />
              +{challenge.xp_reward} XP
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-card/50 to-card/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/15 border border-primary/25">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Text variant="h3" size="lg" weight="semibold" orbitron>
                  Question {currentQuestion + 1} of {challenge.questions.length}
                </Text>
                <Text size="sm" color="muted" mono>
                  {question.type.replace(/-/g, ' ').toUpperCase()}
                </Text>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-primary" />
                <Text size="lg" weight="bold" color="primary" orbitron>
                  {Math.round((score / (currentQuestion + 1)) * 100)}%
                </Text>
              </div>
              <Text size="xs" color="muted" mono>
                Current Accuracy
              </Text>
            </div>
          </div>
          <Progress
            value={((currentQuestion + 1) / challenge.questions.length) * 100}
            className="h-3 bg-muted/50"
          />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-orbitron flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Challenge Question
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.context && (
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 text-sm font-mono leading-relaxed">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                <span className="text-primary font-semibold">Context</span>
              </div>
              {question.context}
            </div>
          )}

          {question.code && (
            <div className="rounded-lg border-2 border-secondary/30 bg-secondary/5 overflow-hidden">
              <div className="bg-secondary/10 px-4 py-2 border-b border-secondary/20">
                <Text size="xs" weight="semibold" mono className="text-secondary">
                  CODE BLOCK
                </Text>
              </div>
              <pre className="p-4 text-sm font-mono whitespace-pre-wrap overflow-x-auto bg-card/50">
                {question.code}
              </pre>
            </div>
          )}

          <div className="rounded-lg border-2 border-border bg-card/50 p-5">
            <p className="text-lg font-medium leading-relaxed">{question.question}</p>
          </div>

          {renderAnswerInput()}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {!question.options && (
              <Button
                onClick={() => handleSubmit()}
                className="flex items-center gap-2 font-mono"
                size="lg"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Answer
              </Button>
            )}
            {question.hint && (
              <Button
                type="button"
                variant="outline"
                onClick={toggleHint}
                className="flex items-center gap-2 font-mono"
                size="lg"
              >
                {showHints[currentQuestion] ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {showHints[currentQuestion] ? 'Hide Hint' : 'Show Hint'}
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={handleNextQuestion}
              className="flex items-center gap-2 font-mono"
              disabled={!explanations[currentQuestion]}
              size="lg"
            >
              Next Question
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>

          {/* Hint Section */}
          {showHints[currentQuestion] && question.hint && (
            <div className="rounded-lg border-2 border-primary/30 bg-primary/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-primary" />
                <Text size="sm" weight="semibold" className="text-primary">
                  Hint
                </Text>
              </div>
              <p className="text-sm font-mono text-primary/90 leading-relaxed">
                {question.hint}
              </p>
            </div>
          )}

          {/* Explanation Section */}
          {explanations[currentQuestion] && question.explanation && (
            <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <Text size="sm" weight="semibold" className="text-emerald-400">
                  Explanation
                </Text>
              </div>
              <p className="text-sm font-mono text-emerald-400/90 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completion Card */}
      {isCompleted && (
        <Card className="border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-emerald-400 text-2xl font-orbitron">
              <div className="p-2 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30">
                <CheckCircle className="w-6 h-6" />
              </div>
              Challenge Complete!
            </CardTitle>
            <CardDescription className="font-mono text-base mt-2">
              You solved <span className="text-emerald-400 font-bold">{score}</span> out of{' '}
              <span className="font-bold">{challenge.questions.length}</span> questions and earned{' '}
              <span className="text-primary font-bold">+{challenge.xp_reward} XP</span>.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="font-mono">
              <Link href={`/challenges/${category}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Challenges
              </Link>
            </Button>
            <Button variant="outline" onClick={handleRetry} size="lg" className="font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Retry Challenge
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Footer Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg border border-border/50 bg-muted/20 text-sm text-muted-foreground font-mono">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-foreground">system@whatthehack:~$</span> Authorized engagements
          only. Confirm mission scope before testing.
        </div>
      </div>
    </div>
  )
}
