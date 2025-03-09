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
  }, [searchTerm]); // 🔍 Re-fetch companies when search term changes

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
      {companies.map(company => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;
