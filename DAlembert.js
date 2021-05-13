var config = {
  bet: { label: "bet profit", value: 0.002, type: "number" },
  splitSize: { label: "Size of Split", value: 20, type: "number" },
  cycleSize: { label: "Maximum number of Cycles", value: 150, type: "number" },
  payout: { label: "payout", value: 2.4, type: "number" },

};

var betAmount = 0;
var iterationCount = 0;
var betCount = 0;

function createArray(profit,splitSize){
  var item = profit/splitSize;
  var splits = [];
  for (var i=0;i<splitSize; i++){
    splits.push(item);
  }
  return splits;

}
var bettingArray;
function main() {
  bettingArray = createArray(config.bet.value,config.splitSize.value);
  betAmount = bettingArray[0] + bettingArray[bettingArray.length-1];
  
  game.onBet = function() {
    game.bet(betAmount, config.payout.value).then(function(payout) {
      betCount++;
      if (payout > 1) {
        log.success(iterationCount + " Won! " + betAmount);
        bettingArray.shift();
        bettingArray.pop();
      } else {
        bettingArray.push(betAmount);
        log.error("Lost!  " + betAmount);
      }
      if(bettingArray.length == 0 || betCount == config.cycleSize.value){
        bettingArray = createArray(config.bet.value,config.splitSize.value);
        iterationCount++;
        betCount = 0;
      }
      if(bettingArray.length == 1){
        betAmount = bettingArray[0];
      }else{
        betAmount = bettingArray[0] + bettingArray[bettingArray.length-1];
      }
      log.info(betCount + " NewBet" + betAmount + 
        " BettingAray[" + bettingArray.length + "]" +
        bettingArray.join(" "));
      
    });
  };
}
//document.getElementsByClassName("logs")[0].innerHTML="";