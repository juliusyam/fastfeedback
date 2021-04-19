import EmptyFeedbackState from '@/componenets/EmptyFeedbackState';
import SiteFeedbackTableContainer from '@/componenets/SiteFeedbackTableContainer';
import SiteTableSkeleton from '@/componenets/SiteTableSkeleton';
import FeedbackTable from '@/componenets/FeedbackTable';
import DashboardShell from '@/componenets/DashboardShell';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';

export default function SiteFeedback() {
  const auth = useAuth();
  const user = auth?.user;

  const router = useRouter();
  const siteId = router.query.siteId;

  const { data } = useSWR(user ? [`/api/feedback/${siteId}`, user.token] : null, fetcher);

  // console.log(data?.feedback);

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableContainer>
          <SiteTableSkeleton />
        </SiteFeedbackTableContainer>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableContainer siteName={data?.site.name}>
        {data.feedback ? <FeedbackTable feedback={data?.feedback} /> : <EmptyFeedbackState />}
      </SiteFeedbackTableContainer>
    </DashboardShell>
  )
}