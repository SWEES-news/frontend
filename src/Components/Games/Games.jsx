import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddGameForm({ setError, fetchGames }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNumber = (event) => { setNumber(event.target.value); };

  const addGame = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/users', { name: name, numPlayers: number })
      .then(() => {
        setError('');
        fetchGames();
      })
      .catch(({response}) => {
        // console.log(error);
        setError(response.data.message);
      });
  };

  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="number">
        Number
      </label>
      <input type="number" id="number" value={number} onChange={changeNumber} />
      <button type="submit" onClick={addGame}>Submit</button>
    </form>
  );
}

function Games() {
  const [error, setError] = useState('');
  const [games, setGames] = useState([]);

  const fetchGames = () => {
    axios.get('http://localhost:8000/users')
    .then((response) => {
      const gamesObject = response.data.Data;
      const keys = Object.keys(gamesObject);
      const gamesArray = keys.map((key) => gamesObject[key]);
      setGames(gamesArray);
    }) // something good
    .catch(({ response }) => { 
      console.log(response);
      setError("something went wrong."); 
    }); //something bad
  };

  useEffect(
    fetchGames,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Games - but new
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
      <AddGameForm setError={setError} fetchGames={fetchGames} />
      {games.map((game) => (
        <div className="game-container">
          <h2>{game.name}</h2>
          <p>Players: {game.numPlayers}</p>
        </div>
      ))}
    </div>
  );
}

export default Games;