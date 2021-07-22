import axios from "axios";
import { useEffect, useState } from "react";
import { Link, withRouter, useHistory, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import './GameDetails.css'



const API = apiURL();
function GameDetails() {
  const [game, setgame] = useState([]);
  let history = useHistory();
  const { id } = useParams();

  const deleteGame = async () => {
    try {
      await axios.delete(`${API}/games/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const display = async () => {
      try {
        const res = await axios.get(`${API}/games/${id}`);
        console.log(res);
        setgame(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    display();
  }, [id]);

  const handleDelete = async () => {
    await deleteGame();
    history.push("/games");
  };
 

  return (
      <div className="list-container">
        <h1>game</h1>
      <h2>{game.name}</h2>
      <h3>{game.console}</h3>
      <h3>{game.price}</h3>
      <h4>{game.release_date}</h4>
      <h4>{game.favorite ? (
          <span>⭐️ Its a Favorite</span>
        ) : (
          <span className="notfav">X</span>
        )}</h4>
        <img>{game.box_image}</img>
      <Link to={`/games/${game.id}/edit`}>
      <button className="edit" type="button">
          Edit
      </button>
      </Link>
      <button  className="delete" onClick={handleDelete}>Delete</button>
      <Link to={`/games`}>
        <button  className="back" type="button">
          Go Back
        </button>
      </Link>

      </div>
  );
}

export default withRouter(GameDetails);