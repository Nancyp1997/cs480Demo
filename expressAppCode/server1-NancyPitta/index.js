const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: process.env['host'],
  user: process.env['username'],
  password: process.env['password'],
  database: process.env['database_name'],
  multipleStatements: true
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected with App...');
});

/**
 * Get All Items
 *
 * @return response()
 */

// app.get('/api/stockswatchlist', (req, res) => {
app.get('/api/stockswatchlist/:ticker', (req, res) => {
  let sqlQuery = "select ticker,price_date,open_price,round(close_price,1) as close_price, high_price from daily_price join security on daily_price.ticker_id=security.id  where  ticker like '" + req.params.ticker + "' order by price_date desc limit 1;";


  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});


// Get all stocks in decreasing order of time.
app.get('/api/stocks', (req, res) => {
  let sqlQuery = "select ticker,price_date, open_price, close_price,high_price from daily_price join security on daily_price.ticker_id=security.id  order by daily_price.price_date desc limit 3";


  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(results[0]);
    res.send(apiResponse(results));
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
// Get all data related to a single stock
app.get('/api/stocks/:ticker', (req, res) => {
  let sqlQuery = "select price_date,round(close_price,1) as close_price from daily_price join security on daily_price.ticker_id=security.id  where  ticker like '" + req.params.ticker + "' order by price_date asc;";

  // let sqlQuery = "select price_date,close_price from daily_price join security where ticker like '" + req.params.ticker + "' limit 1000";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(apiResponse(results));
  });
});


//Get real time data
app.get('/api/realtime/:ticker', (req, res) => {
  var request = require('request');

  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + req.params.ticker + '&interval=5min&apikey=H144IFU0KMLV9OC1';

  request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
  }, (err, res1, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      res.send(apiResponse(data["Time Series (5min)"]));
    }
  });
});


// Search company by name
app.get('/api/stocks/:company_name', (req, res) => {
  let sqlQuery = "select exchange_id, ticker, name, sector, industry  from security where LOWER(name) like '%" + req.params.company_name + "%'";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// A new company getting listed on NYSE
app.post('/api/company', (req, res) => {
  let data = {
    exchange_id: req.body.exchange_id,
    ticker: req.body.ticker,
    name: req.body.name,
    sector: req.body.sector,
    industry: req.body.industry
  };
  // console.log(data['title']);
  // exchaneg ID, ticker,name, sector, industry
  let sqlQuery = "INSERT INTO security SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

//Update a company's name due to rebranding changes
//Can only update company name and sector but not ticker symbol
app.put('/api/company/:ticker', (req, res) => {
  let sqlQuery = "UPDATE security SET name='" + req.body.name + "', sector=" + req.body.sector + ", industry=" + req.body.industry + " WHERE ticker LIKE " + req.params.ticker;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});


//Get top performing stocks across all sectors and exchanges
app.get('/api/stocks_toprow/:sector', (req, res) => {
  var sector = "Technology"
  if (req.params.sector != undefined) {
    sector = req.params.sector;
  }
  let sqlQuery = "select ticker,price_date, open_price, close_price,high_price, volume from daily_price join security on daily_price.ticker_id=security.id where  sector like '" + req.params.sector + "'order by price_date,open_price desc limit 4";
  console.log(sqlQuery);
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});


/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ "status": 200, "error": null, "response": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});

