import React from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import AddSiteModal from '../components/AddSiteModal';

export default function EmptyState() {

  return <>
    <Box backgroundColor="#ffffff" p="30px" m="30px 0">
      <Flex flexDirection="column" align="center">
        <Text fontWeight="bold" fontSize="30px">
          U dont got any site yet bro...
        </Text>
        <Text mt={3}>Get statrted CMON!</Text>
      </Flex>
      <Flex margin="20px 0" justify="center" align="center">
        <AddSiteModal />
      </Flex>
    </Box>
  </>
}
