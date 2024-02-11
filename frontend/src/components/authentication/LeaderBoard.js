import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

const POINTS_ISSUE = 5;
const POINTS_FORK = 10;
const POINTS_PULL_REQUEST = 20;

const Leaderboard = () => {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUrlChange = (event) => {
    setRepositoryUrl(event.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersResponse = await axios.get("/api/users");
        const fetchedUsers = usersResponse.data;

        const usersWithPoints = await Promise.all(
          fetchedUsers.map(async (user) => {
            const points = await fetchRepositoryEvents(
              user.github.split("/").pop()
            );
            return { ...user, points };
          })
        );

        setUsers(usersWithPoints);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    const fetchRepositoryEvents = async (userLogin) => {
      try {
        const urlParts = repositoryUrl.split("/");
        const owner = urlParts[urlParts.length - 2];
        const repo = urlParts[urlParts.length - 1];
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/events`;

        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          const events = response.data;
          return calculateUserPoints(events, userLogin);
        } else {
          throw new Error("Failed to fetch repository events");
        }
      } catch (error) {
        console.error("Error:", error.message);
        return 0;
      }
    };

    const calculateUserPoints = (events, userLogin) => {
      let userPoints = 0;
      let hasContributed = false;

      events.forEach((event) => {
        if (event.actor && event.actor.login === userLogin) {
          hasContributed = true;
          switch (event.type) {
            case "IssuesEvent":
              userPoints += POINTS_ISSUE;
              break;
            case "ForkEvent":
              userPoints += POINTS_FORK;
              break;
            case "PullRequestEvent":
              userPoints += POINTS_PULL_REQUEST;
              break;
            case "PushEvent":
              userPoints += event.payload.commits.length;
              break;
          }
        }
      });

      if (!hasContributed) {
        userPoints = 0;
      }

      return userPoints;
    };

    if (repositoryUrl) {
      fetchUserData();
    }
  }, [repositoryUrl]);

  return (
    <ChakraProvider>
      <Box
        bg="black"
        alignSelf={"center"}
        color="white"
        p={4}
        borderRadius={10}
        width={700}
        ml={350}
      >
        <Heading mb={4}>🏆 Repository Points Leaderboard 🏆</Heading>
        <Box mb={4}>
          <Text mb={2}>Enter Repository URL:</Text>
          <Input type="text" value={repositoryUrl} onChange={handleUrlChange} />
        </Box>
        <Button color={"black"} onClick={handleSubmit}>
          Submit
        </Button>
        {loading ? (
          <Text mt={4}>Loading...</Text>
        ) : (
          <Box mt={4}>
            {users.map((user, index) => (
              <Text key={user.id} mb={2}>
                {index + 1}. {user.name}: {user.points} points
              </Text>
            ))}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default Leaderboard;
