import React, { useRef } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createSite } from '../lib/database';

export default function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  
  return (
    <>
      <Button onClick={onOpen} variant="solid" size="md">
        Add Your First Site Yoohoo!
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="medium">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateSiteForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function CreateSiteForm({onClose}) {
  const { register, handleSubmit, errors } = useForm();
  const toast = useToast();

  const onSubmit = (values) => {
    createSite(values);
    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    console.log(values);
    onClose();
  };

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input ref={register({ required: true })} placeholder="My site" name="site"  />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Link</FormLabel>
        <Input ref={register({ required: true })} placeholder="https://yourwebsite.co.uk" name="url" />
        {errors.exampleRequired && <span>This field is required</span>}
      </FormControl>
      <ModalFooter>
        <Button type="submit" mx={1} background="#69aaac" color="#fdfdfd" mr={0}>
          Save
        </Button>
      </ModalFooter>
    </form>
  </>);
}