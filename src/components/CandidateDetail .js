import React from "react";
import { FaUser } from "react-icons/fa";
import About from "./About";
import { motion } from "framer-motion";

const CandidateDetail = ({ candidate }) => {
  if (!candidate) return null; // Render nothing if candidate is not selected
  const { behavioralScore, situationHandlingScore, communicationScore } =
    candidate;

  const getScoreColor = (score) => {
    return score >= 5 ? "text-green-500 " : "text-yellow-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 py-3 h-screen rounded-md"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-400 ml-6">
        Candidate Details
      </h2>{" "}
      <hr />
      <div className="flex items-center ">
        <div className="flex items-center gap-2 p-3 w-1/2">
          <span className="text-4xl p-2 rounded-md shadow-lg text-gray-600">
            <FaUser />
          </span>
          <div>
            <strong className="block text-2xl text-gray-800">
              {candidate.name}
            </strong>
            <span className="text-sm text-gray-500">{candidate.email}</span>
          </div>
        </div>
        <div
          className={
            candidate.totalScore >= 50
              ? "text-green-500 font-bold text-4xl p-4"
              : "text-yellow-500 font-bold text-4xl p-4"
          }
        >
          {Math.ceil(candidate.totalScore)}%
        </div>
      </div>
      <div className=" m-3 flex items-center justify-start gap-6">
        <div>
          <label className="block mb-1  font-medium">- Behavioural Score</label>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="10"
            value={behavioralScore}
            className={`flex-grow text-green-500 h-4 rounded-lg mr-2 bg-${getScoreColor(
              behavioralScore
            )}`}
            readOnly
          />
          <span className={`text-sm ${getScoreColor(behavioralScore)}`}>
            <strong>{behavioralScore}</strong> /10
          </span>
        </div>
      </div>
      <div className=" m-3 flex items-center justify-start gap-6">
        <div>
          <label className="block mb-1  font-medium">
            - Situation Handling Score
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="10"
            value={situationHandlingScore}
            className={`flex-grow h-4 rounded-lg mr-2 ${getScoreColor(
              situationHandlingScore
            )}`}
            readOnly
          />
          <span className={`text-sm ${getScoreColor(situationHandlingScore)}`}>
            <strong>{situationHandlingScore}</strong> /10
          </span>
        </div>
      </div>
      <div className=" m-3 flex items-center justify-start gap-6">
        <div>
          <label className="block mb-1  font-medium">
            - Communication Score
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="10"
            value={communicationScore}
            className={`flex-grow  h-4 rounded-lg mr-2 ${getScoreColor(
              communicationScore
            )}`}
            readOnly
          />
          <span className={`text-sm ${getScoreColor(communicationScore)}`}>
            <strong>{communicationScore}</strong> /10
          </span>
        </div>
      </div>
      <About candidate={candidate} />
    </motion.div>
  );
};

export default CandidateDetail;
