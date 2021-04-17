import React, { useState, useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, IconButton, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteFeedback } from '../lib/database';
import { mutate } from 'swr';
import { useAuth } from '../lib/auth';

export default function RemoveButton({id}) {
  const auth = useAuth();
  const user = auth?.user;

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    console.log('delete');
    deleteFeedback(id);
    mutate(['/api/feedback', user.token], async (data) => {
      return {
        feedback: data.feedback.filter(eachFeedback => eachFeedback.id !== id)
      };
    })
    setIsOpen(false);
  }
  const cancelRef = useRef()

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        colorScheme="red"
        aria-label="Delete Feedback"
        icon={<DeleteIcon />}
        variant="ghost" />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}