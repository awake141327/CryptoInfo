import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index.js'
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio } from '@chakra-ui/react'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import { Link } from 'react-router-dom'

export default function Coins() {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState('inr')
    const currencySymbol = currency==='inr' ? "₹" : currency==='eur'? "€" : "$"
    const btns =  new Array(101).fill(1)
    const changePage = (page) => {
        setPage(page)
        setLoading(true)
    }

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }

        fetchCoins()
    }, [currency, page])

    if (error) {
        return (
            <Error message={"Error while Fetching Coins"}/>
        )
    }

    return (
        <Container maxWidth={"container.lg"}>
            {loading ? <Loader /> : <>
                <RadioGroup value={currency} onChange={setCurrency} p={"8"}> 
                    <HStack spacing={"4"}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                    {coins.map((i)=> (
                        <CoinCard 
                            key={i.id}
                            id={i.id}
                            name={i.name}
                            img={i.image}
                            symbol={i.symbol}
                            price={i.current_price}
                            currencySymbol= {currencySymbol}
                        />
                    ))}
                </HStack>
                <HStack overflowX={"auto"} p={"8"}>
                    {btns.map((i,index) => (
                        <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(index+1)}>{index+1}</Button>
                    ))}
                </HStack>
            </>}
        </Container>
    )
}

const CoinCard = ({id, name, img, price, symbol, currencySymbol = "₹"}) => {
    return (
        <Link to={`/coin/${id}`}>
            <VStack 
                w={"52"} shadow={"lg"} p={"8"} m={"4"} borderRadius={"lg"} transition={"all 0.3s"} 
                css={{
                    "&:hover": {
                        transform: "scale(1.1)",
                    }
                }}
            > 
                <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
                <Heading textTransform={"uppercase"} size={"md"} noOfLines={1}>{symbol}</Heading>
                <Text noOfLines={1}>{name}</Text>
                <Text noOfLines={1}>{price ? `${currencySymbol}${price}`: 'NA'}</Text>

            </VStack>
        </Link>
    )
}
