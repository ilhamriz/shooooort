import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'

function ListShortenLink({
  url,
  shortcode,
  highlight
}) {
  // const [statsURL, setStatsURL] = useState(new Date("2021-01-30T04:52:34+00:00"));
  const [statsURL, setStatsURL] = useState({});
  // const temp = {lastSeenDate: "2021-01-30T04:53:06+00:00", redirectCount: 1, startDate: "2021-01-30T04:52:34+00:00"}

  useEffect(() => {
    getStatsURL()
  }, []);

  function getStatsURL() {
    const url = 'https://cors-anywhere.herokuapp.com/https://impraise-shorty.herokuapp.com';

    // axios.get(`${url}/${listShortcode.shortcode}/stats`)
    //   .then(response => {
    //     console.log('getAPI : ', response.data);
    //     if (response.data.redirectCount > 0) {          
    //       let lastSeen = new Date(`${response.data.lastSeenDate}`);
    //       setStatsURL({visits: response.data.redirectCount, lastSeen: lastSeen});
    //     }
    //     else {
    //       setStatsURL({visits: response.data.redirectCount, lastSeen: '-'});
    //     }
    //   })
    //   .catch();
  }
  return (
    <>
      <div className={`highlight ${highlight ? '': 'hidden'}`} />
        <section>
          <p>{shortcode}</p>
          <span>Click to copy</span>
        </section>
        <p>{url}</p>
    </>
    // <tr>
    //   <td>
    //     <div className={`highlight ${highlight ? '': 'hidden'}`} />
    //     <section>
    //       <p>{shortcode}</p>
    //       <span>Click to copy</span>
    //     </section>
    //     <p>{url}</p>
    //   </td>
    //   <td>{statsURL.visits}</td>
    //   <td>{statsURL}</td>
    //   <td>{statsURL.visits !== 0 ?
    //     <ReactTimeAgo date={statsURL.lastSeen.getTime()} locale="en-US" /> : statsURL.lastSeen}
    //   </td>
    // </tr>
  )
}

export default ListShortenLink