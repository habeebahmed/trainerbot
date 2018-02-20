const request = require('request');
request({
    headers: {
      'X-Mashape-Key': 'mUD6p2ZBC8mshT0pqFxU6SAnuO1Xp1wcAnujsnpSPLKiDoHvn4',
      'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
    },
    uri: 'https://wordsapiv1.p.mashape.com/words/?random=true&hasDetails=examples',
    method: 'GET'
  }, function (err, res) {
    //it works!

    result = JSON.parse(res.body)
    console.log(result);
    console.log('\n\n');
    result2 = JSON.parse(res.body)
    console.log(result2.results);

  });
