import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { getAllFeedback, getAllSites } from '@/lib/database-admin';
import Feedback from '../../components/Feedback';
import { useAuth } from '@/lib/auth';
import dayjs from 'dayjs';
import { createFeedback } from '@/lib/database';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
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
    fallback: false 
  };
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth();
  const user = auth?.user;

  const router = useRouter();
  const inputContent = useRef(null);
  const toast = useToast();

  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = () => {
    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      text: inputContent.current.value,
      createdAt: dayjs().format(),
      provider: user.provider,
      status: 'pending'
    }

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);

    toast({
      title: 'Success!',
      description: "You've posted your feedback",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    // mutate('/api/sites', async (data) => { 
    //   return {sites: [...data.sites, newSite] };
    // }, false);
  };

  return <Box display="flex" flexDirection="column" w="full" maxW="700px" margin="0 auto">
    <Box as="form" onSubmit={onSubmit}>
      <FormControl my={8} >
        <FormLabel>Comment</FormLabel>
        <Input ref={inputContent} type="comment" name="comment" />
        <Button type="submit" background="#69aaac" color="#fdfdfd" my={3}
          _hover={{ bg: "gray.900" }}
        >
          Add Comment
        </Button>
      </FormControl>
    </Box>
    
    {allFeedback.map((feedback) => (
      <EachFeedback key={feedback.id} feedback={feedback} />
    ))}
  </Box>
}

function EachFeedback({ feedback }) {
  
  return <Feedback 
  key={feedback.id} 
  author={feedback.author} 
  text={feedback.text} 
  createdAt={feedback.createdAt}/>
}
