import { useState, useEffect, useContext, useCallback } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import UserContext from "../UserContext";
import "../styles/JobList.css"

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

  useEffect(() => {
    async function fetchUserApplications() {
      try {
        const user = await JoblyApi.getUser(currentUser.username);
        currentUser.applications = new Set(user.applications);  // Ensure it's updated
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    }
  
    if (currentUser) {
      fetchUserApplications();
    }
  }, [currentUser]);  // Runs when `currentUser` changes
  
  
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchJobs();
  }
  return (
    <div className="container"> 
      <h2>Jobs</h2>
      <div className="job-list">
        
        {loading ? <p>Loading jobs...</p> : null}

        <form onSubmit={handleSubmit} className="job-search-form">
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
              applied={currentUser?.applications?.has(job.id)}
            />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
