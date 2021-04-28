import React, { useState, useEffect } from 'react'
import styles from "../styles/Game/Game.module.css"
import Head from "next/head"
import { getValue, shuffle } from '../lib/helperFunctions'

export default function game() {
    const [pull, setPull] = useState(false)
    const [check, setCheck] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [playerCards, setPlayerCards] = useState([])
    const [playerValue, setPlayerValue] = useState(0)
    const [dealerCards, setDealerCards] = useState([])
    const [dealerValue, setDealerValue] = useState(0)
    const [cardDeck, setCardDeck] = useState([
        2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11,
    ])


    /* ADD A CARD TO THE PLAYER CARDS */
    const addPlayerCard = () => {
        console.log("add player card")

        if (pull) {
            setPlayerCards(currentState => [...currentState, cardDeck[0]])
            cardDeck.shift()
        }
    }

    useEffect(() => {
        if (pull) {
            setPlayerValue(getValue(playerCards))
        }
    }, [playerCards])

    useEffect(() => {
        if (playerValue > 21) {
            if (!playerCards.includes(11)) {
                dealersTurn()
            } else {
                console.log("11 to 1")
            }
        }
    }, [playerValue])


    /* ADD A CARD TO THE DEALER CARDS */
    const addDealerCard = () => {
        console.log("add dealer card")

        setDealerCards(currentState => [...currentState, cardDeck[0]])
        cardDeck.shift()
    }

    useEffect(() => {
        setDealerValue(getValue(dealerCards))
    }, [dealerCards])

    useEffect(() => {
        if (check) {
            console.log(playerValue)
            console.log(dealerValue)
            if (dealerValue <= 21 && dealerValue < playerValue && playerValue <= 21) {
                addDealerCard()
            } else if (dealerValue > 21 && dealerCards.includes(11)) {
                console.log("dealer 11 to 1")
            } else {
                if (dealerValue > 21 || (playerValue <= 21 && dealerValue < playerValue)) {
                    console.log("player hat gewonnen")
                    setGameStarted(false)
                    setCheck(false)
                } else {
                    console.log("dealer hat gewonnen")
                    setCheck(false)
                    setGameStarted(false)
                }
            }
        }
    }, [dealerValue])


    /* START A NEW BLACKJACK GAME */
    const startGame = () => {
        setGameStarted(true)
        setCheck(false)
        setPlayerCards([])
        setPlayerValue(0)
        setDealerCards([])
        setDealerValue(0)

        setPull(true)
    }

    useEffect(() => {
        if (pull) {
            setCardDeck(currentState => shuffle(currentState))
            
            addDealerCard()
            addPlayerCard()
            addPlayerCard()
        }
    }, [pull])

    /* WHEN YOU DON'T WANT TO PULL ANOTHER CARD OR YOU ARE OVER 21 */
    const dealersTurn = () => {
        setPull(false)
        setCheck(true)

        console.log("dealers turn")
        addDealerCard()

    }

    return (
        <main className={styles.container}>
            <Head>
                <title>Blackjack game</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.dealerContainer}>
                <p style={{ color: "white" }}>{dealerCards}</p>
                <p style={{ color: "white" }}>{dealerValue}</p>
            </div>
            <div className={styles.playerContainer}>
                { gameStarted ? <></> : <button onClick={startGame}>Bet</button>}
                <p style={{ color: "white" }}>{playerCards}</p>
                <p style={{ color: "white" }}>{playerValue}</p>
                <button onClick={addPlayerCard}>card</button>
                <button onClick={dealersTurn}>no card</button>
            </div>
        </main>
    )
}
