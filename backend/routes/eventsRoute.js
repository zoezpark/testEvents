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
    results = eventsData.filter(event => event.Title.toLowerCase().indexOf(pKeyword.toLowerCase()) !== -1);
  }
  else {
    results = eventsData;
  }
  console.log('results:', results.length);
  res.json({message: 'Data fetched successfully!', events: results, maxEvents: results.length});
});

router.get("/:title", (req, res, next) => {
  console.log("/api/events/", req.params.title);
  let pTitle;
  let result;
  if(typeof(req.params.title) !== 'undefined') {
    pTitle = req.params.title;
    console.log(pTitle);
    result = eventsData.filter(event => event.Title.toLowerCase().indexOf(pTitle.toLowerCase()) !== -1);
    res.status(200).json(result);
  }
  else {
    res.status(404).json({ message: "Event not found!" });
  }
});

router.get("/nearest/:location", (req, res, next) => {
  const pLocation = req.params.location.toLowerCase();
  console.log("/api/events/nearest/", req.params.location);
  let results = eventsData.filter(event => event.Location.City.toLowerCase().indexOf(pLocation) !== -1 || event.Location.State.toLowerCase().indexOf(pLocation) !== -1|| event.Location.Country.toLowerCase().indexOf(pLocation) !== -1);
  console.log(results);
  res.json({message: 'Data fetched successfully!', events: results, maxEvents: results.length});
});

module.exports = router;
