import express from "express";

const router = express.Router();

// Create array to contain objects.
let favorites = [];

// Handler for GET request
const getFavoritesHandler = (req, res) => {
  if (favorites.length === 0) {
    res.send({
      message: "You have no favorites to display",
    });
  } else {
    res.send({
      favorites,
    });
  }
};

// Display all items in favorites array
router.get("/", getFavoritesHandler);

// Handler for POST request
const postFavoritesHandler = (req, res) => {
  const id = Math.floor(100000 + Math.random() * 900000);
  newItem = Object.assign(req.body);
  favorites.push(newItem);
  return res.send({
    message: "Item added successfully",
    favorites,
  });
};

// Add item to favorites array
router.post("/add", postFavoritesHandler);

// Handler for DELETE request
const deleteFavoritesHandler = (req, res) => {
  const id = Number(req.params.id);
  // Loop through the items and splice specified item
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) {
      favorites.splice(i, 1);
    }
  }
  // Display message and all items
  res.send({
    message: `Item with id ${id} has been deleted`,
    favorites,
  });
};

// Remove item from favorites
router.delete("/delete/:id", deleteFavoritesHandler);

export default router;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
