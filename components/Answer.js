import clsx from "clsx"
import { htmlDecode } from "../utils/helpers"

const Answer = ({
  answers,
  handleAnswer,
  questionIndex,
  busyChecking,
  question,
}) => {
  console.log(question, "question")
  return (
    <>
      {answers.map(answer => {
        const green = busyChecking && answer.answer === question.correctAnswer
        const red =
          busyChecking &&
          answer.answer !== question.correctAnswer &&
          answer.isSelected

        const blue = !busyChecking && answer.isSelected
        const white = !busyChecking && !answer.isSelected

        return (
          <li
            className={clsx("answer", {
              green: green,
              red: red,
              blue: blue,
              white: white,
              inactive: busyChecking,
            })}
            key={answer.id}
            onClick={() => handleAnswer(answer, questionIndex)}
          >
            {htmlDecode(answer.answer)}
          </li>
        )
      })}
    </>
  )
}

export default Answer
