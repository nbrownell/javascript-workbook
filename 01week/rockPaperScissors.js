'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function rockPaperScissors(hand1, hand2) {

  // create a sanitized array of the two hands
  const handArr = [hand1, hand2].map((n) => n.toLowerCase().replace(/\s/g, ''));

  // if hand 1 and hand 2 are the same, we can skip the rest of the logic
  if (handArr[0] === handArr[1]) return 'It\'s a tie!';

  // if it's not a tie, then see who won
  // start by defining the winning scenarios for hand 1
  const hand1Wins = [
    ['paper', 'rock'],
    ['rock', 'scissors'],
    ['scissors', 'paper']
  ];

  // the winning scenarios for hand 2 are the same as hand 1, but reversed
  // use JSON parsing hack to deep-copy hand 1 and flip-flop the arrays within
  const hand2Wins = JSON.parse(JSON.stringify(hand1Wins));
  hand2Wins.map((n) => n.reverse());

  // check our hand array against each of the winning hand 1 scenarios
  for (let scenario of hand1Wins) {
    if (scenario.join() === handArr.join()) {
      return 'Hand one wins!';
    }
  }

  // do the same check but for the hand 2 scenarios
  for (let scenario of hand2Wins) {
    if (scenario.join() === handArr.join()) {
      return 'Hand two wins!';
    }
  }

}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
