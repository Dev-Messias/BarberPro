import { useState, ChangeEvent } from 'react'
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
    useToast,
} from '@chakra-ui/react'

import { SideBar } from '../../components/sidebar';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';

import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'

interface HaircutProps{
    id: string;
    name: string;
    price: string | number ;
    status: boolean;
    user_id: string;
}

interface SubscriptionProps{
    id: string;
    status: string;
}


interface EditHaircutProps{
    haircut: HaircutProps;
    subscription: SubscriptionProps | null;
}

export default function EditHaircut({ subscription, haircut }: EditHaircutProps){

    const [isMobile] = useMediaQuery("(max-width: 500px)");

    const [name, setName] = useState(haircut?.name);
    const [price, setPrice] = useState(haircut?.price);
    const [status, setStatus] = useState(haircut?.status);

    const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled" );
    //console.log(haircut)

    const toast = useToast()

    function handleChangeStatus(e: ChangeEvent<HTMLInputElement>){
        if(e.target.value === 'disabled'){
            setDisableHaircut("enabled")
            setStatus(false);
        }else{
            setDisableHaircut("disabled")
            setStatus(true);
        }
    }

    async function handleUpdate(){
        if(name === '' || price === ''){
            toast({
                title: `Erro - Campos de texto vazios☹️!!`,
                position:"top-right",
                status: 'error',
                isClosable: true,
              })
            return;
        }

        try {

            const apiClient = setupAPIClient();
            await apiClient.put('/haircut', {
                name: name,
                price: Number(price),
                status: status,
                haircut_id: haircut?.id
            })

            toast({
                title: `Corte atualizado com sucesso😉!!`,
                position:"top-right",
                status: 'success',
                isClosable: true,
              })

            //alert("Corte atualizado com sucess!")
            
        } catch (err) {
            console.log(err)
        }
    }

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
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                            />

                            <Input
                               placeholder='Valor do seu corte ex 44.99'
                               bg="gray.900" 
                               color="white"
                               mb={3}
                               size="lg"
                               type='number'
                               w="100%"
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                            />

                            <Stack mb={6} align="center" direction="row" >
                                <Text fontWeight="bold" color="white" >Desativar</Text>
                                <Switch
                                    size="lg"
                                    colorScheme="red"
                                    isDisabled={subscription?.status !== 'active' }
                                    value={disableHaircut}
                                    isChecked={disableHaircut === 'disabled' ? false : true }
                                    onChange={(e: ChangeEvent<HTMLInputElement> ) => handleChangeStatus(e)}
                                />
                            </Stack>

                            <Button
                                mb={6}
                                w="100%"
                                bg="button.cta"
                                color="gray.900"
                                _hover={{ bg: "button.cta" }}
                                isDisabled={subscription?.status !== 'active' }
                                onClick={handleUpdate}
                            >
                                Salvar
                            </Button>

                            {subscription?.status !== 'active' && (
                            <Flex direction="row" align="center" justifyContent="center" >
                                <Link href="/planos" >
                                    <Text fontWeight="bold" color="#31FB6A" cursor='pointer' ml={1} mr={1} > Seja premium </Text>
                                </Link>

                                <Text color="white" >
                                     e tenha todos acessos libarados
                                </Text>
                            </Flex>
                        )}

                        </Flex>

                    </Flex>

                </Flex>
            </SideBar>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {

    const { id } = ctx.params;

    //buscando dados do item com base no id
    try {

        const apiClient = setupAPIClient(ctx);

        const check = await apiClient.get('/haircut/check');

        const response = await apiClient.get('/haircut/detail', {
            params:{
                haircut_id: id,
                
            }
        })

        //console.log(response.data);
       // console.log(check.data);

       return{
        props:{
            haircut: response.data,
            subscription: check.data?.subscriptions
        }
       }


       
    } catch (err) {
        return{
            redirect:{
                destination:'/dashboard',
                permanent: false
            }
        }
    }
})