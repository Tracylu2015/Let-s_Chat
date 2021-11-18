import React, { useState, useEffect } from 'react'
import axios from 'axios'

const GroupsList = () => {
    const [groups, setGroups] = useState([])
    const [, setLoaded] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/groups/`)
            .then(res => {
                setGroups(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <ul>
                {groups.map(group => {
                    <button>
                        <li key={group.groupName}>
                            {group.groupName}
                        </li>
                    </button>
                })}
            </ul>
        </div>
    )
}

export default GroupsList
