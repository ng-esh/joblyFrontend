import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div>
      <h4>
        <Link to={`/companies/${company.handle}`}>{company.name}</Link>
      </h4>
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyCard;
