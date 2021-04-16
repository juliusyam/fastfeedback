import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';
import { createCheckoutSession } from '@/lib/database';
import { Box, Button, Text } from '@chakra-ui/react';

export default function Account() {
  const auth = useAuth();
  const user = auth?.user;

  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  return (
    <DashboardShell>
      <Box>
        <Button 
          backgroundColor="gray.900" 
          color="white"
          fontWeight="500"
          padding="5px 10px"
          mt={4} 
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={() => createCheckoutSession(user.uid)}
        >
          Upgrade to Starter
        </Button>
      </Box>
    </DashboardShell>
  )
}