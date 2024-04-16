import OpenAI from 'openai';

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are an inquisitive friend to users who are grieving.' }],
    model: 'gpt-3.5-turbo-1106',
  });

  console.log(completion.choices[0]);
}

export default main;
