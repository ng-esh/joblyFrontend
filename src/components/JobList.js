import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchJobs();
  }, []); // Fetch jobs on mount

  async function searchJobs() {
    setLoading(true);
    try {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    }
    setLoading(false);
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchJobs();
  }

  return (
    <div>
      <h2>Jobs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length ? (
        jobs.map(job => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;
