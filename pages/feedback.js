import EmptyState from '@/componenets/EmptyState';
import FeedbackTableContainer from '../components/FeedbackTableContainer';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import FeedbackTable from '../components/FeedbackTable';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { useAuth } from '../lib/auth';

export default function Feedback() {
  const auth = useAuth();
  const user = auth?.user;

  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  // console.log(data?.feedback);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableContainer>
          <SiteTableSkeleton />
        </FeedbackTableContainer>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <FeedbackTableContainer>
        {data.feedback ? <FeedbackTable feedback={data?.feedback} /> : <EmptyState />}
      </FeedbackTableContainer>
    </DashboardShell>
  )
}
