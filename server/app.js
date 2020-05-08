
/*AIzaSyCF-YHpaFFWjAqocDxuE2ZKswlnvWKxUwA
AIzaSyA-juEsjYINuLY9viYoRd25Wc7bL3Nhoyk */
'use strict'
const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
var cors = require("cors");

const app = express()
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req,res) {
	//console.log(req.params);
	console.log("in get");
	res.send(`${req.lat}`);
	
});

/* 
{ business_status: 'OPERATIONAL',
  geometry:
   { location: { lat: 38.8526129, lng: -77.32727299999999 },
     viewport: { northeast: [Object], southwest: [Object] } },
  icon:
   'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
  id: '292b50c895934b60f747b5b6a794e6dd839f32ca',
  name: 'Chipotle Mexican Grill',
  opening_hours: { open_now: false },
  photos:
   [ { height: 3024,
       html_attributions: [Array],
       photo_reference:
        'CmRaAAAAwsuivUfZeN6dpRvl14o8ITVQJvgPGx2_jIfVt0xD06xyBuhro4x21F8oS4B9WJ3yzAHXwB_th9dHoZpSSMSSEweZzlhKLcDC5XGdLs0kxes6lTihmLnuZ4nkyyt8G0GiEhCCz097ooCmeSZMh4sdBmwCGhQ8YWWCKSmrJTETNMTU6f78MHpmMg',
       width: 4032 } ],
  place_id: 'ChIJnd-NSuFOtokR5PGoq_W4BQI',
  plus_code:
   { compound_code: 'VM3F+23 Fairfax, Virginia',
     global_code: '87C4VM3F+23' },
  price_level: 1,
  rating: 4.1,
  reference: 'ChIJnd-NSuFOtokR5PGoq_W4BQI',
  scope: 'GOOGLE',
  types:
   [ 'restaurant', 'food', 'point_of_interest', 'establishment' ],
  user_ratings_total: 322,
  vicinity: '11062 Lee Hwy, Fairfax' }
*/
app.post('/', function(req, res) {
	console.log("in Post");
	console.log(req.body);

	let lat = req.body.lat;
	let long = req.body.long;
	let radius = 40233;

	axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=restaurant&name=chipotle&key=AIzaSyCF-YHpaFFWjAqocDxuE2ZKswlnvWKxUwA`)
	.then (
		(chipotleRes) => {
		 console.log("FETCHED"); 
		 let nearest = chipotleRes.data.results[0];
		 if (nearest) {
		 	let open = nearest.opening_hours.open_now;
		 	console.log("working or not?");
		 	(open) ? (res.send("Yes")) : (res.send("No"));

		 }
		 else {
		 	res.send(`No Chipotle within ${radius / 40233} miles`);
		 }
		},
		(error) => {
			console.log(`ERROR: error`);
		}
	);
});

app.listen(8080, function (err) {
	console.log("listening port 8080");
});