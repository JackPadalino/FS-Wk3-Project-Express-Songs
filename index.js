const songData=require('./dummyData.js');
const express=require('express');
const app=express();
const PORT=3000;

// importing other modules
app.use(express.static('public'));

app.get('/health',(req,res)=>{
    res.send('Server is online!');
})

// endpoint for entire array
app.get('/songs',(req,res)=>{
    const html = `
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
                <p><b>${song['Track.Name']}</b> by ${song['Artist.Name']}</p>
                <p>${song.Genre}</p>
              </div>
              `
          ).join('')}
        </div>
      </div>
    </body>
    </html>
    `;
    res.send(html);
});

// endpoint for a single song
app.get('/songs/:songIndex',(req,res)=>{
    const songIndex=req.params.songIndex;
    const song=songData[songIndex];
    const html = `
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
   res.send(html);
});

// telling Node to listen up
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});