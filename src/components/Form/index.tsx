import React, { useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

import Router from "next/router";
import cookie from "js-cookie";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import LoginHero from "../LoginHero";
import { useRouter } from 'next/router'
const Form: React.FC = () => {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <LoginHero />
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="8" w={{ sm: "full" }}>
        <Box
          bg={"white"}
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
          margin="10px"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetch("/api/auth", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              })
                .then((r) => {
                  if(r.status === 200) {
                    useRouter()
                  }
                  return r.json();
                })
                .then((data) => {
                  if (data && data.error) {
                    setLoginError(data.message);
                  }
                  if (data && data.token) {
                    //set cookie
                    cookie.set("token", data.token, { expires: 2 });
                    Router.push("/");
                  }
                });
            }}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4rem"
                    type={show ? "text" : "password"}
                    _hover={{ borderColor: "blue.100" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Entrar
              </Button>
              {loginError && <Text color="red.400">{loginError}</Text>}
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Form;
