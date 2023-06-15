import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} justifyContent={"flex-end"}>
            <Button fontWeight={"bold"} variant="unstyled" color="white" mx={"8"} _hover={{color:'teal.300'}}>
                <Link to="/">Home</Link>
            </Button>
            <Button fontWeight={"bold"} variant="unstyled" color="white" mx={"8"} _hover={{color:'teal.300'}}>
                <Link to="/exchanges">Exchanges</Link>
            </Button>
            <Button fontWeight={"bold"} variant="unstyled" color="white" mx={"8"} _hover={{color:'teal.300'}}>
                <Link to="/coins">Coins</Link>
            </Button>
        </HStack>
    )
}