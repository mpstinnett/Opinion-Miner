const socket = io();
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication());


const addEventListener = (selector, event, handler) => {
  document.addEventListener(event, async ev => {
    if (ev.target.closest(selector)) {
      handler(ev);
    }
  });
};

addEventListener('#submit', 'click', async () => {
  console.log("yay")
});

async function sentiment() {
  // Imports the Google Cloud client library
 

  // Creates a client
  const client = new language.LanguageServiceClient();
  const text = document.querySelector('[name="test_text"]').value;

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  console.log('Document sentiment:');
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });

  document.getElementById('SentimentScore').innerHTML = '<p>Text overall score is ${sentence.sentiment.score}<p>';
}
