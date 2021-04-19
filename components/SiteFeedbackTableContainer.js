import React from 'react'
import { Box, Text, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export default function SiteFeedbackTableContainer ({ children, siteName }) {

  return (
    <Flex
      backgroundColor="#e8e8e8"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
      p="50px 30px"
    >
      <Box maxWidth="900px" m="0 auto" width="100%" h="90vh">
        <Flex justify="space-between" alignItems="center">
          <Box>
            <Box>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/feedback">Feedback</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Box>
              <Text fontSize="35px" fontWeight="bold">
                {siteName || '-'}
              </Text>
            </Box>
          </Box>
        </Flex>
        <Box>
          {children}
        </Box>
      </Box>
    </Flex>
  )
}