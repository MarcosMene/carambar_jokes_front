import './App.css';
import axios from 'axios';
import logo from './carambar_logo.png';

import React, { useEffect, useState } from 'react';

function Jokes() {
  //show hide aswer
  const [isVisible, setIsVisible] = useState(false);

  //state for jokes
  const [jokes, setJokes] = useState([]);

  const FetchJoke = async () => {
    try {
      const response = await axios.get('https://carambar-jokes-api-xbz1.onrender.com/blagues/random');
      setJokes(response.data);
      setIsVisible(false);
    } catch (error) {
      console.error('Error fetching joke', error);
    }
  };

  //call fetchJoke one time []
  useEffect(() => {
    FetchJoke();
  }, []);

  return (
    <>
      <div className='app'>
        <h1>Les blagues</h1>
        <img src={logo} alt='Logo' />

{/* show jokes  */}
        {jokes ? (
          <div className='card'>
            <h2>{jokes.text}</h2>

            <div
              className='answer_joke'
              style={{ display: isVisible ? 'block' : 'none' }}
            >
              <p>{jokes.answer}🤣</p>
            </div>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className='btn answer'
            >
              La reponse
            </button>
          </div>
        ) : (
          // show loading while rearch joke
          <p>Loading...</p>
        )}

        <button className='btn new_question' onClick={FetchJoke}>
          Nouvelle blague
        </button>
      </div>
    </>
  );
}

export default Jokes;
