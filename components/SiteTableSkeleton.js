import React from 'react';
import { Box, Skeleton } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from './Table';

function SkeletonRow({width}) {
  
  return <Box as="tr">
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Box> 
}

export default function SiteTableSkeleton() {
  return <Table w="100%">
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th>{''}</Th>
      </Tr>
    </thead> 
    <tbody>
      <SkeletonRow width="75px" />
      <SkeletonRow width="125px" />
      <SkeletonRow width="50px" />
      <SkeletonRow width="100px" />
      <SkeletonRow width="75px" />
    </tbody>
  </Table>
}
