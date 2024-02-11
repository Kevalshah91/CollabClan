import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Grid,
  Box,
  Text,
  Badge,
  VStack,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Achievements from "./Achievements";
const UserProfile = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("username") == null) {
    navigate("/login");
  }
  const [userInfo, setUserInfo] = useState(null);
  const github = localStorage.getItem("github");
  const username = github.split("/").pop();

  useEffect(() => {
    // Fetch user information, repositories, and badges
    const fetchData = async () => {
      const userResponse = await fetchUserInfo(username);
      if (userResponse) {
        const repoResponse = await fetchUserRepositories(username);
        const badgeResponse = await fetchUserBadges(username);

        setUserInfo({
          user: userResponse,
          repositories: repoResponse,
          badges: badgeResponse,
        });
      }
    };

    fetchData();
  }, [username]);

  const fetchUserInfo = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.ok ? response.json() : null;
  };

  const fetchUserRepositories = async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    return response.ok ? response.json() : null;
  };

  const fetchUserBadges = async (username) => {
    // You can implement the logic to fetch user badges here
    // For now, let's assume a static list of badges
    return [
      {
        name: "Contributor",
        description: "Awarded for making contributions to open source projects",
      },
      {
        name: "Achiever",
        description: "Awarded for achieving milestones in coding challenges",
      },
      {
        name: "Innovator",
        description: "Awarded for innovative projects or ideas",
      },
    ];
  };

  const renderUserDetails = () => {
    if (!userInfo) {
      return <Text>Loading...</Text>;
    }

    const { user, repositories, badges } = userInfo;

    return (
      <VStack spacing={8} align="start">
        <HStack spacing={8}>
          {/* User Information */}
          <Box bg="#979A9A" p={8} borderRadius="lg">
            <Avatar size="2xl" name={user.name} src={user.avatar_url} mb={4} />
            <Text fontSize="3xl" fontWeight="bold">
              Your Username: {username}
            </Text>
            <Text>Name: {user.name}</Text>
            <Text>Bio: {user.bio}</Text>
            <Text>Location: {user.location}</Text>
            <Text>Public Repositories: {user.public_repos}</Text>
            <Text>Followers: {user.followers}</Text>
            <Text>Following: {user.following}</Text>
          </Box>

          {/* Badges */}
          <Box bg="gray.100" p={8} borderRadius="lg" width={1000}>
            <Text fontSize="3xl" fontWeight="bold">
              Badges of user '{username}':
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {badges.map((badge) => (
                <Box key={badge.name} p={6} borderWidth="1px" borderRadius="lg">
                  <Badge colorScheme="green">{badge.name}</Badge>
                  <Text>{badge.description}</Text>
                </Box>
              ))}
            </Grid>
          </Box>
        </HStack>

        <Achievements></Achievements>
        {/* Repositories */}
        <Box bg="gray.100" p={8} borderRadius="lg">
          <Text fontSize="3xl" fontWeight="bold">
            Repositories of user '{username}':
          </Text>
          <br />
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {repositories.map((repo) => (
              <Box
                bg="#201c1c"
                color="white"
                key={repo.name}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Text fontSize="xl" fontWeight="bold">
                  Repository: {repo.name}
                </Text>
                <Text>Description: {repo.description}</Text>
                <Text>Language: {repo.language}</Text>
                <Text>Commit Count: {repo.commit_count}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
    );
  };

  return (
    <ChakraProvider>
      <Container maxW="xl" centerContent>
        {renderUserDetails()}
      </Container>
    </ChakraProvider>
  );
};

export default UserProfile;
