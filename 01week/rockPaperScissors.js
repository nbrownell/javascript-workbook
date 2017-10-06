'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function rockPaperScissors(hand1, hand2) {

  // create an array of the two hands for easier manipulation
  let handArr = [hand1, hand2];

  // declare an array of accepted hand values
  const validHands = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  
  // attempt to sanitize the inputs and check if they are valid hands
  for (let value of handArr) {
    value = value.toLowerCase().replace(/\s/g, '');
    if (!validHands.includes(value)) {
      return 'Invalid input... Accepted values are ' + validHands.join(', ');
    }
  }

  // if hand 1 and hand 2 are the same, it's a tie, we're done, return early
  if (handArr[0] === handArr[1]) {
    return 'It\'s a tie!';
  }

  // if it's not a tie, let's start by defining the scenarios where hand 1 wins
  // let's also make a note of the verb that goes with each scenario
  // then we can log an explanation to the console
  const hand1Wins = [
    {scenario: ['paper',    'rock'],     verb: 'covers'     },
    {scenario: ['rock',     'scissors'], verb: 'crushes'    },
    {scenario: ['scissors', 'paper'],    verb: 'cut'        },
    {scenario: ['rock',     'lizard'],   verb: 'crushes'    },
    {scenario: ['lizard',   'spock'],    verb: 'poisons'    },
    {scenario: ['spock',    'scissors'], verb: 'smashes'    },
    {scenario: ['scissors', 'lizard'],   verb: 'decapitate' },
    {scenario: ['lizard',   'paper'],    verb: 'eats'       },
    {scenario: ['paper',    'spock'],    verb: 'disproves'  },
    {scenario: ['spock',    'rock'],     verb: 'vaporizes'  }
  ];
  

  // the scenarios where hand 2 wins are going to be the same as hand 1
  // but with rock/paper flipped to paper/rock, etc.
  let hand2Wins = JSON.parse(JSON.stringify(hand1Wins));
  for (let win of hand2Wins) {
    win.scenario = win.scenario.reverse();
  }

  // check each hand1Wins scenario to see if it applies to the current game
  for (let win of hand1Wins) {
    // join the arrays to strings to compare them more easily
    if (win.scenario.join() === handArr.join()) {
      console.log(handArr[0] + ' ' + win.verb + ' ' + handArr[1]);
      return 'Hand one wins!';
    }
  }

  // check each hand2Wins scenario to see if it applies to the current game
  for (let win of hand2Wins) {
    // join the arrays to strings to compare them more easily
    if (win.scenario.join() === handArr.join()) {
      console.log(handArr[1] + ' ' + win.verb + ' ' + handArr[0]);
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
