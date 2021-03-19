import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Text, Flex, Code, Heading, Icon, Button } from '@chakra-ui/react';
import EmptyState from '@/componenets/EmptyState';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import SiteTable from '../components/SiteTable';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';

export default function Dashboard() {
  const auth = useAuth();
  const { data } = useSWR('/api/sites', fetcher);

  console.log(data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  // if (!auth.user) {
  //   return (
  //     <DashboardShell>
  //       <SiteTableSkeleton />
  //     </DashboardShell>
  //   )
  // }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
