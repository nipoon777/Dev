import React from 'react'

function Child({theme}) {
    console.log("Child");
    return (
        <div className={theme ? 'dark' : 'light '}>
            Child
        </div>
    )
}

export default React.memo(Child)
