const axios = require('axios');
var value;
require('dotenv').config({ path: 'variables.env'});
var response
var words = async ()=>{
response = await axios.get('https://wordsapiv1.p.mashape.com/words/?random=true&hasDetails=synonyms', {
      headers: {
        'X-Mashape-Key': process.env.MashapeKey,
        'X-Mashape-Host': process.env.MashapeHost
      }
    })
  //console.log(response.data)
  return response

    }
/*words().then(value =>{
  console.log(value.data);
  console.log(value.data.results[0].synonyms);
})*/


module.exports.words = words
