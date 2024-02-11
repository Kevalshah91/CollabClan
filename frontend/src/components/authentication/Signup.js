import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState(null);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");
  const [email, setEmail] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);

    if (
      !name ||
      !username ||
      !password ||
      !confirmpassword ||
      !github ||
      !email ||
      !resume
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("pdf_file", resume);

      const response = await axios.post("http://127.0.0.1:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseData = response.data;
      console.log(responseData);
      setPicLoading(false);
      // ... (existing code)
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.error || "An error occurred" + error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }

    try {
      const { data } = await axios.post("http://localhost:5000/register", {
        name,
        username,
        password,
        file: "C:/Users/taher/OneDrive/Pictures/Desktop/Resume",
        github,
        email,
        // Add more fields as needed
      });

      localStorage.setItem("username", username);
      console.log(data);
      localStorage.setItem("github", github);
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("username", JSON.stringify(data));
      setPicLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description:
          error.response?.data?.message || "An error occurred" + error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="Username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="username"
          placeholder="Enter Your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password12" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="github" isRequired>
        <FormLabel>Github</FormLabel>
        <Input
          placeholder="Enter Your Github Username"
          onChange={(e) => setGithub(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="resume" isRequired>
        <FormLabel>Upload your Resume</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept=".pdf, .doc, .docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
      </FormControl>
      <Button
        backgroundColor={"black"}
        color="#9840db"
        width={"50%"}
        style={{ marginTop: 20 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
