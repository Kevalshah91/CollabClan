import {
  Box,
  Container,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const userName = localStorage.getItem("username");
const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userName) {
      navigate("/userprofile");
    }
  }, []);

  return (
    <center>
      <Container maxW={"xl"} centerContent>
        <Box
          d="flex"
          justifyContent="flex-start"
          p={"3"}
          bg={"#9840db"}
          w="100%"
          m="70px 0 15px 0"
          borderRadius={"10px"}
          borderWidth="3"
        >
          <Text fontSize="3xl" fontFamily="Work sans" color="white">
            Get Connected to CodeUnite
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
            <TabList mb={"1em"}>
              <Tab w={"50%"} color="black">
                Sign Up
              </Tab>
              <Tab w={"50%"} color="black">
                Login
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Signup />
              </TabPanel>
              <TabPanel>
                <Login />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </center>
  );
};

export default Home;
