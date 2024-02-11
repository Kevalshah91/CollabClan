import { Box, Container, Text, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
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
const Admin = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (userName != "admin") {
      navigate("/login");
    }
    axios.get("/api/problem/adminps").then((response) => {
      setData(response.data);
    });
  });
  const handleSelect = (id) => {
    // console.log(userD);
    if (
      window.confirm("Are you sure you want to delete this statement") === true
    ) {
      const data = {
        problem_id: id, // Pass the ID of the selected problem
      };

      axios
        .post("/api/problem/delete", data) //set problem for the room
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      navigate("/admin");
    } else {
    }
  };
  const background = {
    backgroundColor: "#1c1d1f",
    maxHeight: "100%",
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
    textAlign: "center",
    color: "white",
  };

  return (
    <body style={background} marginBottom={"500px"}>
      <center>
        <Button ml="10px" onClick={() => navigate("/addProblem")}>
          Add Problems
        </Button>
        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="50%"
          m="20px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Your Problems
          </Text>
        </Box>

        {/* <TableContainer>
        <Table
          variant="simple"
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="100%"
          m="20px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Thead>
            <Tr>
              <Th w={{ base: "30%", md: "15%" }}>Title</Th>
              <Th w={{ base: "70%", md: "60%" }}>Problem Statement</Th>
              <Th w={{ base: "25%", md: "15%" }}>Difficulty</Th>
              <Th w={{ base: "20%", md: "10%" }}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr key={row.id}>
                <Td>{row.title}</Td>
                <Td>{row.problem}</Td>
                <Td>{row.difficulty}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleSelect(row._id)}
                    leftIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer> */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Problem Statement</th>
              <th style={thStyle}>Difficulty</th>
              <th style={thStyle}>Delete</th>
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
                    leftIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </body>
  );
};

export default Admin;
