import React from "react";
import Item from "../output-item/Item";
import "./output.css";

/**
 * Component to display search results or default messages
 * @param {Object} props - The component props
 * @param {Object} props.output - The search results
 * @param {Function} props.fetchFavorites - Function to fetch favorites
 * @param {Array} props.favorites - List of favorite items
 * @returns {JSX.Element} - Rendered component
 **/

const Output = ({ output, fetchFavorites, favorites }) => {
  return (
    <div className="output-container">
      {output.results !== undefined ? (
        <>
          {output.resultCount !== 0 ? (
            <>
              {/* Display search results */}
              <div className="output-items">
                {output.results.map((item) => (
                  <Item
                    item={item}
                    key={generateItemKey(item)}
                    fetchFavorites={fetchFavorites}
                    favorites={favorites}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Display no results message */}
              <div className="error-text">No results were found, sorry.</div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Display default message when no searches have been made */}
          <div className="default-text">No media searches made</div>
        </>
      )}
    </div>
  );
};

/**
 * Generates a unique key for each item based on available properties
 * @param {Object} item - The item for which to generate a key
 * @returns {string} - The generated key
 **/

const generateItemKey = (item) => {
  if (item.trackId) {
    return item.trackId.toString();
  } else if (item.artistId && item.collectionId) {
    return (Number(item.artistId) + Number(item.collectionId)).toString();
  } else if (item.artistId) {
    return item.artistId.toString();
  } else if (item.collectionId) {
    return item.collectionId.toString();
  }
  // Return a default key if none of the conditions are met
  return "defaultKey";
};

export default Output;

/* https://react.dev/learn/passing-props-to-a-component
   https://react.dev/learn/conditional-rendering
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring */
