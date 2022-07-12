import {
    Box, Center, CircularProgress, Flex, HStack, Spacer, Stack, Switch, Text, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../Components/Button';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import $ from 'jquery';

export default function VerifyId() {
    const [Resident, setResident] = useState(false);
    const [Landlord, setLandlord] = useState(false);
    const [Data, setData] = useState([]);
    const [Security, setSecurity] = useState(false);
    const [Show, setShow] = useState(true);
    const [Checked, setChecked] = useState(false);

    const [ResidentLen, setResidentLen] = useState("");
    const [LandlordLen, setLandlordLen] = useState("");
    const [SecurityLen, setSecurityLen] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState("");



    const [Success, setSuccess] = useState(false);

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const checkLength = () => {

        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {

                    setResidentLen(data.resident?.length)
                    setLandlordLen(data.landlord?.length)
                    setSecurityLen(data.security_OPs?.length)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleChange = (e) => {


        setChecked(e.target.checked)



    }

    const [ModalObj, setModalObj] = useState({
        id: "",
        firstName: "",
        lastName: ""
    });

<<<<<<< HEAD
    const update_status = (_id)=> {
=======
     const openModal = (id, firstName, lastName, userType)=>{
     
        setModalObj({
            id: id,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
        })

        onOpen();
     }

    const update_status = (id, firstName, lastName, userType) => {

      

        setSuccessMsg(`${firstName} ${lastName}`)
>>>>>>> a31cbdcd960927ab2ee4c566e3b653a07f870deb

        fetch('https://api.solomonleke.com.ng/user/toggleUser', {

            method: "POST",

            headers: {
                "Content-Type": "application/JSON"
            },
<<<<<<< HEAD
    
            body: JSON.stringify(_id)
    
=======

            body: JSON.stringify({ _id: id }),

>>>>>>> a31cbdcd960927ab2ee4c566e3b653a07f870deb
        })

            .then(response => response.json())
            .then(data => {

                console.log("data", data)
                onClose()


                if(userType == "Security operative"){
                    handleSecurity()
                }else if(userType == "Resident"){
                    handleResident()
                }else if(userType == "Landlord"){
                    handleLandlord()
                }
                setSuccess(true)

                setTimeout(() => {
                   
                    setSuccess(false)

                }, 5000);


            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }


    const handleLandlord = () => {

        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.landlord)
                }
                setShow(false)
                setLandlord(true)
                setResident(false)
                setSecurity(false)

                setIsLoading(false)

            })


            .catch((error) => {
                console.error('Error:', error);
            });


    }
    const handleResident = () => {
        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.resident)
                }
                setShow(false)
                setLandlord(false)
                setResident(true)
                setSecurity(false)
                setIsLoading(false)

            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }
    const handleSecurity = () => {

        // setData([])
        setIsLoading(true)
        fetch('https://api.solomonleke.com.ng/user/vUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {
                    setData(data.security_OPs)
                }
                setShow(false)
                setLandlord(false)
                setResident(false)
                setSecurity(true)
                setIsLoading(false)


            })

            .catch((error) => {
                console.error('Error:', error);
            });



    }

    const back = () => {
        setShow(true)
    }

    const VerifyAll = () => {
        setChecked(true)
    }


    const checkLengthRedux = () => {

        fetch('https://api.solomonleke.com.ng/user/endUser')
            .then(response => response.json())
            .then(data => {
                if (data.status == 200) {

                    dispatch(
                        // collect two parameters (type and payload)

                        { type: "VERIFIED_COUNT", payload: { data: data.resident?.length + data.landlord?.length + data.security_OPs?.length } }
                    );
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }



    useEffect(() => {

        checkLength()
        checkLengthRedux()
    }, [Checked]);
    return (
        <MainLayout>
            <Seo title="Verify IDs" description='Verify IDs' />


            {
                Show ? (
                    <Center mt={["100px", "131px"]}>
                        <Box>

                            <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#575757" textAlign={"center"}>Verify IDs</Text>



                            {
                                isLoading ? (
                                    <Center mt="20vh">
                                        <CircularProgress isIndeterminate={true} value={49} size='150px' thickness='4px' />
                                    </Center>
                                ) : (
                                    <Stack spacing={'15px'} cursor="pointer" mt="39px">

                                        <Text color={"#939393"}>Select ID Category you intend to Verify</Text>



                                        <Box pos={"relative"}>
                                            <Button onClick={handleLandlord}>LandLord</Button>
                                            {
                                                LandlordLen >= 1 && (
                                                    <Text h={"18px"} w={"18px"}
                                                        rounded={"100%"} bg="#EDEDED"
                                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                        pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                                        fontSize={"12"}>{LandlordLen} </Text>
                                                )
                                            }


                                        </Box>
                                        <Box pos={"relative"}>
                                            <Button onClick={handleResident}>Resident</Button>

                                            {
                                                ResidentLen >= 1 && (

                                                    <Text h={"18px"} w={"18px"}
                                                        rounded={"100%"} bg="#EDEDED"
                                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                        pos="absolute" right="-8px" top="-8px" textAlign={"center"} pt="1px"
                                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                                        fontSize={"12"}>{ResidentLen}</Text>
                                                )
                                            }

                                        </Box>
                                        <Box pos={"relative"}>
                                            <Button onClick={handleSecurity}>Security</Button>

                                            {
                                                SecurityLen >= 1 && (
                                                    <Text h={"18px"} w={"18px"}
                                                        rounded={"100%"} bg="#EDEDED"
                                                        boxShadow={"1px 1px 4px 1px rgba(84, 0, 0, 0.25);"}
                                                        pos="absolute" right="-8px" top="-8px" pt="1px" textAlign={"center"}
                                                        fontFamily="body" fontWeight={"400"} color="#000000"
                                                        fontSize={"12"}>{SecurityLen}</Text>
                                                )
                                            }

                                        </Box>
                                    </Stack>
                                )
                            }

                        </Box>
                    </Center>
                ) : (
                    <Center mt={["100px", "131px"]} >

                        <Box>
                            <Text fontFamily={"body"} fontSize="24px" fontWeight={"700"} color="#575757" textAlign={"center"}>Verify IDs</Text>
                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#575757" mt="-8px" textAlign={"center"}>
                                {Resident ? "Resident" : Landlord ? "Landlord" : Security && "Security"}</Text>


                            {
                                Data.length <= 0 ? (

                                    <Text fontFamily={"body"} fontSize="24px" mt="32px" fontWeight={"400"} color="#000000">No Record</Text>

                                ) : (

                                    <Box px={["1%", "5%", "5%", "0%"]}>
                                        <Stack spacing={'14px'} cursor="pointer" mt="18px" >

                                            {
                                                Data?.map((item, i) => (

                                                    <HStack id="verify" spacing="39px" bg={item.Verified == true ? ("#96F4E2") : ("#D6D6D6")} px={"15px"} py="5px" onClick={() => openModal(item._id, item.firstName, item.lastName, item.userType)}>
                                                        <Box>
                                                            <Text fontFamily={"body"} fontSize="14px" fontWeight={"400"} color="#000000">{item.firstName} {item.lastName}</Text>
                                                            <Text fontFamily={"body"} fontSize="10px" fontWeight={"300"} color="#000000">{item.houseNo}, {item.streetName} | 0{item.phone}</Text>

                                                        </Box>

                                                       
                                                        <Spacer />




                                                        <div className={`toggle ${item.Verified && "toggle-on" } `}>

                                                            <div className={`toggle-btn ${item.Verified ? "on":"off"}`}>

                                                            </div>

                                                        </div>

                                                        <Modal motionPreset='slideInBottom' size={"md"} closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} isCentered>
                                                        <ModalOverlay />
                                                        <ModalContent>
                                                            <ModalHeader></ModalHeader>
                                                            <ModalCloseButton />
                                                            <ModalBody pb={6}>
                                                                <Text textAlign={"center"} fontFamily={"body"} fontSize="16px" fontWeight={"400"} color="#424242">Are you sure you want to <br/> Verify <br/> {ModalObj.firstName} {ModalObj.lastName}</Text>
                                                                <Center>
                                                                <Flex mt="33px" px="10%" justifyContent={"space-between"}>

                                                                <Button w='20%' onClick={() => update_status(ModalObj.id, ModalObj.firstName, ModalObj.lastName, ModalObj.userType)}>Yes </Button>
                                                               
                                                                <Button w='20%' onClick={onClose}>No</Button>
                                                                
                                                                </Flex>
                                                                </Center>

                                                
                                                              
                                                            </ModalBody>

                                                            <ModalFooter>
                                                               
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>

                                                    </HStack>


                                                ))
                                            }

                                        </Stack>
                                        <Button mb="18px" mt="65px" onClick={VerifyAll} >Verify All</Button>



                                        {
                                            Success && (

                                                <Text textAlign={"center"} fontFamily="body" fontWeight={400} fontSize="14px" color="#939393">{SuccessMsg} verified successfully</Text>
                                            )
                                        }

                                    </Box>




                                )
                            }






                        </Box>
                    </Center>

                )
            }


            {
                Show == false && (
                    <Box mx={["6%", "10%"]} mt='32px' mb="20px">
                        <Text cursor={"pointer"} fontFamily={"body"} fontSize="16px" fontWeight={"700"} color="#ffffff" bg="#E02828" p="5px" textAlign={"center"} w={["20%", "15%", "8%"]} onClick={back}>Back</Text>
                    </Box>
                )
            }

        </MainLayout>
    );
}
