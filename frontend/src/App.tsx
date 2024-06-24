import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import Banner from './logo.svg';

interface PollPayload {
  color: string, 
  votes: number
}

interface FormPayload {
  email: string,
  colors: string[]
}

interface CampaignFormProps {
  handleSubmit: (formPayload:FormPayload) => void
}

const CampaignForm = (props: CampaignFormProps) => {
    const [email, setEmail] = useState('');
    const [colors, setColors] = useState('');

    return (
        <div>
            <div style={{marginBottom: '16px', fontSize: '20px'}}>
              <label>
                  Email:
                  &nbsp; 
                  <input
                      style={{fontSize:'20px'}}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </label>
            </div>
            <div style={{marginBottom: '16px', fontSize: '20px'}}>
              <label>
                  Favorite Color:
                  &nbsp; 
                  <select
                      style={{fontSize:'18px'}}
                      value={colors}
                      onChange={(e) => setColors(e.target.value)}
                  >
                      <option value="" disabled>Select a color</option>
                      <option value="red">Red</option>
                      <option value="black">Black</option>
                      <option value="blue">Blue</option>
                  </select>
              </label>
            </div>
            <button style={{fontSize: '18px'}} onClick={()=>props.handleSubmit({email, colors:[colors]})}>
              Submit
            </button>
        </div>
    );
};

function App() {
  const [result, setResult] = useState<JSX.Element| null>(null)
  
  const handleSubmit = (payload: FormPayload) => {
    fetch('http://localhost:8010/proxy/poll-vote', 
    {
      method: 'POST', // specify the request method
      headers: {
        'Content-Type': 'application/json' // specify the content type
      },
      body: JSON.stringify({
        email: payload.email,
        colors: payload.colors
      })
    })
      .then(response => {
        fetch('http://localhost:8010/proxy/poll-result')
        .then(getResponse => getResponse.json())
        .then (json => {
          const data = json as PollPayload[]
          const colorVotes = data.map((row,rowIndx)=> {
            return (<div key={rowIndx} style={{fontSize: '24px',display: 'flex', justifyContent:'space-between'}}>
                <div style={{marginRight: '20px'}}>{row.color}</div> 
                <div style={{textAlign:'right'}}>{row.votes}</div>
              </div>)
          })
          setResult(<div>
            <div style={{fontSize:'32px',textDecorationLine:'underline', marginBottom: '16px'}}>
              Vote Total
              </div>
            {colorVotes}
            </div>)
        })
      })
  }
  
  return (<Container maxWidth={'md'} style={{
            margin:'0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            }}>
            <img id='banner' src={Banner} style={{ width:'200px', height:'200px' }} alt="banner"/>
            <Box style={{display:'flex',justifyContent: 'center'}}>
              {result ? result : <CampaignForm handleSubmit={handleSubmit} />}
            </Box>
         </Container>)
}

export default App 
