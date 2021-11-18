import React, {useState} from 'react'
import EditUserForm from '../components/EditUserForm'
import UserButtons from '../components/UserButtons'
import UserList from '../components/UserList'
import NotificationList from '../components/NotificationList'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserInfo from '../components/UserInfo'
import ManageFriends from '../components/ManageFriends'

const UserAccountPage = () => {
    const [select, setSelect] = React.useState(0)
    const [chatUser, setChatUser] = useState()
    const onFriendClicked = (friend) => {
        setChatUser(friend)
    }
    return (
        <>
            <h3 style={{ marginLeft: "60px" }}>User Profile</h3>
            <Container fluid>
                <Row>
                    <Col xs={6} md={4}><UserButtons onSelect={setSelect}/></Col>
                    <Col xs={12} md={8}>
                        {
                            {
                            0: <UserInfo />,
                            1: <EditUserForm onSelect={setSelect}/>,
                            2: <NotificationList />,
                            3: <UserList />,
                            4: <ManageFriends onFriendClicked={onFriendClicked}/>,
                            }[select]
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserAccountPage
