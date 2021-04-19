import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button, useToast, Text, Stack, Flex, Avatar } from '@chakra-ui/react';
import { getAllFeedback, getAllSites } from '@/lib/database-admin';
import Feedback from '../../components/Feedback';
import { useAuth } from '@/lib/auth';
import dayjs from 'dayjs';
import { createFeedback, getAuthorInfo, getSiteInfo } from '@/lib/database';


export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  const sites = await getSiteInfo(siteId);
  
  const authorId = sites.authorId;
  const author = await getAuthorInfo(authorId);

  return {
    props: {
      initialFeedback: feedback,
      siteOnPage: sites,
      authorOnPage: author,
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

export default function SiteFeedback({ initialFeedback, siteOnPage, authorOnPage }) {
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

    inputContent.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);

    toast({
      title: 'Success!',
      description: "You've posted your feedback",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  };

  return (
      <Box>
        <Stack my={10} mx={5} alignItems="flex-start">
          <Stack>
            <Box as="form" onSubmit={onSubmit}>
              <FormControl my={8} >
                <FormLabel>Comment</FormLabel>
                <Input ref={inputContent} type="comment" name="comment" />
                <Button type="submit" background="#69aaac" color="#fdfdfd" my={3}
                  _hover={{ bg: "gray.900" }}
                  isDisabled={router.isFallback}
                >
                  Add Comment
                </Button>
              </FormControl>
            </Box>
            
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