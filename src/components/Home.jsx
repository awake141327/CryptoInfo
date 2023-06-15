import React from 'react'
import {Text, VStack} from '@chakra-ui/react'

export default function Home() {
    return (
        <VStack h={"90vh"} justifyContent={"center"}>
            <Text fontSize={"5xl"} fontWeight={"extrabold"}>Welcome to CryptoInfo</Text>
            <Text fontSize={"md"}>Get information about Cryptocurrency exchanges and coins.</Text>
        </VStack>
    )
}