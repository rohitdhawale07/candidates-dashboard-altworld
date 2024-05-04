import React from "react";

function ShortlistedCandidates({ shortlistedCandidates }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shortlisted Candidates</h2>
      <ul>
        {shortlistedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <p>{candidate.name}</p>
            <p>{candidate.email}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShortlistedCandidates;
