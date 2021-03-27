import React from 'react';
import { Box, Link, Text } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from './Table';
import jessicaDay from 'dayjs';
import NextLink from 'next/link';

export default function SiteTable ({ sites }) {
  return <Table w="100%">
    <thead>
      <Tr backgroundColor="#69aaac">
        <Th color="white">Name</Th>
        <Th color="white">Site Link</Th>
        <Th color="white">Feedback Link</Th>
        <Th color="white">Date Added</Th>
        <Th color="white">{''}</Th>
      </Tr>
    </thead> 
    <tbody>
      {sites.map((site, index) => (
        <Box as="tr" key={index}>
          <Td>{site.name}</Td>
          <Td><Text maxW="200px" isTruncated>{site.url}</Text></Td>
          <Td><NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
            <Link color="#69aaac" fontWeight="bold">View Feedback</Link>
          </NextLink></Td>
          <Td>{jessicaDay(site.createdAt).format('ddd, DD MMM YYYY on HH:mm')}</Td>
        </Box>
      ))}
    </tbody>
  </Table>
}
