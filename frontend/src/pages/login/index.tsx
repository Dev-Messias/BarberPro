import { useState } from 'react'
import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../../public/images/logo.svg'
import { Flex, Text, Center, Input, Button } from '@chakra-ui/react';

import Link from 'next/link';

export default function Login(){

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   //função do botão
   function handleLogin(){
      console.log(email)
      console.log(password)
   }

    return(
        <>
         <Head>
            <title>BarberPro - Faça login para acessar</title>
         </Head>
         <Flex background="barber.900" height='100vh' alignItems="center" justifyContent="center">
            <Flex width={640} direction="column" p={14} rounded={10} >
                 <Center p={4} >
                    <Image
                        src={logoImg}
                        quality={100}
                        width={320}
                        objectFit='fill'
                        alt='Logo barberpro'
                    />
                 </Center>
                 <Input
                    background="barber.400"
                    variant="filled"
                    size="lg"
                    placeholder='email@email.com'
                    type='email'
                    textColor="button.default"
                    mb={3}
                    _hover={{ bg: "#1b1c29" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />

                <Input
                    background="barber.400"
                    variant="filled"
                    size="lg"
                    placeholder='********'
                    type='text'
                    textColor="button.default"
                    mb={6}
                    _hover={{ bg: "#1b1c29" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />

                 <Button
                    background="button.cta"
                    mb={6}
                    color="gray.900"
                    size="lg"
                    _hover={{ bg: "#ffb13e" }}
                    onClick={handleLogin}
                 >
                    Acessar
                 </Button>

                 <Center mt={4} >
                    <Link href="/register" >
                        <Text cursor="pointer" color="barber.100" >Ainda não possui conta? <strong>Cadastre-se</strong></Text>
                    </Link>
                 </Center>
            </Flex>
         </Flex>
        </>
    )
}