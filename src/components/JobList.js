import { useState, useEffect, useContext, useCallback } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import UserContext from "../UserContext";

function JobList({ applyToJob }) {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);

  /** Memoize searchJobs so it doesn't cause an infinite loop in useEffect */
  const searchJobs = useCallback(async () => {
    setLoading(true);
    try {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs);
    } catch (err) {
      setJobs([]);
    }
    setLoading(false);
  }, [searchTerm]);
  
  useEffect(() => {
    searchJobs();
  }, [searchJobs]);
  
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
      {loading ? <p>Loading jobs...</p> : jobs.map(job => <JobCard key={job.id} job={job} applyToJob={applyToJob} />)}
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
        jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            applyToJob={applyToJob}
            applied={currentUser?.applications?.includes(job.id)}
          />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;
