import { Box, Container, Text, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const username = JSON.parse(localStorage.getItem("username"));
var userName;
if (username) {
  userName = username.userName;

  if (username.username) {
    userName = username.username;
  } else {
    userName = username.userName;
  }
  console.log(username.userName);
}
const AddProblem = () => {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [input, setInput] = useState("");
  const [output_format, setOutput_format] = useState("");
  const [testcases, setTestcases] = useState("");
  const [output, setOutput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (userName != "admin") {
      navigate("/login");
    }
  });

  const formSubmitEventHandler = () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/problem/upload",
        {
          title,
          problem,
          difficulty,
          input,
          output_format,
          testcases,
          output,
        },
        config
      )
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          alert("Looks like some error occured");
        } else {
          //   const userData = {
          //     userName: res.data.members[0].name,
          //     userId: res.data.members[0].userId,
          //     roomName: res.data.roomName,
          //     roomId: res.data.roomId,
          //   };
          //   localStorage.setItem("username", JSON.stringify(userData));
          //   const user = JSON.parse(localStorage.getItem("username"));
          navigate("/admin");
        }
      })
      .catch((err) => {
        alert("Looks like some error occured");
      });
  };

  return (
    <center>
      <Container maxW={"xl"} centerContent>
        <Button ml="10px" onClick={() => navigate("/admin")}>
          View Problems
        </Button>

        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="100%"
          m="30px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Add Problem
          </Text>
        </Box>
        <Box
          p={"5"}
          bg={"#9840db"}
          w="100%"
          m="20px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Tabs variant="soft-rounded" colorScheme="purple">
            <TabPanels>
              <form>
                <FormControl id="Name">
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Enter Title of Problem Statement"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Problem</FormLabel>
                  <Input
                    placeholder="Enter Problem Statement"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Difficulty</FormLabel>
                  <Input
                    placeholder="Enter difficulty of Problem Statement"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Input</FormLabel>
                  <Input
                    placeholder="Enter inputs for Problem Statement"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel> Output Format </FormLabel>
                  <Input
                    placeholder="Enter Output Format of Problem Statement"
                    value={output_format}
                    onChange={(e) => setOutput_format(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel> TestCases</FormLabel>
                  <Input
                    placeholder="Enter TestCases of Problem Statement"
                    value={testcases}
                    onChange={(e) => setTestcases(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel> Output</FormLabel>
                  <Input
                    placeholder="Enter Output of Problem Statement for validation"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                  />
                </FormControl>
                <Button
                  onClick={formSubmitEventHandler}
                  id="submit"
                  backgroundColor={"#1c1d1f"}
                  color="#9840db"
                  width={"50%"}
                  style={{ marginTop: 20 }}
                >
                  Create
                </Button>
              </form>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </center>
  );
};

export default AddProblem;
