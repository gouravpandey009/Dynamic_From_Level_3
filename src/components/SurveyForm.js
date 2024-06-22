import React, { useState, useEffect } from "react";
import { fetchSurveyQuestions } from "../api/mockApi"; // Adjust the path as necessary

const SurveyForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [surveyTopic, setSurveyTopic] = useState("");
  const [dynamicQuestions, setDynamicQuestions] = useState([]);

  useEffect(() => {
    if (surveyTopic) {
      fetchSurveyQuestions(surveyTopic)
        .then((response) => {
          setDynamicQuestions(response.questions);
        })
        .catch((error) => {
          console.error("Error fetching questions: ", error);
        });
    }
  }, [surveyTopic]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { fullName, email, surveyTopic, dynamicQuestions };
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="Survey-form">
      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="App-form-label">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="App-form-input"
            />
          </div>
          <div>
            <label className="App-form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="App-form-input"
            />
          </div>
          <div>
            <label className="App-form-label">Survey Topic:</label>
            <select
              value={surveyTopic}
              onChange={(e) => setSurveyTopic(e.target.value)}
              required
              className="App-form-input"
            >
              <option value="">Select</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>
          {dynamicQuestions.map((question, index) => (
            <div key={index}>
              <label className="App-form-label">{question.question}</label>
              <input
                type="text"
                onChange={(e) => {
                  const newQuestions = [...dynamicQuestions];
                  newQuestions[index].answer = e.target.value;
                  setDynamicQuestions(newQuestions);
                }}
                className="App-form-input"
              />
            </div>
          ))}
          <button type="submit" className="App-form-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
