import React from 'react';
import { Box, Text } from "@chakra-ui/react";

export function Th (props) {
  
  return <Text 
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    p="10px"
    {...props}
  />
}

export function Td (props) {

  return <Box 
    as="td"
    color="gray.900"
    borderBottom="1px solid"
    borderBottomColor="gray.100"
    fontSize="14px"
    p="10px"
    overflow="hidden" 
    {...props}
  />
}

export function Tr (props) {
  
  return <Box 
    as="tr"
    backgroundColor="gray.500"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.300"
    height="40px"
    {...props}
  />
}

export function Table (props) {

  return <Box 
    as="table"
    textAlign="left"
    backgroundColor="white"
    ml={0}
    mr={0}
    borderRadius={8}
    boxShadow="0 4px 10px rgba(0, 0, 0, 0.05)"
    {...props}
  />
}