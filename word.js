const axios = require('axios');
var value;
require('dotenv').config({ path: 'variables.env'});

var words = async ()=>{

var response = await axios.get('https://wordsapiv1.p.mashape.com/words/?random=true&hasDetails=examples', {
      headers: {
        'X-Mashape-Key': process.env.MashapeKey,
        'X-Mashape-Host': process.env.MashapeHost
      }
    })
  //console.log(response.data)
  return response

    }
  
module.exports.words = words
