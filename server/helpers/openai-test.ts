import OpenAI from 'openai';

// unsure if this is necessary if also in chatbot router
const openai = new OpenAI({
  // This is the default and can be omitted - if you globally exported your api key
  apiKey: process.env.OPENAI_API_KEY,
});

// type OpenaiMessageType = {
//   role: string;
//   content: string;
// };

async function main() {
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [{ role: 'system', content: 'You are an inquisitive friend to users who are grieving.' }],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
  console.log(chatCompletion.choices[0]);
  return chatCompletion.choices[0];
}

export default main;

// // async function main(messages: OpenaiMessageType[]) {
// async function main(messages: ChatCompletionMessageParam[]) {
//   const completion = await openai.chat.completions.create({
//     messages,
//     model: 'gpt-3.5-turbo-1106',
//   });

//   console.log(completion.choices[0]);
//   return completion.choices[0];
// }

// export default main;
