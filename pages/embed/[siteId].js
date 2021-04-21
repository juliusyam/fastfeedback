import { useState } from 'react';
import { Box, Stack, Link, Text } from '@chakra-ui/react';
import { getAllFeedback, getAllSites } from '@/lib/database-admin';
import Feedback from '../../components/Feedback';
import NextLink from 'next/link';
import { ArrowForwardIcon } from "@chakra-ui/icons";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      siteId: siteId,
      initialFeedback: feedback,
    },
    revalidate: 1
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    }
  }))

  return {
    paths,
    fallback: true
  };
}

export default function SiteFeedback({ siteId, initialFeedback }) {

  const [allFeedback] = useState(initialFeedback);

  return (
      <Box>
        <Stack my={10} mx={5} alignItems="flex-start">
          <Stack>
            <NextLink href={`/sites/${siteId}`}>
              <Link fontWeight="700">Leave a comment<ArrowForwardIcon ml={1} /></Link>
            </NextLink>

            {allFeedback?.length === 0 && 
              <Text>There are no comments for this site yet. Be the first person to leave one!</Text>}

            {allFeedback && allFeedback.map((feedback) => (
              <EachFeedback key={feedback.id} feedback={feedback} />
            ))}
          </Stack>
        </Stack>  
      </Box>
  )
}

function EachFeedback({ feedback }) {
  
  return <Feedback 
    key={feedback.id} 
    author={feedback.author} 
    text={feedback.text} 
    createdAt={feedback.createdAt}/>
}