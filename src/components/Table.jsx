import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'

function Table({ shortenedLinks, urlAPI, highlight }) {
  return (
    <>
      <div className={`highlight ${highlight ? '': 'hidden'}`} />
      <table>
        <thead>
          <tr>
            <th>LINK</th>
            <th>VISITS</th>
            <th>LAST VISITED</th>
          </tr>
        </thead>
        <tbody>
          {shortenedLinks.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  <section>
                    <p className='shortcode' onClick={()=>{navigator.clipboard.writeText(`${urlAPI}/${value.shortcode}`)}}>shooooort.com/<span className='color-accent'>{value.shortcode}</span></p>
                    <span className='copy-text color-accent'>Click to copy this link</span>
                  </section>
                  <p className='url-body'>{value.url}</p>
                </td>
                <td>{value.visits}</td>
                <td>{value.visits > 0 ?
                    <ReactTimeAgo date={value.lastSeen.getTime()} locale="en-US" /> : value.lastSeen}</td>
                {/* <td>{statsURL.length === 0  ? '0' : statsURL[index].visits}</td>
                <td>{statsURL.length === 0  ? '-' : statsURL[index].visits > 0 ?
                    <ReactTimeAgo date={statsURL.lastSeen.getTime()} locale="en-US" /> : statsURL[index].lastSeen}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
