import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, Textarea, Button, useToast, Text, Stack, Flex, Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { getAllFeedback, getAllSites } from '@/lib/database-admin';
import Feedback from '../../components/Feedback';
import { useAuth } from '@/lib/auth';
import dayjs from 'dayjs';
import { createFeedback, getAuthorInfo, getSiteInfo } from '@/lib/database';
import NextLink from 'next/link';
import DashboardShell from '@/componenets/DashboardShell';


export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);
  const sites = await getSiteInfo(siteId);
  
  const authorId = sites.authorId;
  const author = await getAuthorInfo(authorId);

  return {
    props: {
      siteId: siteId,
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

export default function SiteFeedback({ siteId, initialFeedback, siteOnPage, authorOnPage }) {
  const auth = useAuth();
  const user = auth?.user;

  const router = useRouter();
  const inputContent = useRef(null);
  const toast = useToast();

  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [theSite] = useState(siteOnPage);
  const [theAuthor] = useState(authorOnPage);

  console.log(router);

  const onSubmit = () => {
    const newFeedback = {
      route: theSite.name || '/',
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
    <DashboardShell>
      <Box>
        <Stack my={10} mx={5} alignItems="center">
          <Stack width="full" maxW="70em">
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/sites">Sites</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/sites/${siteId}`}>{theSite.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            {theSite && <SiteInfo theSite={theSite} theAuthor={theAuthor} />}

            <Box as="form" onSubmit={onSubmit}>
              <FormControl my={8} >
                <Textarea ref={inputContent} 
                  background="gray.200"
                  height="8em"
                  placeholder="Leave a comment..."
                  type="comment" 
                  name="comment" />
                <Button type="submit" background="gray.900" color="#fdfdfd" my={3}
                  _hover={{ bg: "#69aaac" }}
                  isDisabled={router.isFallback}
                >
                  Leave a Feedback
                </Button>
              </FormControl>
            </Box>
            
            {allFeedback && allFeedback.map((feedback) => (
              <EachFeedback key={feedback.id} feedback={feedback} />
            ))}
          </Stack>
        </Stack>  
      </Box>
    </DashboardShell>
  )
}

function SiteInfo({ theSite, theAuthor }) {

  // console.log(siteId);

  return (
    <Box>
      <Text as="h1" fontWeight="600" fontSize="3em">{theSite.name}</Text>
      <NextLink href={theSite.url} passHref>
        <Text cursor="pointer" as="a" target="_blank" fontWeight="600" fontSize="1em" color="gray.800"
          _hover={{ color: "#69aaac" }}>{theSite.url}</Text>
      </NextLink>
      <Flex my={2} align="center">
        <Avatar size="xs" mr={2} src={theAuthor.photoURL} />
        <Text as="p" color="gray.700">Site created by {theAuthor.name}</Text>
      </Flex>
      
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
