import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

// Create the Context
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextWord) => {
    setTimeout(function () {
        setResultData((prev) => prev + nextWord);
    }, 75 * index);
};

const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput(""); // Clear the input field
    setRecentPrompt(""); // Reset the current prompt
    setPreviousPrompts([]); // Clear previous prompts
    setResultData(""); // Clear the result
  };
  

  // Typing Effect Management
  let typingTimeouts = [];
  const clearTypingEffect = () => {
    typingTimeouts.forEach(clearTimeout);
    typingTimeouts = [];
  };

  const onSent = async (prompt) => {
    try {
      if (!input.trim() && !prompt) {
        alert("Please enter a valid prompt!");
        return;
      }

      // Clear previous typing effect
      clearTypingEffect();

      // Reset states
      setResultData("");
      setLoading(true);
      setShowResult(true);

      // Determine current prompt
      let currentPrompt = prompt || input;
      setRecentPrompt(currentPrompt);

      // Fetch response
      const response = await run(currentPrompt);

      if (!response.trim()) {
        setResultData("The API returned an empty response.");
        return;
      }

      // Format the response (bold and line breaks)
      const responseArray = response.split("**");
      const formattedResponse = responseArray
        .map((text, index) => (index % 2 === 1 ? `<b>${text}</b>` : text))
        .join("")
        .split("*")
        .join("<br>");

      // Simulate typing effect
      const words = formattedResponse.split(" ");
      words.forEach((word, index) => {
        const timeout = setTimeout(() => {
          setResultData((prev) => prev + word + " ");
        }, 75 * index);
        typingTimeouts.push(timeout);
      });

      // Add to prompt history only if not from `prompt`
      if (!prompt) {
        setPreviousPrompts((prev) => [...prev, input]);
      }

      // Clear input field
      setInput("");
    } catch (error) {
      console.error("Error while sending the prompt:", error);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    previousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

// Add PropTypes validation for props
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
