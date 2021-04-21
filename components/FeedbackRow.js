import React, { useState } from 'react';
import { Box, Link, Text, Switch, Code } from "@chakra-ui/react";
import RemoveButton from './RemoveButton';
import { Td } from './Table';
import NextLink from 'next/link';
import { updateFeedback } from '@/lib/database';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

export default function FeedbackRow ({ eachFeedback }) {  

  const auth = useAuth();
  const status = eachFeedback?.status;
  const [checked, setChecked] = useState(status === 'active');
  
  async function toggleFeedback(event)  {
    event.preventDefault();
    setChecked(!checked);
    await updateFeedback(eachFeedback.id, {status: !checked ? 'active' : 'pending'});
    mutate(['/api/feedback', auth?.user?.token]);
    console.log(checked, eachFeedback.id);
  }

  return (
    <Box as="tr">
      <Td><Text maxW="200px" isTruncated>{eachFeedback.author ? eachFeedback.author : 'Anonymous'}</Text></Td>
      <Td><Text maxW="500px" isTruncated>{eachFeedback.text}</Text></Td>
      <Td><NextLink href="/sites/[siteId]" as={`/sites/${eachFeedback.siteId}`} passHref>
        <Link fontWeight="600"><Code maxW="15em">{eachFeedback.route ? eachFeedback.route : '/'}</Code></Link>
      </NextLink></Td>
      <Td>
        <Switch 
          colorScheme="green" 
          onClick={toggleFeedback}
          isChecked={checked}
          size="md" />
      </Td>
      <Td><RemoveButton id={eachFeedback.id} /></Td>
    </Box>
  )
}