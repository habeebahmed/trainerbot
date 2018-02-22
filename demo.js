const word = require('./word');
var a=[];
var i=0;
var b = [0,1,2,3];
console.log(b);
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
start:
while(true){

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
        a[correct].flag = true;
        console.log(correct);
        console.log(a);
      })
    })

  })

})
i++;
if (i < 3){
  continue start
}
else{
  break;
}

}
//console.log(a);
