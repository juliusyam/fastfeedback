import EmptyState from '@/componenets/EmptyState';
import SiteTableContainer from '../components/SiteTableContainer';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import SiteTable from '../components/SiteTable';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';

export default function Dashboard() {
  const auth = useAuth();
  const user = auth?.user;

  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  // console.log(data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableContainer>
          <SiteTableSkeleton />
        </SiteTableContainer>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableContainer>
        {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </SiteTableContainer>
    </DashboardShell>
  )
}
