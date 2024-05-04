import React, { useState } from "react";
import ShortlistedCandidates from "./ShortlistedCandidates";

function About({ candidate }) {
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);

  const handleShortlist = () => {
    // Add the current candidate to the list of shortlisted candidates
    setShortlistedCandidates([...shortlistedCandidates, candidate]);
  };
  console.log(candidate);
  return (
    <div className="flex flex-col gap-2 px-5">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-[#3f3f3f]">About</h1>
        <p className="text-[#7c7c7c]  w-3/4">{candidate.answers[1]}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-xl font-bold text-[#3f3f3f]">
          Educational Background
        </h1>
        <p className="text-[#7c7c7c]  w-3/4">{candidate.answers[2]}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-xl font-bold text-[#3f3f3f]">Experience</h1>
        <p className="text-[#7c7c7c]  w-3/4">{candidate.answers[3]}</p>
      </div>
      <div className="mb-3">
        <h1 className="text-xl font-bold text-[#3f3f3f]">Hobbies</h1>
        <p className="text-[#7c7c7c] w-3/4 ">{candidate.answers[4]}</p>
      </div>
      <button
        onClick={handleShortlist}
        className="py-2 px-4 w-1/2 bg-[#1EC3B3] text-white text-xl font-bold rounded-md hover:bg-[#13aca4]"
      >
        Shortlist
      </button>
    </div>
  );
}

export default About;
