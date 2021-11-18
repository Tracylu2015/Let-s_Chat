import React, { useState } from 'react'
import ChatBubble from '../components/ChatBubble'
import FriendsList from '../components/FriendsList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MainPage = () => {
    const [chatUser, setChatUser] = useState()
    const onFriendClicked = (friend) => {
        setChatUser(friend)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}><FriendsList onFriendClicked={onFriendClicked} /></Col>
                    <Col xs={12} md={8} > <ChatBubble chatUser={chatUser} /></Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage
