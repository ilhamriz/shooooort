import React from 'react'
import ReactTimeAgo from 'react-time-ago'

function Table({ shortenedLinks, urlAPI, highlight }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>LINK</th>
            <th>VISITS</th>
            <th>LAST VISITED</th>
          </tr>
        </thead>
        <tbody>
          {shortenedLinks.reverse().map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className={`highlight ${highlight && index === shortenedLinks.length-1 ? '': 'hidden'}`} />
                  <section>
                    <p className='shortcode' onClick={()=>{navigator.clipboard.writeText(`${urlAPI}/${value.shortcode}`)}}>shooooort.com/<span className='color-accent'>{value.shortcode}</span></p>
                    <span className='copy-text color-accent'>Click to copy this link</span>
                  </section>
                  <p className='url-body'>{value.url.length > 50 ? value.url.slice(0,50)+"..." : value.url}</p>
                </td>
                <td>{value.visits}</td>
                <td>{value.visits > 0 ?
                    <ReactTimeAgo date={value.lastSeen.getTime()} locale="en-US" /> : value.lastSeen}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
