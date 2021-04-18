import React, { useState } from 'react';
import { Box, Text, Flex, Button, Spinner } from '@chakra-ui/react';
import { createCheckoutSession } from '@/lib/database';
import { useAuth } from '../lib/auth';

export default function EmptyState() {
  const auth = useAuth();
  const user = auth?.user;

  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);

  return <>
    <Box backgroundColor="#ffffff" p="30px" m="30px 0">
      <Flex flexDirection="column" align="center">
        <Text fontWeight="bold" fontSize="30px">
          Get Feedback on your site instantly.
        </Text>
        <Text mt={3}>Let's get started.</Text>
      </Flex>
      <Flex margin="20px 0" justify="center" align="center">
        <Button 
            backgroundColor={isUpgradeLoading ? "white" : "gray.900"}
            color={isUpgradeLoading ? "gray.900" : "white"}
            border={isUpgradeLoading && "2px solid #69aaac"}
            fontWeight="500"
            padding="5px 10px"
            mx={2} 
            _hover={isUpgradeLoading ? { bg: 'white' }:{ bg: 'gray.800' }}
            _active={{ transform: 'scale(0.95)' }}
            boxShadow="none !important"
            onClick={() => {
              setIsUpgradeLoading(true);
              createCheckoutSession(user.uid);
            }}
          >
            {isUpgradeLoading ? 
              <Flex><Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#69aaac"
                size="sm"
                marginRight={2}
                /><Text>Loading</Text></Flex> : 
                <Text>Upgrade to Starter Pack</Text>
            }
          </Button>
      </Flex>
    </Box>
  </>
}