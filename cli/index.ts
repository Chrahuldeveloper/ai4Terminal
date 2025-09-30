const readline = require("readline");
const aiquery = require("./utils/aiServices");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = async (input: string) => {
  try {
    console.log("Thinking....");
    const res = await aiquery.queryAi(input);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

read.question(`Ask Ai :  `, (input: string) => {
  run(input);
  read.close();
});
