import React, {useState} from 'react'

function Test() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

    const handleName = (e) =>{
        setName(e.target.value);
    }
    const handleAge = (e) =>{
        setAge(e.target.value);
    }
    return (
        <div>
              <form>
                <input
                type="text"
                value={name}
                onChange={handleName}
                />
                <input
                type="text"
                value={age}
                onChange={handleAge}
                />
                <h2>
                Name: {name}, Age: {age}
                </h2>
                </form>
      
        </div>
    )
}

export default Test
