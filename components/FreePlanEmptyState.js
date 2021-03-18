import React from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import DashboardShell from '../components/DashboardShell';

function FreePlanEmptyState() {

  return <>
    <DashboardShell>
      <Box backgroundColor="#ffffff" p="20px" m="30px 0">
        <Flex flexDirection="column">
          <Text fontWeight="bold" fontSize="20px">
            Get Feedback on your site instantly.
          </Text>
          <Text>Start today, then grow with us</Text>
        </Flex>
        <Button variant="solid" size="md">
          Upgrade to Starter
        </Button>
      </Box>
    </DashboardShell>
  </>
}
export default FreePlanEmptyState;