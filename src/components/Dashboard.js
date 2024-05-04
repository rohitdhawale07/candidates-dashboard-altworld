import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import CandidateDetail from "./CandidateDetail ";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://660c07dd3a0766e85dbd3665.mockapi.io/api/customers/candidates`
      );
      const result = await response.json();
      console.log(result);
      setCandidates(result);
      if (result.length > 0) {
        setSelectedCandidate(result[0]);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="border w-full flex items-start">
      <table className="w-1/3 border-collapse shadow-md">
        <thead>
          <tr>
            <th className="text-gray-400 px-6 py-3 text-left">Candidate</th>
            <th className="text-gray-400 px-6 py-3 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr
              onClick={() => handleRowClick(candidate)}
              key={candidate.id}
              className={`border-t duration-100 ${
                selectedCandidate && selectedCandidate.id === candidate.id
                  ? "bg-gray-200 cursor-pointer"
                  : "hover:bg-slate-100 hover:cursor-pointer"
              }`}
            >
              <td className="flex items-center gap-2 p-3">
                <span className="text-2xl p-2 rounded-md shadow-lg text-gray-600">
                  <FaUser />
                </span>
                <div>
                  <strong className="block text-gray-800">
                    {candidate.name}
                  </strong>
                  <span className="text-sm text-gray-500">
                    {candidate.email}
                  </span>
                </div>
              </td>
              <td
                className={
                  candidate.totalScore >= 50
                    ? "text-green-500 font-semibold text-2xl p-4"
                    : "text-yellow-500 font-semibold text-2xl p-4"
                }
              >
                {Math.ceil(candidate.totalScore)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-grow">
        <CandidateDetail candidate={selectedCandidate} />
      </div>
    </div>
  );
}

export default Dashboard;
