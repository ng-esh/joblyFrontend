import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
