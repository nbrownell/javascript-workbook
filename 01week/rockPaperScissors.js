'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function rockPaperScissors(hand1, hand2) {

  // create a sanitized array of the two hands for easier manipulation
  let handArr = [hand1, hand2].map((x) => x.toLowerCase().replace(/\s/g, ''));

  // declare an array of accepted hand values
  const validHands = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
  
  // return an error if the hands chosen are not in the array of accepted values
  handArr = handArr.filter(function(hand) { return validHands.includes(hand) });
  if (handArr.length < 2) {
    return 'Invalid input. Accepted values are ' + validHands.join(', ');
  }

  // if hand 1 and hand 2 are the same, it's a tie, we're done, return early
  if (handArr[0] === handArr[1]) {
    return 'It\'s a tie!';
  }

  // if it's NOT a tie, define the scenarios where hand 1 wins, noting also the rationale
  const hand1Wins = [
    {scenario: ['paper',    'rock'],     rationale: 'covers'     },
    {scenario: ['rock',     'scissors'], rationale: 'crushes'    },
    {scenario: ['scissors', 'paper'],    rationale: 'cut'        },
    {scenario: ['rock',     'lizard'],   rationale: 'crushes'    },
    {scenario: ['lizard',   'spock'],    rationale: 'poisons'    },
    {scenario: ['spock',    'scissors'], rationale: 'smashes'    },
    {scenario: ['scissors', 'lizard'],   rationale: 'decapitate' },
    {scenario: ['lizard',   'paper'],    rationale: 'eats'       },
    {scenario: ['paper',    'spock'],    rationale: 'disproves'  },
    {scenario: ['spock',    'rock'],     rationale: 'vaporizes'  }
  ];

  // check each hand1Wins scenario to see if it applies to the current game
  for (let win of hand1Wins) {
    
    // create a reversed copy of this hand so we can also check for a hand 2 win
    const handRev = handArr.slice(0).reverse();

    // store this joined array for later use since we'll be checking against it twice
    const winScenarioStr = win.scenario.join();

    if (winScenarioStr === handArr.join()) {
      console.log(handArr[0] + ' ' + win.rationale + ' ' + handArr[1]);
      return 'Hand one wins!';
    
    } else if (winScenarioStr === handRev.join()) {
      console.log(handRev[0] + ' ' + win.rationale + ' ' + handRev[1]);
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
