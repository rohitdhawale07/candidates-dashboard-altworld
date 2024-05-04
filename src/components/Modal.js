import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const questions = [
  "",
  "Tell me about yourself.",
  "What is your educational background?",
  "What is your experience",
  "What are your hobbies or interests?",
  "What are your strengths?",
  "What are your weaknesses?",
  "Can you describe a challenging project you've worked on?",
  "How do you handle stress and pressure?",
  "Where do you see yourself in 5 years?",
  "Do you have any questions for us?",
];

const Modal = ({ isOpen, onClose }) => {
  const [previousEmail, setPreviousEmail] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  if (!isOpen) return null;

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const generateRandomScore = () => {
    return Math.floor(Math.random() * 7) + 4; // Random score between 4 and 10
  };

  const calculateTotalScore = (
    behavioralScore,
    communicationScore,
    situationHandlingScore
  ) => {
    return (
      ((behavioralScore + communicationScore + situationHandlingScore) / 30) *
      100
    );
  };

  const handleSaveAnswers = async () => {
    try {
      const behavioralScore = generateRandomScore();
      const communicationScore = generateRandomScore();
      const situationHandlingScore = generateRandomScore();
      const totalScore = calculateTotalScore(
        behavioralScore,
        communicationScore,
        situationHandlingScore
      );
      // Construct the data object to send to the API
      const data = {
        name: name,
        email: email,
        behavioralScore: behavioralScore,
        communicationScore: communicationScore,
        situationHandlingScore: situationHandlingScore,
        totalScore: totalScore,
        answers: answers,
      };

      if (!name || !email) {
        alert("Please provide your name and email.");
        return;
      }

      if (email.toLowerCase() === previousEmail.toLowerCase()) {
        alert("Please use a different email for a new assignment.");
        return;
      }

      const filteredAnswers = answers.filter((answer) => answer.trim() !== "");
      if (filteredAnswers.length < 10) {
        alert("Please provide answers to all questions.");
        return;
      }

      // Make a POST request to the mock API endpoint
      const response = await axios.post(
        "https://660c07dd3a0766e85dbd3665.mockapi.io/api/customers/candidates",
        data
      );

      console.log("API Response:", response.data);
      setPreviousEmail(email);
      setCurrentQuestionIndex(1);
      setAnswers(Array(questions.length).fill(""));

      // Close the modal after successful submission

      onClose();
    } catch (error) {
      console.log(error);
      // Handle error cases as needed
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-start"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isOpen ? 0 : -50, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white text-black relative rounded-lg h-screen  p-6 w-1/2 "
      >
        <button
          onClick={onClose}
          className="absolute top-0 left-0 m-1 text-2xl font-bold text-gray-600"
        >
          &times;
        </button>
        {currentQuestionIndex === 0 ? (
          <div className="mt-5">
            <input
              className="border px-3 py-1 rounded-md"
              type="text"
              placeholder="Enter name*"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border block px-3 py-1 rounded-md mt-4"
              type="email"
              placeholder="Enter email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 block mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <p className="mt-5">
              <strong>{currentQuestionIndex}</strong>/{questions.length - 1}
            </p>
            <h2 className="text-xl font-bold mb-4">
              {questions[currentQuestionIndex]}
            </h2>
            <textarea
              className="w-full h-24 border p-2 mb-4"
              value={answers[currentQuestionIndex]}
              onChange={handleAnswerChange}
              maxLength={100}
              placeholder="Type your answer (max 100 words)"
            />
            <div className="flex justify-between">
              {currentQuestionIndex > 0 && (
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={handlePrevQuestion}
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNextQuestion}
                >
                  Next
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSaveAnswers}
                >
                  Save Answers
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
