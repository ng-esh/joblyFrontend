import { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      let companies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companies);
    }
    fetchCompanies();
  }, [searchTerm]); // 🔍 Fetches new data when searchTerm changes

  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <h2>Companies</h2>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {companies.length ? (
        companies.map(company => <CompanyCard key={company.handle} company={company} />)
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}


export default CompanyList;
