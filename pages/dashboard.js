import EmptyState from '@/componenets/EmptyState';
import UpgradeEmptyState from '@/componenets/UpgradeEmptyState';
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
  const isPaidAccount = user?.stripeRole;

  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  // console.log(data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableContainer isPaidAccount={isPaidAccount}>
          <SiteTableSkeleton />
        </SiteTableContainer>
      </DashboardShell>
    )
  }

  if (data?.sites?.length !== 0) {
    return (
      <DashboardShell>
        <SiteTableContainer isPaidAccount={isPaidAccount}>
          <SiteTable sites={data.sites} />
        </SiteTableContainer>
      </DashboardShell>
    )
  }

  if (data?.sites?.length === 0) {
    return (
      <DashboardShell>
        <SiteTableContainer isPaidAccount={isPaidAccount}>  
          {isPaidAccount ? 
            <EmptyState /> : <UpgradeEmptyState />}
        </SiteTableContainer>
      </DashboardShell>
    )
  }
}
