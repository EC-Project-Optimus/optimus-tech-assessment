import React, { useState, useMemo } from 'react';

interface PollPayload {
  list: {color: string, votes: number}[]
}

interface FormPayload {
  email: string,
  colors: string[]
}

interface CamapaignFormProps {
  handleSumit: (FormPayload) => void
}

const CampaignForm = (props: CampaignFormProps) => {
    const [email, setEmail] = useState('');
    const [colors, setColors] = useState([]);

    return (
        <div>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Favorite Color:
                <select
                    multiple
                    value={color}
                    onChange={(e) => setColors(e.target.value)}
                >
                    <option value="" disabled>Select a color</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </select>
            </label>
            <button onClick={handleSubmit({email, colors})}>Submit</button>
        </div>
    );
};

function App() {
  const [result, setResult] = useState([])
  
  const handleSumit = (paylaod: FormPayload) => {
    fetch(`https://api.example.com/poll-vote`, {
      body: {
        email: payload.email,
        colors: payload.colors
      }
    })
      .then(response => response.json())
      .then(json => {
        const data = json as PollPayload
        const divs = data.list.map((row)=> {
          return (<Typography variant='h2'>{row.color} {row.votes}</Typography>)
        })
        setResult(divs)
      })
  }
  
  return <Box>
            <Img id='banner' sx={{ marginBottom: '24px' }} />
            {result ? result : <CampaignForm handleSumit={handleSumit} />}
         </Box>
}

export default App 
