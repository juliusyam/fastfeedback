import React, { useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { useAuth } from '../lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/database';
import { Box, Button, Spinner, Text, Flex, Avatar, Stack, Tag, Grid } from '@chakra-ui/react';

export default function Account() {
  const auth = useAuth();
  const user = auth?.user;

  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  return (
    <DashboardShell>
      <Box>
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
              /><Text>Upgrading</Text></Flex> : 
              <Text>Upgrade to Starter</Text>
          }
        </Button>
        <Button 
          backgroundColor={isBillingLoading ? "white" : "gray.900"}
          color={isBillingLoading ? "gray.900" : "white"}
          border={isBillingLoading && "2px solid #69aaac"}
          fontWeight="500"
          padding="5px 10px"
          mx={2} 
          _hover={isBillingLoading ? { bg: 'white' }:{ bg: 'gray.800' }}
          _active={{ transform: 'scale(0.95)' }}
          boxShadow="none !important"
          onClick={() => {
            setIsBillingLoading(true);
            goToBillingPortal();
          }}
        >
          {isBillingLoading ? 
            <Flex><Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="#69aaac"
              size="sm"
              marginRight={2}
              /><Text>Loading</Text></Flex> : 
              <Text>Go To Billing Portal</Text>
          }
        </Button>
      </Box>

      <Box>
        <Stack mt={10} alignItems="center">
          <Avatar size="xl" src={user?.photoURL} />
          {user?.name ?
            <Text as="h1" fontSize="3em" fontWeight={700}>{user?.name}</Text> :
            <Text as="h1" textAlign="center" fontSize="3em" fontWeight={700} color="gray.300">Set your name...</Text>}
          <Text as="h3" fontSize="1em" fontWeight={600} color="gray.600">{user?.email}</Text>
        </Stack>

        <Stack my={10} mx={5} alignItems="center">
          <Stack maxW="50em" width="100%" bg="gray.300" borderRadius={5}>
            <Stack padding={5} isInline alignItems="center" justify="space-between">
              <Text textTransform="uppercase" fontWeight="700">Settings</Text>
              <Tag textTransform="uppercase">Free</Tag>
            </Stack>

            <Stack padding={5} bg="white" mt="0 !important">
              <Grid templateColumns="repeat(2, 1fr)">
                <Box w="100%">
                  <Text as="h5" fontWeight="600">Feedback</Text>
                  <Text as="h4" fontSize="3em" fontWeight="600">5</Text>
                  <Text as="span" color="gray.600">10, 000 Limit</Text>
                </Box>
                <Box w="100%">
                  <Text as="h5" fontWeight="600">Sites</Text>
                  <Text as="h4" fontSize="3em" fontWeight="600">5</Text>
                  <Text as="span" color="gray.600">Starter</Text>
                </Box>
              </Grid>
              <Box my="2em !important">
                <Text as="p">
                  Fast Feedback uses Stripe to update, change, or cancel your subscription. You can also update card information and billing addresses through the secure portal.
                </Text>
              </Box>
              <Flex justify="flex-end" flexWrap="wrap">
                <Button m={1}>Log Out</Button>
                <Button 
                  backgroundColor={isBillingLoading ? "white" : "gray.900"}
                  color={isBillingLoading ? "gray.900" : "white"}
                  border={isBillingLoading && "2px solid #69aaac"}
                  fontWeight="500"
                  padding="5px 10px"
                  m={1} 
                  _hover={isBillingLoading ? { bg: 'white', color: 'gray.900' }:{ bg: '#69aaac', color: 'gray.900' }}
                  _active={{ transform: 'scale(0.95)' }}
                  boxShadow="none !important"
                  onClick={() => {
                    setIsBillingLoading(true);
                    goToBillingPortal();
                  }}
                >
                  {isBillingLoading ? 
                    <Flex><Spinner
                      thickness="2px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="#69aaac"
                      size="sm"
                      marginRight={2}
                      /><Text>Loading</Text></Flex> : 
                      <Text>Manage Billing</Text>
                  }
                </Button>
              </Flex>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </DashboardShell>
  )
}