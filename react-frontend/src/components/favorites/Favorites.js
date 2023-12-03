import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoriteItem from "../favorite-item/FavoriteItem.js";
import "./favorites.css";

const Favorites = ({ fetchFavorites, favorites }) => {
  return (
    <div className="favorites-container">
      <div className="header-section">
        <div className="header-container">
          <div className="back-btn">
            <Link to="/">
              <Button className="btn btn-success">Back</Button>
            </Link>
          </div>
          <div className="header">Favorites</div>
          <div className="spacer"></div>
        </div>
      </div>
      <div className="favorites">
        {/* If favorites is undefined display there are no favorites */}
        {favorites === undefined ? (
          <div className="no-fav">There are no favorites.</div>
        ) : (
          <div className="fav-items">
            {favorites &&
              favorites.map((item) => (
                <FavoriteItem
                  item={item}
                  key={item.id}
                  fetchFavorites={fetchFavorites}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
