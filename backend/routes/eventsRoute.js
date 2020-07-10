const express = require('express');
const router = express.Router();
const eventsData = require('../data/events');

router.get("", (req, res, next) => {
  console.log("/api/events");
  console.log(eventsData.length);
  console.log(req.query);
  let pKeyword;
  let results;
  if(typeof(req.query.keyword) !== 'undefined') {
    pKeyword = req.query.keyword;
    console.log(pKeyword);
    results = eventsData.filter(event => event.Title.indexOf(pKeyword) !== -1);
  }
  else {
    results = eventsData;
  }
  console.log('results:', results.length);
  res.json({message: 'Data fetched successfully!', eventsList: results, maxEvents: results.length});
});

router.get("/nearest/:location", (req, res, next) => {
  const pLocation = req.params.location;
  console.log("/api/events/nearest/", req.params.location);
  let results = eventsData.filter(event => event.Location.City.indexOf(pLocation) !== -1);
  console.log(results);
  res.json({message: 'Data fetched successfully!', eventsList: results, maxEvents: results.length});
});

module.exports = router;
