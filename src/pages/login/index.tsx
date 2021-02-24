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
  Flex,
  Heading,
} from "@chakra-ui/react";

import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import api from "../../service/http";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Flex alignItems="center" justifyContent="center" direction="column">
        <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
          Login
        </Heading>
        <Text
          mt="4"
          align="center"
          maxW="md"
          fontWeight="medium"
          textAlign="center"
        >
          Não tem uma conta?
        </Text>
        <Box
          marginStart="1"
          href="#"
          color={"blue.600"}
          _hover={{ color: "blue.600" }}
          display={{ base: "block", sm: "revert" }}
        >
          <Link href="/register">Cadastre-se</Link>
        </Box>
      </Flex>
      <Box maxW={{ sm: "md" }} mx={{ sm: "auto" }} mt="8" w={{ sm: "full" }}>
        <Box
          border="1px solid #E2E8F0"
          py="8"
          px={{ base: "4", md: "10" }}
          shadow="base"
          rounded={{ sm: "lg" }}
          margin="10px"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const { data } = await api.post("/me", { email, password });
                console.log(data);

                const local = {
                  userId: data.user._id,
                  email: data.user.email,
                  token: data.token,
                };
                localStorage.setItem("@bankme/user", JSON.stringify(local));
                router.push("/dashboard");
              } catch {

                toast.error("Usuário ou senha inválido", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
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
          
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
