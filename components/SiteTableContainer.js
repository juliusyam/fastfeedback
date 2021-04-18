import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal';
import { useAuth } from '../lib/auth';

export default function SiteTableContainer ({ children }) {
  const auth = useAuth();
  const stripeRole = auth?.user?.stripeRole;

  return (
    <Flex
      backgroundColor="#e8e8e8"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
      p="50px 30px"
    >
      <Box maxWidth="900px" m="0 auto" width="100%" h="90vh">
        <Flex justify="space-between" alignItems="center">
          <Box>
            <Box>
              <Text>Sites /</Text>
            </Box>
            <Box>
              <Text fontSize="35px" fontWeight="bold">
                Sites
              </Text>
            </Box>
          </Box>
          <Box>
            {stripeRole && <AddSiteModal>+ Add Site</AddSiteModal>}
          </Box>
        </Flex>
        <Box>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}