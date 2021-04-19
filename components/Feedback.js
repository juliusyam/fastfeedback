import React from 'react';
import { Box, Heading, Text, Divider } from '@chakra-ui/react';
import dayjs from 'dayjs';

export default function Feedback ({author, text, createdAt}) {

  return <Box borderRadius={4} w="full" py={3}>
    <Heading size="sm" as="h3" mb={0} color="gray.700">
      {author ? author : 'Anonymous'}
    </Heading>
    <Text color="gray.500" mb={1} fontSize="xs">
      {dayjs(createdAt).format('ddd, DD MMM YYYY on HH:mm')}
    </Text>
    <Text color="gray.800" fontSize="14px">{text}</Text>
    <Divider borderColor="gray.300" backgroundColor="#69aaac" mt={3}></Divider>
  </Box>
}