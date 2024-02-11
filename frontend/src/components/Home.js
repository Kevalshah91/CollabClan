import {
  Box,
  Container,
  Text,
  TabPanels,
  Tabs,
  Flex,
  Spacer,
  Badge,
  Image,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
const username = JSON.parse(localStorage.getItem("username"));
var userName;
var name;
var currentPoints = 0;
var points;

const Home = () => {
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (username == null) {
      navigate("/login");
    }
    if (username) {
      userName = username.userName;
      name = username.name;
      console.log(userName, "------");
      axios
        .post("http://localhost:5000/api/editor/getPoints", {
          username: userName,
        })
        .then(function (response) {
          let currentPoints = response.data.points;
          console.log("Current points: ", currentPoints);
          // Calculate new points
          setPoints(currentPoints);
          // Update points for the user
        })
        .catch(function (error) {
          console.log(error);
        });

      if (currentPoints) {
        points = currentPoints;
      }
      if (username.username) {
        userName = username.username;
      } else {
        userName = username.userName;
      }
      console.log(username.userName);
    }
  });

  return (
    <center>
      <Container
        maxW={"xl"}
        centerContent
        bgImg="url('../src/components/bg1.png')"
        //userImg="url('../assests/profileIcon3.png')"
      >
        <Box
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg={"#9840db"}
          color="white"
          p={6}
          width="400px"
          position="relative"
          _hover={{ transform: "translateY(-10px)", boxShadow: "xl" }}
          transition="all 0.3s ease-in-out"
        >
          <Flex alignItems="center">
            <Box>
              <Image
                borderRadius="full"
                boxSize="50px"
                alt="Profile Picture"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              />
            </Box>
            <Box ml={4}>
              <Text fontSize="xl" fontWeight="bold">
                {name}
              </Text>
              <Text fontSize="md">{username.name}</Text>
            </Box>
            <Spacer />
            <Badge colorScheme="green" variant="subtle" mt="4" fontSize="sm">
              {points}
            </Badge>
          </Flex>
          <Box position="absolute" top="20px" right="20px">
            <Text fontSize="5xl" fontWeight="bold" color="orange.500"></Text>
            <Text fontSize="md" color="azure">
              Total Points
            </Text>
          </Box>
        </Box>
        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="100%"
          m="100px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Let's get to know CodeUnite more!
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
              <Text fontSize="1xl" fontFamily="Work sans" color="white">
                Moshi Moshi coders! So this page is all about knowing every
                single bit of CodeUnite.
              </Text>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </center>
  );
};

export default Home;
