import React, { useRef } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createSite } from '../lib/database';
import { useAuth } from '@/lib/auth';
import dayjs from 'dayjs';
import useSWR, { mutate } from 'swr';
import fetcher from '../utils/fetcher';

export default function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();
  const auth = useAuth();
  const user = auth?.user;
  const { data } = useSWR('/api/sites', fetcher);
  
  return (
    <>
      {data ? <Button 
        backgroundColor="gray.900" color="white" fontWeight="medium" 
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)'}}
        onClick={onOpen} variant="solid" size="md">
          + Add Site
      </Button> : 
      <Button onClick={onOpen} variant="solid" size="md">
        First Sitey Yoohoo
      </Button>}
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
            <CreateSiteForm onClose={onClose} user={user} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

function CreateSiteForm({onClose, user}) {
  const { register, handleSubmit, errors } = useForm();
  const toast = useToast();

  const onSubmit = ({name, url}) => {
    const newSite = {
      authorId: user.uid,
      createdAt: dayjs().format(),
      name,
      url
    }
    const { id } = createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });
    mutate(['/api/sites', user.token], async (data) => { 
      return {sites: [...data.sites, {id, ...newSite}] };
    }, 
    false);
    onClose();
  };

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input ref={register({ required: true })} placeholder="My site" name="name"  />
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