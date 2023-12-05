import Head from 'next/head';
import {
    Flex,
    Text,
    Heading,
    Button,
    useMediaQuery,
    Input,
    Stack,
    Switch,
} from '@chakra-ui/react'

import { SideBar } from '../../components/sidebar';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function EditHaircut(){

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    return(
        <>
            <Head>
                <title>Editando modelo de corte - BarberPRO</title>
            </Head>
            <SideBar>
                <Flex direction="column"  alignItems="flex-start" justifyContent="flex-start" >

                    <Flex 
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        alignItems={isMobile ? "flex-start" : "center" }
                        mb={isMobile ? 4 : 0}
                    >

                        <Link href="/haircuts" >
                            <Button mr={3} p={4} display="flex" alignItems="center" justifyContent="center" bg="#000" color="#FFF" _hover={{ bg: "#000" }} >
                                <FiChevronLeft size={24} color="#FFF" />
                                Voltar
                            </Button>
                        </Link>
                        <Heading fontSize={isMobile ? "22px" : "3xl" } color="white" >
                            Editar Corte
                        </Heading>
                    </Flex>

                    <Flex mt={4} maxW="700px" pt={8} pb={8} w="100%" bg="barber.400" direction="column" align="center" justify="center" >
                        <Heading fontSize={isMobile ? "22px" : "3xl" } color="white" mb={4} >
                             Editar Corte
                        </Heading>

                        <Flex w="80%" direction="column"  >

                            <Input
                               placeholder='Nome do corte'
                               bg="gray.900" 
                               color="white"
                               mb={33}
                               size="lg"
                               type='text'
                               w="100%"
                            />

                            <Input
                               placeholder='Valor do seu corte ex 44.99'
                               bg="gray.900" 
                               color="white"
                               mb={3}
                               size="lg"
                               type='number'
                               w="100%"
                            />

                            <Stack mb={6} align="center" direction="row" >
                                <Text fontWeight="bold" color="white" >Desativar</Text>
                                <Switch
                                    size="lg"
                                    colorScheme="red"
                                />
                            </Stack>

                            <Button
                                mb={6}
                                w="100%"
                                bg="button.cta"
                                color="gray.900"
                                _hover={{ bg: "button.cta" }}
                            >
                                Salvar
                            </Button>

                        </Flex>

                    </Flex>

                </Flex>
            </SideBar>
        </>
    )
}