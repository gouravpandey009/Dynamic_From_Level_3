export const fetchSurveyQuestions = (topic) => {
  const questions = {
    Technology: [
      { question: "What is your favorite programming language?" },
      { question: "How many years of experience do you have in tech?" },
    ],
    Health: [
      { question: "How often do you exercise?" },
      { question: "Do you follow a specific diet?" },
    ],
    Education: [
      { question: "What is your highest level of education?" },
      { question: "What is your favorite subject?" },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ questions: questions[topic] || [] });
    }, 500); // Simulate network delay
  });
};
