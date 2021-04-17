import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/database';
import { Box, Button } from '@chakra-ui/react';

export default function Account() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <DashboardShell>
      <Box>
        <Button 
          backgroundColor="gray.900" 
          color="white"
          fontWeight="500"
          padding="5px 10px"
          mx={2} 
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={() => createCheckoutSession(user.uid)}
        >
          Upgrade to Starter
        </Button>
        <Button 
          backgroundColor="gray.900" 
          color="white"
          fontWeight="500"
          padding="5px 10px"
          mx={2} 
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          onClick={() => goToBillingPortal()}
        >
          Go To Billing Portal
        </Button>
      </Box>
    </DashboardShell>
  )
}