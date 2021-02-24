import React from 'react';
import { Flex, Heading, Text, Box} from "@chakra-ui/react";

const LoginHero: React.FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center" direction="column">
    <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold" >
      Login
    </Heading>
    <Text
      mt="4"
      align="center"
      maxW="md"
      fontWeight="medium"
      textAlign="center"

    >
      <span>Não tem uma conta?</span>
      <Box
        marginStart="1"
        href="#"
        color={"blue.600"}
        _hover={{ color: "blue.600" }}
        display={{ base: "block", sm: "revert" }}
      >
        Cadastre-se
      </Box>
    </Text>
  </Flex>
  );
}

export default LoginHero;
