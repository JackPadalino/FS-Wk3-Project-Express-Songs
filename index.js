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
      <h1 id="mainTitle">Songs</h1>
      <ul>
        ${songData.map(
          (song) =>
            `<li><b>${song['Track.Name']}</b> by ${song['Artist.Name']}</li>`
        ).join('')}
      </ul>
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
      <h1 id="mainTitle">${song['Track.Name']}</h1>
      <h3>by ${song['Artist.Name']}</h3>
      <ul>
        <li>Genre: ${song.Genre}</li>
        <li>BPM: ${song['Beats.Per.Minute']}</li>
        <li>Energy: ${song.Energy}</li>
      </ul>
    </body>
    </html>
    `;
   res.send(html);
});

// telling Node to listen up
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});