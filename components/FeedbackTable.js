import React from 'react';
import { Table, Tr, Th } from './Table';
import FeedbackRow from './FeedbackRow';

export default function FeedbackTable ({ feedback }) {
  
  // console.log({feedback});

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
        <FeedbackRow 
          eachFeedback={eachFeedback} 
          key={eachFeedback.id} />
      ))}
    </tbody>
  </Table>
}