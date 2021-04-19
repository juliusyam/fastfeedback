import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

export default function EmptyFeedbackState() {

  return <>
    <Box backgroundColor="#ffffff" p="30px" m="30px 0">
      <Flex flexDirection="column" align="center">
        <Text fontWeight="bold" fontSize="30px">
          You haven't left any feedback yet.
        </Text>
        <Text mt={3}>Spread the love!</Text>
      </Flex>
    </Box>
  </>
}