import React, { useCallback } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import formaterXml from "./formaterXml";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
interface ModalInsertProps {
  handle: Function;
  userEmail: String;
}
const ModalInsertFiles: React.FC<ModalInsertProps> = ({
  handle,
  userEmail,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDrop = useCallback((acceptedFiles) => {
    formaterXml(acceptedFiles).then((data) => handle(data));
    onClose();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDir={["column", "column", "row"]}
      >
        <Button
          onClick={() => {
            localStorage.removeItem("@bankme/user");
            router.push("/login");
          }}
        >
          Sair
        </Button>
        <Text>Olá {userEmail}</Text>
        <Button onClick={onOpen} colorScheme="purple">
          Adicionar Nota
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload de NFe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box
                {...getRootProps({ className: "dropzone" })}
                background="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="20px"
                border="dashed 2px #CBD5E0"
                outline="none"
                cursor="pointer"
                height="20vh"
              >
                <input {...getInputProps()} />
                <p>
                  Arraste arquivos para cá, ou clique para selecionar um arquivo
                </p>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray">Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalInsertFiles;
