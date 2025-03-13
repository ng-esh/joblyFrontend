import { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Added missing state

  useEffect(() => {
    async function fetchCompanies() {
      setLoading(true); // ✅ Ensure loading starts
      try {
        let companies = await JoblyApi.getCompanies(searchTerm);
        setCompanies(companies);
      } catch (err) {
        setCompanies([]);
      }
      setLoading(false); // ✅ Ensure loading stops after fetching
    }
    fetchCompanies();
  }, [searchTerm]);

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
      {loading ? (
        <p>Loading companies...</p>
      ) : companies.length ? (
        companies.map(company => <CompanyCard key={company.handle} company={company} />)
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}

export default CompanyList;
