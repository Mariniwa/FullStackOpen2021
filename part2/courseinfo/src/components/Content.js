import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    return (
        <div>
            The contents are listed below:<br/>
            <br/>
            {parts.map(p => <Part part={p} key={p.id}/>)}
        </div>
    )
}

export default Content;