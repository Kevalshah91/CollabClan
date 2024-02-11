import { Box, Container, Text, TabPanels, Tabs } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const user = JSON.parse(localStorage.getItem("username"));

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    if(user==null)
   {
    navigate('/login')
   }
  })
  var userName;
  console.log(user)
  if(user){
    if(user.username)
    {
      userName= user.username
    }
    else{
   userName= user.userName
    }
   console.log(user)
  }
  console.log(user)
  console.log(userName)
  const formSubmitEventHandler = () => {
  
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/room/joinroom",
        {
          userName,
          roomId,
          password: password,
          // user,
        },
        config
      )
      .then((res) => {
        //console.log(res.data);

        if (res.data.error) {
          alert("Looks like some error occured1");
          console.log(res.data.error);
        } else {
          if (res.data.UserId) {
            localStorage.setItem("username", JSON.stringify(res.data));
          }
          //alert(res.data)
          console.log(res.data);
          console.log(roomId);
          navigate(`/room/${roomId}`);

        }
      })
      .catch((err) => {
        alert("Looks like some error occured2" + `${err.error}`);
        console.log(err);
      });
  };
  if (user != null) {
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
              Join Room
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
                <FormControl id="Name">
                  <FormLabel>Room ID:</FormLabel>
                  <Input
                    placeholder="Enter room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                </FormControl>
                <FormControl id="Name">
                  <FormLabel>Room Password:</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter room Password"
                  />
                </FormControl>
                <br />

                <Button
                  onClick={formSubmitEventHandler}
                  id="submit"
                  backgroundColor={"#1c1d1f"}
                  color="#9840db"
                  width={"50%"}
                  style={{ marginTop: 20 }}
                >
                  Join
                </Button>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </center>
    );
  } else {
    navigate("/login");
  }
};

export default JoinRoom;
