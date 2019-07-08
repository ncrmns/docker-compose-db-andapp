'use strict'
const express = require('express');
const app = express();
const PORT = 1234;
const mysql = require('mysql');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

const  conn = mysql.createConnection({
    host: 'db',
    user: 'ncrmns',
    password: 'root',
    database: 'auctiondb'
  });


app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/api/items', (req, res) => {
  getAllAuctions()
    .then(auctions => res.status(200).json(auctions))
    .catch(err => res.status(500).json(err));
});

app.post('/api/items/:id/bids', (req, res) => {
  requestAmountAndTimeById(req.params.id)
    .then(amountandtime => {
      Math.floor(Date.now() / 1000) >= amountandtime.expiryDate ?
        res.json({ message: 'The auction is over!' })
        :
        req.body.amount <= amountandtime.highestBid ?
          res.json({ message: 'Your bid is below the highest bid!' })
          :
          updateDbWithBid(req.params.id, req.body)
            .then(() => res.status(200).json({ message: 'Successful!' }))
            .catch(err => res.status(500).json(err));
    });
});

app.listen(PORT, () => console.log('Server is listening on port: ' + PORT));

function getAllAuctions() {
  return new Promise((resolve, reject) => {
    conn.query(
      'SELECT * FROM auctions;',
      (err, auctions) => {
        if (err)
          reject(err);
        else
          resolve(auctions);
      }
    )
  });
}

function requestAmountAndTimeById(id) {
  return new Promise((resolve, reject) => {
    conn.query(
      'SELECT highestBid, expiryDate FROM auctions WHERE id=?;',
      [id],
      (err, data) => {
        if (err)
          reject(err);
        else
          resolve(data[0]);
      }
    )
  });
}

function updateDbWithBid(id, nameandbid) {
  return new Promise((resolve, reject) => {
    conn.query(
      'UPDATE auctions SET highestBid = ?, highestBidderName = ? WHERE id=?;',
      [nameandbid.amount, nameandbid.name, id],
      (err) => {
        if (err)
          reject(err);
        else
          resolve();
      });
  });
}

module.exports = {app, conn};