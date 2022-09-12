const express=require('express');
const volleyball = require('volleyball');
const morgan = require('morgan');
const views=require('./views');

const app=express();
const PORT=3000;
const dummyData=require('./dummyData.js');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(volleyball);

// end point for health of server
app.get('/health',(req,res)=>{
    res.send('Server is online!');
})

// endpoint for entire array
app.get('/songs',(req,res)=>{
  const songData=dummyData.list();
  const html = views.listSongs(songData);
  res.send(html);
});

// endpoint for a single song
app.get('/songs/:songId',(req,res)=>{
  const songId=req.params.songId;
  const song = dummyData.find(songId);
  if (!song.id){
    throw new Error(`Song with id ${songId} not found`)
  }else{
    const html = views.songDetails(song);
    res.send(html);
  };
});

// creating a new route that will throw an error to test the error handler
app.get('/error',(req,res)=>{
  throw new Error('You have found a lovely new error!');
});

// catching any undefined routes

//app.get('*', (req, res)=>{
//  throw new Error('Page not found.');
//});

app.use((req, res, next)=>{
  if(!req.route) throw new Error('Page not found');  
});

// using the error handler as middleware
app.use((err, req, res, next)=>{
  console.log(err);
  const html=views.errorHandler(err);
	res.status(404).send(html);
});

// telling Node to listen up
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
});