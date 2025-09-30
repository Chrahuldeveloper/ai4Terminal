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
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
const { prompt } = await request.json();

const aiResponse = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
  prompt: `You are QuickAssist, a helpful and knowledgeable personal assistant.  
Your role: answer any question clearly, briefly, and in plain words.  
Rules: 
- Keep responses under 2 lines.  
- No long explanations, just the essential answer.  
- Be confident and direct.  

Now answer this:\n\n${prompt}`,
});

      const responseContent = {
        response: aiResponse.response,
      };

      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      };

      return new Response(JSON.stringify(responseContent), { headers });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to process request" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};

// https://ai4linux.chrahulofficial.workers.dev/
