const readline = require("readline");
const aiquery = require("./utils/aiServices");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = async (input: string) => {
  try {
    await aiquery.queryAi(input);
  } catch (error) {
    console.log(error);
  }
};

read.question(`Ask Ai :  `, (input: string) => {
  run(input);
  read.close();
});
