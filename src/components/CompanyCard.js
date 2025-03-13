import { Link } from "react-router-dom";
import "../styles/CompanyCard.css"

function CompanyCard({ company }) {
  return (
    <div className="company-card">
    <h3>
      <Link to={`/companies/${company.handle}`}>{company.name}</Link>
    </h3>
    <p>{company.description}</p>
  </div>
  );
}

export default CompanyCard;
