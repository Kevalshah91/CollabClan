import axios from "axios";
import React from "react";
import { Button } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProblemStatement = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const userD = JSON.parse(localStorage.getItem("username"));
  console.log(userD);
  const room_id = userD.roomId;
  // console.log(room_id);
  const handleSelect = (id) => {
    console.log(userD);
    if (
      window.confirm("Are you sure you want to select this statement") === true
    ) {
      const data = {
        roomId: room_id, // Replace with your actual room ID
        problem_id: id, // Pass the ID of the selected problem
      };

      axios
        .post("/api/problem/select", data) //set problem for the room
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      navigate("/room/" + room_id);
    } else {
      navigate("/repositories");
    }
  };
  useEffect(() => {
    fetch("/api/problem/fetch")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(data);

  const background = {
    backgroundColor: "#1c1d1f",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    width: "70%",
    border: "5px solid #9840db",
    padding: "100px",
  };

  const thStyle = {
    border: "2px solid #9840db",
    padding: "8px",
    textAlign: "center",
    color: "white",
  };

  const tdStyle = {
    border: "2px solid #9840db",
    padding: "8px",
    textAlign: "left",
    color: "white",
  };

  return (
    <body style={background}>
      <Container>
        <center>
          <Box
            d="flex"
            justifyContent="flex-start"
            p={"3"}
            bg={"#9840db"}
            w="100%"
            mt={""}
            mb="50px"
            borderRadius={"10px"}
            borderWidth="3"
          >
            <Text fontSize="3xl" fontFamily="Work sans" color="white">
              Welcome to your Competetive Coding Journey.
            </Text>
          </Box>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Problem Statement</th>
                <th style={thStyle}>Difficulty</th>
                <th style={thStyle}>Selection</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td style={tdStyle}>{row.title}</td>
                  <td style={tdStyle}>{row.problem}</td>
                  <td style={tdStyle}>{row.difficulty}</td>
                  <td style={tdStyle}>
                    <Button
                      backgroundColor={"#9840db"}
                      color="#1c1d1f"
                      width={"80%"}
                      style={{ marginTop: 20 }}
                      onClick={() => handleSelect(row._id)}
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </Container>
    </body>
  );
};

export default ProblemStatement;
