const word = require('./word');
var a=[];
var b = [0,1,2,3];
console.log(b);
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
        console.log(correct);
        let i = 0
        while(b != undefined){
        if(correct === b[i]){
          let temp = b[i];
          b[0] = temp;
          b[i] = 0;
          break;
        }
        else{
            i++;
        }
        }
        a[correct].flag = true;
        console.log(b);
        console.log(a);
      })
    })

  })

})

//console.log(a);
