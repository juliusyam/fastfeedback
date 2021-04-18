import React, { useState } from 'react';
import DashboardShell from '../components/DashboardShell';
import { useAuth } from '../lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/database';
import { Box, Button, Spinner, Text, Flex, Avatar, Stack, Tag, Grid } from '@chakra-ui/react';

export default function Account() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <DashboardShell>

      <Box>
        <Stack mt={10} alignItems="center">
          <Avatar size="xl" src={user?.photoURL} />
          {user?.name ?
            <Text as="h1" fontSize="3em" fontWeight={700}>{user?.name}</Text> :
            <Text as="h1" textAlign="center" fontSize="3em" fontWeight={700} color="gray.300">Set your name...</Text>}
          <Text as="h3" fontSize="1em" fontWeight={600} color="gray.600">{user?.email}</Text>
        </Stack>
      </Box>

      <SettingsTable user={user} />
    </DashboardShell>
  )
}

function SettingsTable ({ user }) {
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  return (
    <Box>
      <Stack my={10} mx={5} alignItems="center">
        <Stack maxW="50em" width="100%" bg="gray.300" borderRadius={5}>
          <Stack padding={5} isInline alignItems="center" justify="space-between">
            <Text textTransform="uppercase" fontWeight="700">Settings</Text>
            {user?.stripeRole?.includes('starter') && 
              <Tag bg="#97e8b2" color="#00521b" fontWeight={600} textTransform="uppercase">{user?.stripeRole}</Tag>}
              {user?.stripeRole?.includes('premium') && 
              <Tag bg="#d19600" color="#fceabb" fontWeight={600} textTransform="uppercase">{user?.stripeRole}</Tag>}
            {user?.stripeRole ? 
              null : <Tag bg="#7da6ff" color="#001e5e" fontWeight={600} textTransform="uppercase">Free</Tag>}
          </Stack>

          <Stack padding={5} bg="white" mt="0 !important">
            <Grid templateColumns="repeat(2, 1fr)">
              <Box w="100%">
                <Text as="h5" fontWeight="600">Feedback</Text>
                <Text as="h4" fontSize="3em" fontWeight="600">∞</Text>
                <Text as="span" color="gray.600">10, 000 Limit</Text>
              </Box>
              <Box w="100%">
                <Text as="h5" fontWeight="600">Sites</Text>
                <Text as="h4" fontSize="3em" fontWeight="600">1/∞</Text>
                <Text as="span" color="gray.600">Unlimited Sites</Text>
              </Box>
            </Grid>
            <Box my="2em !important">
              <Text as="p">
                Fast Feedback uses Stripe to update, change, or cancel your subscription. You can also update card information and billing addresses through the secure portal.
              </Text>
            </Box>
            <Flex justify="flex-end" flexWrap="wrap">
              <Button m={1}>Log Out</Button>
              {user?.stripeRole ? 
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
                </Button> :
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
                    createCheckoutSession(user.uid);
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
                      <Text>Upgrade to Starter</Text>
                  }
                </Button>
                }
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}