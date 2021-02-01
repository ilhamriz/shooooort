import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ListShortenLink from "./components/ListShortenLink";
import Table from "./components/Table";

function App() {
  const [shortenedLinks, setshortenedLinks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const [temp, setTemp] = useState([]);


  const [link, setLink] = useState({ url: "" });
  const [highlight, sethighlight] = useState(false);
  // const [statsURL, setStatsURL] = useState([{visits:0, lastSeen: '-'}]);
  const url = "https://cors-anywhere.herokuapp.com/https://impraise-shorty.herokuapp.com";
  const urlAPI = 'https://impraise-shorty.herokuapp.com';

  useEffect(() => {
    const localData = localStorage.getItem("shortenedLinks");
    return localData ? (setshortenedLinks(JSON.parse(localData)), setIsFetching(true)) : null;
  }, []);

  const submitLinks = (event) => {
    event.preventDefault();

    let data = {
      url: link.url,
      shortcode: "DNEPRg",
    };

    setshortenedLinks([...shortenedLinks, data]);
    setLink({ url: "" });
    sethighlight(true);
    setIsFetching(true);

    // axios.post(`${url}/shorten`, link)
    //   .then(response => {
    //     let shortcode = response.data.shortcode;

    //     const data = {
    //       url: link.url,
    //       shortcode: shortcode
    //     };

    //     setshortenedLinks([...shortenedLinks, data]);
    //     setLink({ url: '' });
    //     sethighlight(true);
    //     setIsFetching(true);
    //   })
    //   .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   console.log('masuk: ', temp);
  // }, [temp])

  async function getStatsURL() {
    let tempData = { visits: 0, lastSeen: '-' };
    let coba = [];

    await shortenedLinks.reverse().map(async(item) => {
      // console.log('item: ', item);

      // const response = await new Promise((resolve, reject) => {
      //   axios.get(`${url}/${item.shortcode}/stats`)
      //     .then(response => {
      //       resolve(response)
      //     })
      //     .catch();
      // })

      // let lastSeen = response.data.redirectCount > 0 ? new Date(`${response.data.lastSeenDate}`): '-';
      // let visits = response.data.redirectCount;

      // tempData = { ...item, visits: visits, lastSeen: lastSeen }
      tempData = { ...item, visits: 0, lastSeen: '7 minutes ago' }
      coba.push(tempData);
      await setTemp([...coba]);
    });

    await setIsFetching(false)
  }

  useEffect(() => {
    if (isFetching) {
      getStatsURL();
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
    setTemp([]);
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
        <input type="submit" value="Shorten this link" disabled={!link.url} />
      </form>

      {shortenedLinks.length > 0 ? 
        <div className={`list-shortened-link`}>
          <div className="section-heading">
            <h2>Previously shortened by you</h2>
            <span className='color-accent' onClick={clearLocalStorage}>Clear history</span>
          </div>

          <Table shortenedLinks={temp} highlight={highlight} urlAPI={urlAPI}/>
        </div>
        : null}

      
    </div>
  );
}

export default App;
