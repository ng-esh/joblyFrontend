function JobCard({ job }) {
    return (
      <div>
        <h4>{job.title}</h4>
        <p>Salary: {job.salary || "N/A"}</p>
        <p>Equity: {job.equity || "N/A"}</p>
      </div>
    );
  }
  
  export default JobCard;
  