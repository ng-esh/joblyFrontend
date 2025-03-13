import { useContext } from "react";
import UserContext from "../UserContext";
import "../styles/JobCard.css"

function JobCard({ job, applyToJob }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser?.applications) {
    currentUser.applications = new Set();
  }

  // ✅ Ensure `applications` is always treated as numbers
  const hasApplied = currentUser?.applications?.has(Number(job.id));

  function updateUserApplications(jobId) {
    currentUser.applications.add(jobId);
  }

  async function handleApply() {
    if (hasApplied) return;
    await applyToJob(currentUser.username, job.id, updateUserApplications);
  }

  return (
    <div className="job-card">
    <div className="job-card-details">
      <h3>{job.title}</h3>
      {job.companyName && <p>Company: {job.companyName}</p>}
      <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {job.equity || "N/A"}</p>
    </div>
    <button onClick={handleApply} disabled={hasApplied}>
      {hasApplied ? "Applied" : "Apply"}
    </button>
  </div>
  );
}

export default JobCard;
