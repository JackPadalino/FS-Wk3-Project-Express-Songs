const songData=require('./dummyData.js');
const express=require('express');
const app=express();
const PORT=3000;
const songs=songData.list();

console.log(songs);