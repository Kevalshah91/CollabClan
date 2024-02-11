import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-monokai"; // Use "monokai" theme

const Chatbot = () => {
  const [search, setSearch] = useState("");
  const [aiResponse, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChatRunning, setChatRunning] = useState(true);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyDJwOdBrFoCowS1KlB0OPkevOxHW4q7-Kw"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  async function aiRun() {
    setLoading(true);
    const prompt = ` ${search} `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text);
    setLoading(false);
  }

  const handleClick = () => {
    aiRun();
  };

  const removeSymbols = (inputText) => {
    return inputText.replace(/[^a-zA-Z0-9\s]/g, "");
  };

  const codeKeywords = [
    "code",
    "programming",
    "syntax",
    "algorithm",
    "function",
    "variable",
  ];

  const checkForCodeKeywords = (inputText) => {
    return codeKeywords.some((keyword) =>
      inputText.toLowerCase().includes(keyword)
    );
  };

  const handleUserInput = () => {
    const cleanedInput = removeSymbols(search);

    if (cleanedInput.toLowerCase() === "exit") {
      setChatRunning(false);
      setResponse("Chat bot stopped. Enter 'exit' to restart.");
    } else {
      if (checkForCodeKeywords(cleanedInput)) {
        aiRun();
      } else {
        setResponse("I am trained only to solve coding doubts.");
      }
    }
  };

  return (
    <Box
      bg="purple.800"
      p={6}
      borderRadius="md"
      boxShadow="base"
      maxW="md"
      mx="auto"
      mt={8}
      width={"600"}
      ml={2}
    >
      <Text fontSize="2xl" color="white" mb={4}>
        Code Buddy
      </Text>
      <Text fontSize="md" color="white" mb={4}>
        Explore the power of Generative AI with Gemini-Pro
      </Text>

      <Box>
        <Input
          placeholder="Search"
          className="bot-input"
          onChange={(e) => handleChangeSearch(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          disabled={!isChatRunning}
          color={"white"}
        />
        <br />
        <Button
          className="bot-button"
          onClick={() => handleUserInput()}
          disabled={!isChatRunning}
          mt={2}
        >
          Search
        </Button>
        <br />
      </Box>

      {loading && search !== "" ? (
        <Text color="white" mt={4}>
          Fetching ...
        </Text>
      ) : (
        <AceEditor
          mode="text"
          theme="monokai" // Use "monokai" theme
          value={aiResponse}
          readOnly={true}
          fontSize={14}
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          width="100%"
          height="200px"
        />
      )}
    </Box>
  );
};

export default Chatbot;
