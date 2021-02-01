import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import {BeatLoader} from 'react-spinners'

function App() {
  const [shortenedLinks, setshortenedLinks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsURL, setStatsURL] = useState([]);
  const [link, setLink] = useState({ url: "" });
  const [highlight, sethighlight] = useState(false);

  const url = "https://cors-anywhere.herokuapp.com/https://impraise-shorty.herokuapp.com";
  const urlAPI = 'https://impraise-shorty.herokuapp.com';

  useEffect(() => {
    const localData = localStorage.getItem("shortenedLinks");
    return localData ? (setshortenedLinks(JSON.parse(localData)), setIsFetching(true)) : null;
  }, []);

  const submitLinks = (event) => {
    event.preventDefault();
    setLoading(true);

    axios.post(`${url}/shorten`, link)
      .then(response => {
        const data = {
          url: link.url,
          shortcode: response.data.shortcode
        };

        setshortenedLinks([...shortenedLinks, data]);
        setLink({ url: '' });
        sethighlight(true);
        setIsFetching(true);
      })
      .catch(err => console.log(err));
  };

  async function getStatsURL() {
    let tempData = { visits: 0, lastSeen: '-' };
    let tempArray = [];

    await shortenedLinks.map(async (item) => {
      
      const response = await new Promise((resolve, reject) => {
        axios.get(`${url}/${item.shortcode}/stats`)
          .then(response => {
            resolve(response)
          })
          .catch(err => console.log(err));
      })

      let lastSeen = response.data.redirectCount > 0 ? new Date(`${response.data.lastSeenDate}`): '-';
      let visits = response.data.redirectCount;

      tempData = { ...item, visits: visits, lastSeen: lastSeen }
      tempArray.push(tempData);
      await setStatsURL([...tempArray]);
    });

    await setIsFetching(false)
  }

  useEffect(() => {
    if (isFetching) {
      getStatsURL();      
      setLoading(false);
      localStorage.setItem("shortenedLinks", JSON.stringify(shortenedLinks));
    }
  }, [isFetching]);

  const handleInput = (event) => {
    let link = event.target.value;
    setLink({ url: link });
    event.preventDefault();
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setshortenedLinks([]);
    setStatsURL([]);
  };

  return (
    <div className="App">
      <div className="title-container">
        <h1>
          <u>Shooooort</u>
        </h1>
        <span>The link shortener with a long name</span>
      </div>

      <form onSubmit={submitLinks} className="form-container">
        <input
          type="url"
          value={link.url}
          onChange={handleInput}
          placeholder="Paste the link you want to shorten here"
          required
        />
        <button type='submit' disabled={!link.url}>
          {loading ? <BeatLoader loading={loading} size={7} color={"#FFFFFF"}/> : "Shorten this link"}
        </button>
      </form>

      {shortenedLinks.length > 0 ? 
        <div className={`list-shortened-link`}>
          <div className="section-heading">
            <h2>Previously shortened by you</h2>
            <span className='color-accent' onClick={clearLocalStorage}>Clear history</span>
          </div>

          <Table shortenedLinks={statsURL} highlight={highlight} urlAPI={urlAPI}/>
        </div>
        : null}      
    </div>
  );
}

export default App;
