import { useState, useEffect } from "react"
import Question from "./Question"
import { nanoid } from "nanoid"
import { shuffleArray } from "../utils/helpers"

const Quiz = ({ toggleQuiz, numberOfQuestions }) => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [busyChecking, setBusyChecking] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setLoading(true)
    const fetchQuestion = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`
      )
      if (!response.ok) throw Error("Something went wrong :) ")
      const data = await response.json()
      const combinedAnswers = data.results.map(q => {
        const answerArr = shuffleArray([
          ...q.incorrect_answers,
          q.correct_answer,
        ])

        const allAnswers = answerArr.map(answer => {
          return {
            id: nanoid(),
            answer: answer,
            isSelected: false,
          }
        })

        return {
          id: nanoid(),
          question: q.question,
          answers: allAnswers,
          correctAnswer: q.correct_answer,
          userAnswer: null,
        }
      })
      setQuestions(combinedAnswers)
      setLoading(false)
    }

    fetchQuestion()
  }, [])

  const handleAnswer = (answer, questionIndex) => {
    if (busyChecking) return

    const newAnswers = questions[questionIndex].answers.map(oldAnswer => {
      return oldAnswer.id === answer.id
        ? { ...oldAnswer, isSelected: true }
        : { ...oldAnswer, isSelected: false }
    })

    const newQuestions = questions.map((question, index) => {
      return questionIndex === index
        ? { ...question, userAnswer: answer.answer, answers: newAnswers }
        : question
    })

    setQuestions(newQuestions)
  }

  const checkAnswers = () => {
    setBusyChecking(true)

    const newScore = questions.reduce((score, question) => {
      if (question.correctAnswer === question.userAnswer) score += 1
      return score
    }, 0)
    setScore(newScore)
  }
  const startNewQuiz = () => {
    setBusyChecking(false)
    setScore(0)
    toggleQuiz()
  }

  return (
    <>
      {loading ? (
        "Loading ..."
      ) : (
        <Question
          questions={questions}
          handleAnswer={handleAnswer}
          busyChecking={busyChecking}
        />
      )}
      {busyChecking && (
        <span className="body-text">
          You scored {score} / {numberOfQuestions}
        </span>
      )}

      {busyChecking ? (
        <button
          className="btn btn-center"
          disabled={!questions.every(item => item.userAnswer)}
          onClick={startNewQuiz}
        >
          New Quiz
        </button>
      ) : (
        <button
          className="btn btn-center"
          disabled={!questions.every(item => item.userAnswer)}
          onClick={checkAnswers}
        >
          Check Answers
        </button>
      )}
    </>
  )
}

export default Quiz
