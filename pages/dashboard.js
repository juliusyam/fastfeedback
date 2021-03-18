import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Text, Flex, Code, Heading, Icon, Button } from '@chakra-ui/react';
import EmptyState from '@/componenets/EmptyState';

export default function Dashboard() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...'
  }

  return (
    <EmptyState />
  )
}
