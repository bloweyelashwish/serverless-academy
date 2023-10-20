// 1 2 3 4 5 6 7 8 9 10

import { createInterface } from 'node:readline';
import {
  stdin as input,
  stdout as output,
  exit as processExit,
} from 'node:process';
import helpers from './helpers.mjs';

const MIN_LEN = 0;
const MAX_LEN = 10;

const USER_OPTS = {
  1: helpers.sortInputAlphabetically,
  2: helpers.sortNumsAsc,
  3: helpers.sortNumsDesc,
  4: helpers.sortByWordLength,
  5: helpers.getUniqueWords,
  6: helpers.getUniqueValues,
};

const SELECT_TEXT = `
  1. Sort words alphabetically.
  2. Show numbers from lesser to greater.
  3. Show numbers from bigger to smaller
  4. Display words in ascending order by number of letters in the word
  5. Show only unique words
  6. Display only unique values from the set of words and numbers entered by the user

To exit the program enter "exit".
Select (1 - 5) and press ENTER: 
`;

const rlInterface = createInterface({ input, output });

function inputIsValid(line) {
  const trimmed = line.trim();
  return trimmed.length > MIN_LEN && trimmed.split(' ').length === MAX_LEN;
}

function ask(q) {
  return new Promise((resolve) => {
    rlInterface.question(q, resolve);
  });
}

function checkIfExit(inputStr) {
  if (inputStr === 'exit') {
    console.log('Bye! Come back again!');
    processExit();
  }
}

(async function main() {
  const inputStr = await ask('Enter 10 words or digits divided by spaces: ');
  checkIfExit(inputStr);

  const isValidStr = inputIsValid(inputStr);
  if (!isValidStr) {
    console.log('Your input is invalid. Try again.');
    main();
  }

  const inputArr = inputStr.split(' ');

  async function selectOption() {
    const selectedOption = await ask(
      `How would you like to sort values? \r\n \x1b[33m [${inputArr}] \x1b[0m \n\r${SELECT_TEXT}`
    );

    checkIfExit(selectedOption);

    const parsedOption = parseInt(selectedOption, 10);

    if (isNaN(parsedOption)) {
      console.log('Invalid option selected. Try again.');
      selectOption();
    }

    const action = USER_OPTS[parsedOption];

    if (!action) {
      console.log('Invalid option selected. Try again.');
      selectOption();
    }

    const result = action(inputArr);
    console.log(`Result: ${result.join(' ')}`);
    main();
  }

  selectOption();
})();
