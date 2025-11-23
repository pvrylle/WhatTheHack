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
import { toast } from 'sonner'
import { getChallengeDetail, missionPaths } from '@/data/challenges'

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
  const mission = missionPaths[category]
  const challenge = useMemo(() => getChallengeDetail(category, id), [category, id])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showHints, setShowHints] = useState<boolean[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [explanations, setExplanations] = useState<boolean[]>([])

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

  if (!mission || !challenge || !challenge.questions.length) {
    notFound()
  }

  const question = challenge.questions[currentQuestion]

  const handleAnswerChange = (value: string) => {
    const answers = [...userAnswers]
    answers[currentQuestion] = value
    setUserAnswers(answers)
  }

  const isCorrectAnswer = (value: string, expected: string | number) => {
    if (typeof expected === 'number') {
      return Number(value) === expected
    }

    // Ensure value is a string before normalizing
    const stringValue = typeof value === 'string' ? value : String(value)
    const normalizedExpected = normalizeAnswer(expected)
    const normalizedValue = normalizeAnswer(stringValue)

    return normalizedValue === normalizedExpected || normalizedValue.includes(normalizedExpected)
  }

  const handleSubmit = useCallback(
    (selected?: string) => {
      const userValue = selected ?? userAnswers[currentQuestion]

      if (!userValue) {
        toast('Enter an answer before submitting')
        return
      }

      // Ensure userValue is a string
      const stringValue = typeof userValue === 'string' ? userValue : String(userValue)
      const correct = isCorrectAnswer(stringValue, question.answer)

      toast(correct ? 'Access Granted' : 'Access Denied', {
        description: correct
          ? 'Your exploit executed successfully.'
          : 'The payload failed. Adjust your approach and try again.',
        duration: 2000,
      })

      const explanationsState = [...explanations]
      explanationsState[currentQuestion] = true
      setExplanations(explanationsState)

      if (correct) {
        setScore((prev) => prev + 1)
      }
    },
    [currentQuestion, userAnswers, question, explanations]
  )

  const handleNextQuestion = useCallback(() => {
    const nextIndex = currentQuestion + 1
    if (nextIndex < challenge.questions.length) {
      setCurrentQuestion(nextIndex)
    } else {
      setIsCompleted(true)
      toast.success('Mission Completed', {
        description: `You earned ${challenge.xpReward} XP`,
      })
    }
  }, [currentQuestion, challenge])

  const toggleHint = useCallback(() => {
    const hints = [...showHints]
    hints[currentQuestion] = !hints[currentQuestion]
    setShowHints(hints)
  }, [currentQuestion, showHints])

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0)
    setIsCompleted(false)
    setScore(0)
    setUserAnswers(Array(challenge.questions.length).fill(''))
    setShowHints(Array(challenge.questions.length).fill(false))
    setExplanations(Array(challenge.questions.length).fill(false))
  }, [challenge.questions.length])

  const handleOptionSelect = useCallback(
    (index: number) => {
      const answers = [...userAnswers]
      answers[currentQuestion] = String(index)
      setUserAnswers(answers)
      handleSubmit(String(index))
    },
    [currentQuestion, userAnswers, handleSubmit]
  )

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
    <div className="container mx-auto px-6 py-10 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/challenges/${mission.id}`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-orbitron font-semibold">{challenge.title}</h1>
            <p className="text-sm text-muted-foreground font-mono">{challenge.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono">
            {challenge.category}
          </Badge>
          <Badge variant="secondary" className="font-mono">
            Difficulty: {challenge.difficulty}
          </Badge>
          <Badge className="font-mono bg-success/10 text-success">+{challenge.xpReward} XP</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-orbitron">
            <Shield className="w-5 h-5 text-primary" />
            Question {currentQuestion + 1} of {challenge.questions.length}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 font-mono">
            {question.type.replace(/-/g, ' ').toUpperCase()}
            <span className="inline-flex items-center gap-1 text-success">
              <Zap className="w-4 h-4" />
              {Math.round((score / challenge.questions.length) * 100)}% accuracy
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {question.context && (
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4 text-sm font-mono">
              {question.context}
            </div>
          )}

          {question.code && (
            <pre className="rounded-lg border border-border/60 bg-card/70 p-4 text-sm font-mono whitespace-pre-wrap">
              {question.code}
            </pre>
          )}

          <p className="text-base font-medium">{question.question}</p>

          {renderAnswerInput()}

          <div className="flex flex-wrap items-center gap-3">
            {!question.options && (
              <Button onClick={() => handleSubmit()} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Submit Answer
              </Button>
            )}
            {question.hint && (
              <Button
                type="button"
                variant="outline"
                onClick={toggleHint}
                className="flex items-center gap-2"
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
              className="flex items-center gap-2"
              disabled={!explanations[currentQuestion]}
            >
              Next Question
            </Button>
          </div>

          {showHints[currentQuestion] && question.hint && (
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary font-mono">
              <strong>Hint:</strong> {question.hint}
            </div>
          )}

          {explanations[currentQuestion] && question.explanation && (
            <div className="rounded-lg border border-success/40 bg-success/10 p-4 text-sm text-success font-mono">
              <strong>Explanation:</strong> {question.explanation}
            </div>
          )}

          <Progress
            value={
              ((currentQuestion + (explanations[currentQuestion] ? 1 : 0)) /
                challenge.questions.length) *
              100
            }
            className="h-2"
          />
        </CardContent>
      </Card>

      {isCompleted && (
        <Card className="border-success/30 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" /> Mission Complete
            </CardTitle>
            <CardDescription className="font-mono">
              You solved {score} out of {challenge.questions.length} challenges and earned{' '}
              {challenge.xpReward} XP.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/challenges/${mission.id}`}>Return to Mission</Link>
            </Button>
            <Button variant="outline" onClick={handleRetry}>
              Retry Challenge
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
        <AlertTriangle className="w-4 h-4" />
        system@whatthehack:~$ Authorized engagements only. Confirm mission scope before testing.
      </div>
    </div>
  )
}
