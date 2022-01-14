const StartScreen = ({ toggleQuiz, handleChange, numberOfQuestions }) => {
  return (
    <div className="container-startscreen">
      <h1>Quizzical</h1>
      <h3>A Scrimba exercise</h3>
      <p className="body-text">How many questions do you want to answer?</p>
      <select
        id="numberOfQuestions"
        value={numberOfQuestions}
        onChange={handleChange}
        name="numberOfQuestions"
        className="dropdown"
      >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="15">15</option>
      </select>
      <button className="btn" onClick={() => toggleQuiz()}>
        Start quiz
      </button>
    </div>
  )
}

export default StartScreen
