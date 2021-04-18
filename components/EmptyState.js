import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import AddSiteModal from '../components/AddSiteModal';

export default function EmptyState() {

  return <>
    <Box backgroundColor="#ffffff" p="30px" m="30px 0">
      <Flex flexDirection="column" align="center">
        <Text fontWeight="bold" fontSize="30px">
          You haven't added any sites yet.
        </Text>
        <Text mt={3}>Let's get started.</Text>
      </Flex>
      <Flex margin="20px 0" justify="center" align="center">
        <AddSiteModal />
      </Flex>
    </Box>
  </>
}
