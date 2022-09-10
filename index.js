const dummyData=require('./dummyData.js');
const express=require('express');
const app=express();
const PORT=3000;

// importing other modules
app.use(express.static('public'));

// here we're creating an error handler
function errorHandler(err, req, res, next) {
  console.log(err.stack);
	res.status(404).send('Something went horribly, terribly wrong...');
}

app.get('/health',(req,res)=>{
    res.send('Server is online!');
})

// endpoint for entire array
app.get('/songs',(req,res)=>{
    const songData=dummyData.list();
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
                <a href="/songs/${song.id}/"><b>${song['Track.Name']}</b> by ${song['Artist.Name']}</a>
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
app.get('/songs/:songId',(req,res)=>{
    const songId=req.params.songId;
    const song = dummyData.find(songId);
    if (!song.id){
      throw new Error(`Song with ID:${songId} not found.`)
    }else{
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
    };
});

// using the error handler as middleware
app.use(errorHandler);

// telling Node to listen up
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});