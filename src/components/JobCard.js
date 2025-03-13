import { useContext } from "react";
import UserContext from "../UserContext";

function JobCard({ job, applyToJob }) {
  const { currentUser } = useContext(UserContext);

  // ✅ Ensure `applications` is always treated as numbers
  const appliedJobs = currentUser?.applications?.map(id => Number(id)) || [];
  const hasApplied = appliedJobs.includes(Number(job.id));

  async function handleApply() {
    if (hasApplied) return;
    await applyToJob(job.id);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{job.title}</h4>
      {job.companyName && <p>Company: {job.companyName}</p>}
      <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {job.equity || "N/A"}</p>
      <button onClick={handleApply} disabled={hasApplied}>
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
