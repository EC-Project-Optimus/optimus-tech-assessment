import React, { Component, useEffect, useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';

interface PollPayload {
  list: {color: string, votes: number}[]
}

interface FormPayload {
  email: string,
  colors: string[]
}

export default function CampaignPage() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([])
  const user = props.user
  
  const onSubmit = (paylaod: FormPayload) => {
    fetch(`https://api.example.com/poll-vote`, {
      body: {
        email: payload.email,
        colors: payload.colors
      }
    })
      .then(response => response.json())
      .then(json => {
        const data = json as PollPayload
        setLoading(false);
        const divs = data.list.map((row)=> {
          return (<Typography variant='h2'>{row.color} {row.votes}</Typography>)
        })
        setResult(divs)
      })
  }
  
  return (loading ? 
          <div>Loading...</div> : 
          <Box sx={{ marginTop: '24px' }}>
            <Img id='banner' />
            {result ? result : <CampaignForm onSubmit={onSubmit} />}
          </Box>)
}
