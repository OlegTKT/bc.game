var config = {
  bet: { label: "bet profit(Min allowed amount / split)", value: 0.002, type: "number" },
  splitSize: { label: "Size of Split", value: 20, type: "number" },
  cycleSize: { label: "Maximum number of Cycles", value: 200, type: "number" },
  payout: { label: "payout", value: 2.1, type: "number" },

};

var betAmount = 0;
var iterationCount = 0;
var betCount = 0;

function createArray(profit,splitSize){
  var item = strip(profit/splitSize);
  var splits = [];
  for (var i=0;i<splitSize; i++){
    splits.push(item);
  }
  return splits;

}
var bettingArray;
function main() {
  bettingArray = createArray(config.bet.value,config.splitSize.value);
  betAmount = strip(bettingArray[0] + bettingArray[bettingArray.length-1]);
  
  game.onBet = function() {
    game.bet(betAmount, config.payout.value).then(function(payout) {
      betCount++;
      var message = betAmount + " NewBet" + betAmount + 
        " Bets Remaining[" + bettingArray.length + "]";
      if (payout > 1) {
        log.success(iterationCount + " Won! " +  message);
        console.log(iterationCount + " Won! " + betAmount);
        bettingArray.shift();
        bettingArray.pop();
      } else {
        bettingArray.push(betAmount);
        log.error("Lost!  " + message);
        console.log("Lost!  " + betAmount);
      }
      if(bettingArray.length == 0 || betCount == config.cycleSize.value){
        console.log("Resetting the bet!");
        bettingArray = createArray(config.bet.value,config.splitSize.value);
        iterationCount++;
        betCount = 0;
        clearConsoleLog();
      }
      if(bettingArray.length == 1){
        betAmount = bettingArray[0];
      }else{
        betAmount = strip(bettingArray[0] + bettingArray[bettingArray.length-1]);
      }
      
      console.log(betCount + " NewBet" + betAmount + 
        " BettingAray[" + bettingArray.length + "]" +
        bettingArray.join(" "));
      
    });
  };
}

function clearConsoleLog(){ 
  
  console.log("Restarting!"); 
}
function strip(number) {
    return (parseFloat(number).toPrecision(10))/1;
}