import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Chat from "./Chat"; // Import the Chat component
import io from "socket.io-client";

function RightSidebar({ userId }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  // Establish the WebSocket connection when the component mounts
  useEffect(() => {
    if (accessToken && !socket) {
      const newSocket = io("https://myblog3.shop", {
        query: {
          accessToken,
        },
      });

      newSocket.emit("listConnectedUsers");

      newSocket.on("connectedUsers", (receivedConnectedUsers) => {
        setConnectedUsers(receivedConnectedUsers);
        console.log("checking" + receivedConnectedUsers);
      });

      setSocket(newSocket);
    }
  }, [userId, accessToken, socket]);

  return (
    <Box h="100%" display="flex" flexDirection="column" justifyContent="flex-end">
      <Flex direction="column">
        {connectedUsers.map((user, index) => (
          <Flex
            key={index}
            onClick={() => setSelectedFriend(user)} // Set the selected friend
            style={{ cursor: "pointer" }}
          >
            <Text ml="3">{user}</Text>
          </Flex>
        ))}
      </Flex>
      {selectedFriend && <Chat friendName={selectedFriend} userId={userId} socket={socket} />}
    </Box>
  );
}

export default RightSidebar;
