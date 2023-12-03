import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
} from "react-bootstrap";
import "./searchContainer.css";

const SearchContainer = ({
  handleSubmit,
  term,
  handleTermChange,
  handleMediaChange,
}) => {
  // Array with objects for each media type
  const mediaTypes = [
    { type: "All", value: "all" },
    { type: "E-book", value: "ebook" },
    { type: "Audio book", value: "audiobook" },
    { type: "TV show", value: "tvShow" },
    { type: "Short film", value: "shortFilm" },
    { type: "Movie", value: "movie" },
    { type: "Music", value: "music" },
    { type: "Music video", value: "musicVideo" },
    { type: "Podcast", value: "podcast" },
    { type: "Software", value: "software" },
  ];

  return (
    <div className="search-container">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="form-group search-box">
          <FormControl
            type="text"
            className="search-bar"
            placeholder="Search here..."
            name="term"
            value={term}
            onChange={handleTermChange}
          />
        </FormGroup>
        <FormGroup className="form-group filter">
          <FormSelect onChange={handleMediaChange}>
            {mediaTypes.map((mediaType) => (
              <option key={mediaType.value} value={mediaType.value}>
                {mediaType.type}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="submit-btn">
          <Button variant="secondary" type="submit">
            Search
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SearchContainer;
