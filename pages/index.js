import StartScreen from "../components/StartScreen"
import { useState } from "react"
import Quiz from "../components/Quiz"
import Head from "next/head"

const Home = () => {
  const [quizGoingOn, setQuizGoingOn] = useState(false)
  const [numberOfQuestions, setNumberOfQuestions] = useState(5)

  const handleChange = event => {
    const { value } = event.target
    setNumberOfQuestions(value)
  }

  const toggleQuiz = () => {
    setQuizGoingOn(prevState => !prevState)
  }

  return (
    <>
      <Head>
        <title>Quizzia</title>
      </Head>
      <div className="container">
        {quizGoingOn ? (
          <Quiz toggleQuiz={toggleQuiz} numberOfQuestions={numberOfQuestions} />
        ) : (
          <StartScreen
            toggleQuiz={toggleQuiz}
            handleChange={handleChange}
            numberOfQuestions={numberOfQuestions}
          />
        )}
      </div>
    </>
  )
}

export default Home
