import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import "../Styles/GameDetails.css";

const API = apiURL();

const ShowGameReviews = ({ review, handleDeleteReview }) => {
  const { id } = useParams();

  const deleteReview = async () => {
    try {
      await axios.delete(`${API}/games/${id}/reviews/${review.id}`);
    } catch (error) {
      return error;
    }
  };

  const handleDelete = async () => {

    await deleteReview();
    handleDeleteReview(review.id)
  
  };
  return (
    <li>
      <div>
        <h3>{review.title}</h3>
        <h4>by {review.reviewer}</h4>
        <p>{review.content}</p>
        <p>Rating: {review.rating}</p>
        <button>Edit Review</button>
        <button onClick={handleDelete}>Delete Review</button>
      </div>
      <hr />
    </li>
  );
};

export default ShowGameReviews;
