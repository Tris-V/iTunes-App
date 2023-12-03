import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash as faSolidTrash } from "@fortawesome/free-solid-svg-icons";
import "./favoriteItem.css";

// Function that removes an item from favorites
const FavoriteItem = ({ item, fetchFavorites }) => {
  const removeItem = async () => {
    await fetch(`/api/delete/${item.id}`, {
      method: "DELETE",
    });
    fetchFavorites();
  };

  // Function that handles removing an item from favorites
  const handleRemove = (e) => {
    e.preventDefault();
    removeItem();
  };

  const getMoreInfoUrl = () => {
    return item.favItem.trackViewUrl
      ? item.favItem.trackViewUrl
      : item.favItem.collectionViewUrl;
  };

  // Function that handles more info button click
  const handleMoreInfo = () => {
    const url = getMoreInfoUrl();
    window.open(url);
  };

  return (
    <div className="fav-item">
      {/* Section that displays the item's artwork, and if the item doesn't have artwork display the text */}
      <div className="img">
        {item.favItem.artworkUrl100 ? (
          <img src={item.favItem.artworkUrl100} alt="media artwork" />
        ) : (
          <div className="img-text">No image</div>
        )}
      </div>
      {/* Section to display the item info */}
      <div className="item-info">
        {!item.favItem.trackName ? (
          <div className="collection-name">
            <span>Name:</span> {item.favItem.collectionName}
          </div>
        ) : (
          <div className="track-name">
            <span>Name:</span> {item.favItem.trackName}
          </div>
        )}
        <div className="artist-name">
          <span>Artist:</span> {item.favItem.artistName}
        </div>

        {item.favItem.kind ? (
          <div className="kind">
            <span>Type:</span> {item.favItem.kind}
          </div>
        ) : (
          <div className="wrapper-type">
            <span>Type:</span> {item.favItem.wrapperType}
          </div>
        )}
      </div>

      <div className="btns">
        <div className="remove-btn">
          <button onClick={handleRemove}>
            <FontAwesomeIcon icon={faSolidTrash} />
          </button>
        </div>
        <div className="view-more-btn">
          <Button variant="success" onClick={handleMoreInfo}>
            more info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
