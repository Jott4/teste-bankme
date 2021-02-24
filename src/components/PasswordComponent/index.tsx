import React, { useState } from "react";

import {
  FormLabel,
  FormControl,
  InputGroup,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

const PasswordComponent: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <FormControl id="password">
      <FormLabel>Senha</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4rem"
          type={show ? "text" : "password"}
          _hover={{ borderColor: "blue.100" }}
        />
        <InputRightElement width="3.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShow(!show)}
           
          >
            {show ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordComponent;
