import React from 'react';
import { Box, Link, Text, Switch, IconButton } from "@chakra-ui/react";
import RemoveButton from './RemoveButton';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link';

export default function FeedbackTable ({ feedback }) {

  console.log({feedback});

  return <Table w="100%">
    <thead>
      <Tr backgroundColor="#69aaac">
        <Th color="white">Name</Th>
        <Th color="white">Feedack</Th>
        <Th color="white">Route</Th>
        <Th color="white">Visible</Th>
        <Th color="white">{' '}</Th>
      </Tr>
    </thead> 
    <tbody>
      {feedback.map(eachFeedback => (

        <Box as="tr" key={eachFeedback.id}>
          <Td><Text maxW="200px" isTruncated>{eachFeedback.author ? eachFeedback.author : eachFeedback.authorId}</Text></Td>
          <Td><Text maxW="500px" isTruncated>{eachFeedback.text}</Text></Td>
          <Td><NextLink href="/p/[siteId]" as={`/p/${eachFeedback.siteId}`} passHref>
            <Link color="#69aaac" fontWeight="bold">View</Link>
          </NextLink></Td>
          <Td><Switch defaultChecked={eachFeedback?.status === 'active' ? true : false} size="md" /></Td>
          <Td><RemoveButton id={eachFeedback.id} /></Td>
        </Box>
      ))}
    </tbody>
  </Table>
}