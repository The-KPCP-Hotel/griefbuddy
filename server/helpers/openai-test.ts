import OpenAI from 'openai';

// unsure if this is necessary if also in chatbot router
const openai = new OpenAI({
  // This is the default and can be omitted - if you globally exported your api key
  apiKey: process.env.OPENAI_API_KEY,
});

// tried to make this func dynamic but had issues with messages typing
async function main() {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'system', content: 'You are an inquisitive friend to users who are grieving.' }],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  return chatCompletion.choices[0];
}

export default main;

// async function moderator() {
//   const moderation: OpenAI.Moderations.ModerationCreateResponse = await openai.moderations.create({ input: "I hate my dad's surgeon" });

//   console.log(moderation);
//   console.log(moderation.results[0].category_scores);
//   console.log(moderation.results[0].categories);
// }
// moderator();
