import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./headerSection.css";

const HeaderSection = () => {
  const appleLogoUrl =
    "https://i.pinimg.com/originals/94/a6/7d/94a67d454266c1b1ed519ef88d518b62.jpg";
  return (
    <div>
      <div className="header-container">
        <img src={appleLogoUrl} alt="Apple Logo" className="apple-logo" />
        <div className="header">iTunesFind</div>
        <div className="favorite-btn">
          <Link to="/favorites">
            <Button className="btn btn-success">Favorites</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
