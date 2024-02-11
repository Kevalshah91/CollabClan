import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import {
  Box,
  Heading,
  Select,
  Button,
  Text,
  Link,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("AI");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const userD = JSON.parse(localStorage.getItem("username"));

  const domains = [
    "AI",
    "ML",
    "WEB",
    "APP",
    "CYBER SECURITY",
    "IOT",
    "Data Science",
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=stars:>1+topic:${selectedDomain}&sort=stars&order=desc&per_page=50`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        var data = await response.json();
        var newData = {
          repo_link: data.html_url,
        };
        var data = { ...data, ...newData };
        setRepositories(data.items);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDomain]);

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleApplyButtonClick = () => {
    setLoading(true);
  };

  const handleRepoSelect = async (repo) => {
    localStorage.setItem("repo_link", repo.html_url);

    const confirmed = window.confirm(
      "Are you sure you want to select this repository?"
    );

    if (confirmed) {
      try {
        // let data = {
        //   repoLink: data.html_url,
        // };

        // // Check if userD.userId is defined
        // if (!userD._id) {
        //   console.error("User ID is undefined");
        //   return;
        // }

        // // Make a POST request to add repo_link to the user's document
        // await axios.post(
        //   `http://localhost:5000/add-repo-link/${userD._id}`,
        //   data
        // );

        // localStorage.setItem("repo_link", data.repo_link);
        const repo_link = localStorage.getItem("repo_link");
        const data2 = {
          roomId: userD.roomId,
          repo_link: repo_link,
          userId: userD._id,
        };
        console.log(data2, "sdrftygiub");
        // try {
        //   await axios.post("http://localhost:5000/addrepo", data2);
        //   console.log("Request successful");
        // } catch (err) {
        //   console.error("Error making POST request:", err);
        // }
        try {
          await axios.post(
            "http://localhost:5000/api/repository/select",
            data2
          );
        } catch (err) {
          console.log(err);
        }

        navigate("/room/" + userD.roomId);
      } catch (error) {
        console.error("Error adding repo link:", error);
        // Handle the error as needed
      }
    }
  };

  const handleShareButtonClick = () => {};

  return (
    <Box p={4} bg="gray.800" color="white">
      <VStack spacing={4} align="start">
        <Heading mb={4}>Top 50 Repositories</Heading>
        <Box>
          <Text>Select a Domain:</Text>
          <Select
            value={selectedDomain}
            onChange={handleDomainChange}
            variant="filled"
            color="black"
          >
            {domains.map((domain, index) => (
              <option key={index} value={domain}>
                {domain}
              </option>
            ))}
          </Select>
          <br />
          <Button ml={2} onClick={handleApplyButtonClick} color={"black"}>
            Apply
          </Button>
        </Box>

        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error}</Text>}
        {!loading && !error && (
          <List spacing={3} mt={4} styleType="none">
            {repositories.map((repo, index) => (
              <ListItem key={index} bg="gray.700" p={4} borderRadius="md">
                <VStack spacing={2} align="start">
                  <Heading size="md">{repo.name}</Heading>
                  <Text>
                    Owner: {repo.owner.login} | Stars: {repo.stargazers_count}
                  </Text>
                  <Text>
                    Description:{" "}
                    {repo.description || "No description available"}
                  </Text>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={20} /> View on GitHub
                  </Link>
                  <Button
                    mt={2}
                    backgroundColor="#9840db"
                    color="#1c1d1f"
                    onClick={() => handleRepoSelect(repo)}
                  >
                    Select Repository
                  </Button>
                </VStack>
              </ListItem>
            ))}
          </List>
        )}

        {/* Button to share the selected repository */}
        {selectedRepo && (
          <Button
            mt={4}
            backgroundColor="#9840db"
            color="#1c1d1f"
            onClick={handleShareButtonClick}
          >
            Share Selected Repository
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default Repositories;
