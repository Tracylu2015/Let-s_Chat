import React, { useState } from 'react'
import ChatBubble from '../components/ChatBubble'
import GroupBubble from '../components/GroupBubble'
import FriendsList from '../components/FriendsList'
import GroupList from '../components/GroupsList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MainPage = () => {
    const [chatTab, setChatTab] = useState(0)
    const [chatUser, setChatUser] = useState()
    const [chatGroup, setChatGroup] = useState()
    const onFriendClicked = (friend) => {
        setChatUser(friend)
    }

    const onGroupClicked = (group) => {
        setChatGroup(group)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}>
                        <div className="tabs tabs-boxed">
                            <div className="tab tab-lg" onClick={() => setChatTab(0)}>Friends</div>
                            <div className="tab tab-lg tab-lifted" onClick={() => setChatTab(1)}>Groups</div>
                        </div>
                        {
                            {
                                0: <FriendsList onFriendClicked={onFriendClicked} />,
                                1: <GroupList onGroupClicked={onGroupClicked} />
                            }[chatTab]
                        }
                    </Col>
                    <Col xs={12} md={8} >
                        {
                            {
                                0: <ChatBubble chatUser={chatUser} />,
                                1: <GroupBubble chatGroup={chatGroup} />
                            }[chatTab]
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage
