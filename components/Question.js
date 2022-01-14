import Answer from "./Answer"
import { htmlDecode } from "../utils/helpers"

const Question = ({ questions, handleAnswer, busyChecking }) => {
  return (
    <>
      {questions.map((question, index) => (
        <div key={question.id}>
          <h4>{htmlDecode(question.question)}</h4>
          <ul className="answer-container">
            <Answer
              answers={question.answers}
              question={question}
              handleAnswer={handleAnswer}
              questionIndex={index}
              busyChecking={busyChecking}
            />
          </ul>
          <hr className="divider" />
        </div>
      ))}
    </>
  )
}

export default Question
