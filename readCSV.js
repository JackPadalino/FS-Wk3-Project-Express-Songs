/*
Follow this post to turn a CSV file into an array of objects:
https://sebhastian.com/read-csv-javascript/
*/

const fs=require('fs');
const {parse}=require('csv-parse');

const filePath='/Users/snerd/desktop/top50.csv'

fs.createReadStream(filePath);

// Read the CSV file and turn it into an array of objects
const data = [];

fs.createReadStream(filePath)
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // log the result array
    console.log("parsed csv data:");
    console.log(data);
  });