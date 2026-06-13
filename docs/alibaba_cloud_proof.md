# Proof of Alibaba Cloud Deployment

The hackathon asks for a link to a code file demonstrating use of Alibaba Cloud services and APIs.

## The file

**`app/api/qwen/route.ts`** — the application backend. It calls **Qwen models hosted on
Alibaba Cloud Model Studio (DashScope)** via the OpenAI-compatible endpoint for every pipeline stage.

## The lines to cite

```ts
const BASE_URL =
  process.env.DASHSCOPE_BASE_URL ||
  "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";   // Alibaba Cloud Model Studio
const MODEL = process.env.QWEN_MODEL || "qwen-plus";          // Qwen model

const client = new OpenAI({ apiKey, baseURL: BASE_URL });     // points at Alibaba Cloud
const completion = await client.chat.completions.create({
  model: MODEL,
  response_format: { type: "json_object" },
  messages: [ /* per-stage system + user prompt */ ],
});
```

`dashscope-intl.aliyuncs.com` **is** Alibaba Cloud Model Studio (Singapore/international region).
Every reasoning call in InternPilot is therefore served by Alibaba Cloud.

## For an even stronger submission

Host the whole Next.js app on an **Alibaba Cloud ECS** instance (or Function Compute) and record a
short screen capture of it running on that instance — see `deployment-alibaba-ecs.md`. Cite both the
deployed URL and this file.
