import { useContext, useState } from "react";
import UserContext from "../UserContext";


function JobCard({ job, applyToJob }) {
  const { currentUser } = useContext(UserContext);
  const hasApplied = currentUser?.applications?.includes(job.id); // ✅ Check if the user has already applied
  const [applied, setApplied] = useState(hasApplied);

  async function handleApply() {
    if (applied) return;
    await applyToJob(job.id);
    setApplied(true);
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{job.title}</h4>
      {job.companyName && <p>Company: {job.companyName}</p>}
      <p>Salary: {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}</p>
      <p>Equity: {job.equity || "N/A"}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
