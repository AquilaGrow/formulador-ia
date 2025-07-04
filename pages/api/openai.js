
export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Actúa como un ingeniero agrónomo experto en formulación de fertilizantes. No inventes productos. Usa lógica agronómica profesional.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ resultado: data.choices[0].message.content });
}
