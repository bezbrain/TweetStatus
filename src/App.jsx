import { useState } from "react";
import axios from "axios";

/* ======== */
// Fetching Openai Data for Tweets

const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const generateText = async () => {
    try {
      const APIBody = {
        model: "text-davinci-003",
        prompt: "What is the sentiment of this tweet?" + inputText,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      const { data } = await axios.post(
        "https://api.openai.com/v1/completions",
        APIBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + API_KEY,
          },
          // body: JSON.stringify(APIBody),
        }
      );

      const choiceText = data.choices[0].text.trim();
      let updateChoiceText = choiceText.replace("to see", "");
      setGeneratedText(updateChoiceText);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <div>
          <textarea
            name="tweet"
            placeholder="Paste your tweet here"
            id="tweet"
            cols="30"
            rows="10"
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button onClick={generateText}>
            Get the tweet sentiment from OpenAI API
          </button>
          {generatedText !== "" ? (
            <h3>This tweet is: {generatedText}</h3>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default App;
