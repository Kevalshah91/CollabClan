import React from "react";
import { Badge as ChakraBadge, Box, Text } from "@chakra-ui/react";

const Badge = ({ count, colorScheme, children }) => (
  <Box display="flex" alignItems="center">
    <ChakraBadge colorScheme={colorScheme} mr={2}>
      {count}
    </ChakraBadge>
    <Text>{children}</Text>
  </Box>
);

export default Badge;
