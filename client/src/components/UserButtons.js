import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'


const UserButtons = ({onSelect}) => {

    return (
        <div>
            <ListGroup as="ul">
                <ListGroup.Item as="li">
                    <button onClick={()=>onSelect(0)}>User Information</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button onClick={()=>onSelect(2)}>Show Invitations</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button onClick={()=>onSelect(1)}>Edit User Information</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button onClick={()=>onSelect(4)}>Manage Friends</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button onClick={()=>onSelect(3)}>Add More Friends</button>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default UserButtons
