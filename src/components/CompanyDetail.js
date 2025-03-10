import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";

function CompanyDetail({ applyToJob }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      let companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <h3>Jobs at {company.name}</h3>
      {company.jobs.map(job => (
        <JobCard key={job.id} job={job} applyToJob={applyToJob} />
      ))}
    </div>
  );
}

export default CompanyDetail;
