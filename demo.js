const word = require('./word');
var a = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

word.words().then(value =>{
  //console.log(value.data)
  a[0] = value.data;
  a[0].flag = false

  //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
  word.words().then(value =>{
    //console.log(value.data)
    a[1] = value.data;
    a[1].flag = false
    a[1].word = a[0].word;
    a[1].results = a[0].results;
    a[1].correct = false;
    //console.log(a[1].results[0].synonyms[0]);
    //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
    word.words().then(value =>{
      //console.log(value.data)
      a[2] = value.data;
      a[2].flag = false
      //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
      word.words().then(value =>{
        //console.log(value.data)
        a[3] = value.data;
        a[3].flag = false
        //sendQuickReply(senderID,value.data.word,value.data.results[0].definition)
        var correct = getRandomInt(4);
        a[correct].flag = true;
        if(correct === 1){
          a[1].correct = true;
        }
        console.log(correct);
        console.log(a);
      })
    })
  })
})


//console.log(a);
