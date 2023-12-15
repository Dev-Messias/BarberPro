import { useState } from 'react'
import Head from 'next/head';
import { 
    Flex, 
    Text,
    Heading,
    Button,
    Link as ChakraLink,
    useMediaQuery,
} from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { SideBar } from '../../components/sidebar';
import Link from 'next/link';
import { IoMdPerson } from 'react-icons/io';

import { setupAPIClient } from '../../services/api';

export interface ScheduleItem{
    id: string;
    customer: string;
    haircut:{
        id: string;
        name: string;
        price: string | number;
        user_id: string;
    }
}

interface DashboardProps{
    schedule: ScheduleItem[];
}

export default function Dashboard({schedule}: DashboardProps){

    const [list, setList] = useState(schedule);

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    return(
        <>
            <Head>
                <title>BarberPro - Minha Barbearia</title>
            </Head>
           <SideBar>
            <Flex direction="column" align="flex-start" justify="flex-start" >
                <Flex w="100%" direction="row" align="center" justify="flex-start" >

                    <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="white" >
                        Agenda
                    </Heading>

                    <Link href="/new" >
                        <Button>
                            Registrar
                        </Button>
                    </Link>'

                </Flex>

                {list.map(item => (
                    <ChakraLink
                    key={item?.id}
                    w="100%"
                    m={0}
                    p={0}
                    mt={0}
                    bg="transparent"
                    style={{ textDecoration: 'none' }}
                   >
                       <Flex  
                           w="100%"
                           direction={isMobile ? "column" : "row" }
                           p={4}
                           rounded={4}
                           mb={4}
                           bg="barber.400"
                           justify="space-between"
                           align={isMobile ? "flex-start" : "center"}
                       >
   
                           <Flex direction="row"  mb={isMobile ? 2 : 0 } align="center" justify="center" >
                               <IoMdPerson size={28} color="#f1f1f1" />
                               <Text color="white" fontWeight="bold" ml={4} noOfLines={1} >{item.customer}</Text>
                           </Flex>
   
                           <Text color="white" fontWeight="bold" ml={4} noOfLines={2} mb={isMobile ? 2 : 0 } >{item?.haircut?.name}</Text>
                           <Text color="white" fontWeight="bold" ml={4} noOfLines={1} mb={isMobile ? 2 : 0 } >R$ {item?.haircut.price}</Text>
   
                       </Flex>
                   </ChakraLink>
                ))}

             </Flex>
           </SideBar>
        </>
    )
}

//deixando rota privada
//só usuarios logados podem acessar essa rota
export const getServerSideProps = canSSRAuth(async (ctx) =>{

    try {

        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/schedule')

        //console.log(response.data)

        return{
            props:{
                schedule : response.data
            }
        }
        
    } catch (err) {
        console.log(err);
        return{
            props:{
                schedule: []
            }
        }
    }

})