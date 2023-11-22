import Head from "next/head";
import { SideBar } from '../../components/sidebar';
import Link from 'next/link';
import {
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Switch,
    useMediaQuery,
} from '@chakra-ui/react'

import { IoMdPricetag } from 'react-icons/io'

export default function Haircuts(){

    const [isMobile] =  useMediaQuery("(max-width: 500px)")

    return(
        <>
            <Head>
                <title>Modelos de corte - Minha barbearia</title>
            </Head>
            <SideBar>
                <Flex direction="column" alignItems="flex-start" justifyContent="flex-start" >

                    <Flex
                        direction={isMobile ? 'column' : 'row'}
                        w="97%"
                        alignItems={isMobile ? 'flex-start' : 'center'}
                        justifyContent="flex-start"
                        mb={0}
                    >

                        <Heading
                            fontSize={isMobile ? '22px' : "3xl"}
                            mt={4}
                            mb={4}
                            mr={4}
                            color="orange.900"
                        >
                            Modelos de corte
                        </Heading>

                        <Link href="/haircuts/new" >
                           <Button bgColor="barber.400" color="white"  >
                             Cadastrar Novo
                           </Button>
                        </Link>

                        <Stack ml="auto" align="center" direction="row" >
                            <Text fontWeight="bold" textColor="white" >ATIVOS</Text>
                            <Switch
                                colorScheme="green"
                                size="lg"
                            />
                        </Stack>

                       

                    </Flex>

                   

                </Flex>

                <Link href="/haircuts/123"  >
                     <Flex
                      cursor="pointer"
                      width="100%"
                      p={4}
                      bg="barber.400"
                      direction={isMobile ? "column" : "row"}
                      alignItems={isMobile ? "flex-start" : "center"}
                      rounded="4"
                      marginTop={isMobile ? 4 : 0}
                      mb={2}
                      justifyContent="space-between"
                     >

                        <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center" >
                            <IoMdPricetag size={28} color="#fba931"  />
                          <Text color="white" marginLeft={4} noOfLines={2} >Nome do Corte</Text>
                        </Flex>

                        <Text fontWeight="bold" color="white" >
                            Preço: R$ 59.90
                        </Text>

                     </Flex>
                    </Link>
            </SideBar>
        </>
    )
}