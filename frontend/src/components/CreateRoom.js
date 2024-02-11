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
console.log(localStorage.getItem("github"));
const CreateRoom = () => {
  const [roomLimit, setRoomLimit] = useState("");
  const [roomName, setRoomName] = useState("");
  // const[roomId, setRoomId] = useState('')
  const [roomPassword, setRoomPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (username == null) {
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
        "/api/room/room",
        {
          userName,
          roomName,
          password: roomPassword,
          roomLimit,
        },
        config
      )
      .then((res) => {
        console.log(res);

        if (res.data.error) {
          alert("Looks like some error occured");
        } else {
          const userData = {
            userName: res.data.members[0].name,
            userId: res.data.members[0].userId,
            roomName: res.data.roomName,
            roomId: res.data.roomId,
            _id: res.data._id,
          };

          localStorage.setItem("username", JSON.stringify(userData));

          const user = JSON.parse(localStorage.getItem("username"));
          navigate("/repositories");
        }
      })
      .catch((err) => {
        alert("Looks like some error occured");
      });
  };

  return (
    <center>
      <Container maxW={"xl"} centerContent>
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
            Create Room
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
                  <FormLabel>Room Name:</FormLabel>
                  <Input
                    placeholder="Enter Your roomname"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Set Room Limit:</FormLabel>
                  <Input
                    placeholder="Enter Number of users to enter the room"
                    value={roomLimit}
                    onChange={(e) => setRoomLimit(e.target.value)}
                  />
                </FormControl>
                <br />
                <FormControl id="Name">
                  <FormLabel>Room password:</FormLabel>
                  <Input
                    placeholder="Enter the password to your room"
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
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

export default CreateRoom;
