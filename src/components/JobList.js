import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs);
    }
    fetchJobs();
  }, [searchTerm]); // 🔍 Re-fetch jobs when search term changes

  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <h2>Jobs</h2>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
