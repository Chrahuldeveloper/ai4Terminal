class aiServices {
  async queryAi(prompt: string) {
    try {
      const queryai = await fetch(
        `https://ai4linux.chrahulofficial.workers.dev/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await queryai.json();
      console.log(data.response);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new aiServices();
// what is the command to list folders in linux?
