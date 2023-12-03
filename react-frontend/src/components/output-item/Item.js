import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import "./item.css";

const Item = ({ item, fetchFavorites, favorites }) => {
  const [addFavClicked, setAddFavClicked] = useState(false);

  // Function to determine the ID of the item
  const determineItemId = () => {
    if (item.trackId) {
      return item.trackId;
    } else if (item.artistId && item.collectionId) {
      return Number(item.artistId) + Number(item.collectionId);
    } else if (item.artistId) {
      return item.artistId;
    } else {
      return item.collectionId;
    }
  };
  const id = determineItemId();

  // Function that performs API request to add the item to favorites
  const addItem = async () => {
    try {
      await fetch("/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          favItem: item,
        }),
      });
      fetchFavorites();
    } catch (error) {
      // Handle error
      console.error("Error adding item to favorites:", error);
    }
  };

  // Function that performs API request to remove the item from favorites
  const removeItem = async () => {
    try {
      await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });
      fetchFavorites();
    } catch (error) {
      // Handle error
      console.error("Error removing item from favorites:", error);
    }
  };

  // Function that handles adding an item to favorites
  const handleAdd = (e) => {
    e.preventDefault();
    setAddFavClicked(true);
    addItem();
  };

  // Function that handles removing an item from favorites
  const handleRemove = (e) => {
    e.preventDefault();
    setAddFavClicked(false);
    removeItem();
  };

  // Function that determines which URL to use when clicking view more
  const moreInfoUrl = item.trackViewUrl
    ? item.trackViewUrl
    : item.collectionViewUrl;

  // Function that opens a new tab when clicking view more
  const handleMoreInfo = () => {
    window.open(moreInfoUrl);
  };

  // useEffect that checks if the item is already added to favorites
  useEffect(() => {
    if (favorites && favorites.some((fav) => fav.id === id)) {
      setAddFavClicked(true);
    }
  }, [favorites, id]);

  return (
    <div className="output-item">
      {/* Display item's artwork */}
      <div className="img">
        {item.artworkUrl100 ? (
          <img src={item.artworkUrl100} alt="media artwork" />
        ) : (
          <div className="img-text">No image</div>
        )}
      </div>
      {/* Display item info */}
      <div className="item-info">
        {!item.trackName ? (
          <div className="collection-name">
            <span>Name:</span> {item.collectionName}
          </div>
        ) : (
          <div className="track-name">
            <span>Name:</span> {item.trackName}
          </div>
        )}
        <div className="artist-name">
          <span>Artist/Author/Series:</span> {item.artistName}
        </div>
        {item.kind ? (
          <div className="kind">
            <span>Media type:</span> {item.kind}
          </div>
        ) : (
          <div className="wrapper-type">
            <span>Type:</span> {item.wrapperType}
          </div>
        )}
      </div>

      <div className="btns">
        <div className="heart-btn">
          {addFavClicked ? (
            <button onClick={handleRemove}>
              <FontAwesomeIcon icon={faRegularHeart} className="clicked" />
            </button>
          ) : (
            <button onClick={handleAdd}>
              <FontAwesomeIcon icon={faRegularHeart} />
            </button>
          )}
        </div>
        <div className="more-info-btn">
          <Button variant="success" onClick={handleMoreInfo}>
            more info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;

/* https://developer.mozilla.org/en-US/docs/Web/API/Window/open 
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some */
