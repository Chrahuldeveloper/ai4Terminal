interface Ai {
  run: (
    model: string,
    opts: { prompt: string }
  ) => Promise<{ response: string }>;
}

interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        prompt: "What is the origin of the phrase 'Hello, World'?",
      });

      return new Response(JSON.stringify(aiResponse), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: unknown) {
      return new Response("Error calling AI", { status: 500 });
    }
  },
};
