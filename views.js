const html=require('html-template-tag');

function listSongs(songData){
    return html`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Song DB</title>
        <link rel='stylesheet' href='/style.css'/>
    </head>
    <body>
        <div id="mainContainer">
        <h1 id="mainTitle">Songs</h1>
        <div id='songListContainer'>
            ${songData.map(
            (song) =>
                `
                <div class='songContainer'>
                <a href="/songs/${song.id}/"><b>${song['Track.Name']}</b> by ${song['Artist.Name']}</a>
                <p>${song.Genre}</p>
                </div>
                `
            )};
        </div>
        </div>
    </body>
    </html>
    `
};

function songDetails(song){
    return html`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Song DB</title>
      <link rel='stylesheet' href='/style.css'/>
    </head>
    <body>
      <div class='songDetailsContainer'>
        <h1 id="songTitle">${song['Track.Name']}</h1>
        <h3>${song['Artist.Name']}</h3>
        <ul>
          <li><b>Genre:</b> ${song.Genre}</li>
          <li><b>BPM:</b> ${song['Beats.Per.Minute']}</li>
          <li><b>Energy:</b> ${song.Energy}</li>
        </ul>
      </div>
    </body>
    </html>
    `;
};

function errorHandler(err){
    return html`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Song DB</title>
      <link rel='stylesheet' href='/style.css'/>
    </head>
    <body>
      <p>${err.message}</p>
      <img src="/fine.gif" />
    </body>
    </html>
    `
};

module.exports={
    listSongs:listSongs,
    songDetails:songDetails,
    errorHandler:errorHandler
};