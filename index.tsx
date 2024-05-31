import React, { Component, useEffect, useState } from 'react';
import {
  Box, Typography,
} from '@mui/material';

interface UserProfileProps {
  user?: any | null
}

interface UserPayload {
  id: string
  email: string
  name: string
  tags: string[]
}

export default function UserProfile(props: UserProfileProps) {
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([])
  const user = props.user
  
  useEffect(() => {
    fetch(`https://api.example.com/users/${user.id}`)
      .then(response => response.json())
      .then(json => {
        const data = json as UserPayload
        setLoading(false);
        const divs = data.tags.map((tag)=> {
          return (<Typography variant='h2'>{tag}</Typography>)
        })
        setTags(divs)
      })
  })
  
  return (loading ? 
          <div>Loading...</div> : 
          <Box sx={{ marginTop: '24px' }}>
            <Typography variant='h1'>User Profile</Typography>
            {user ? (
              <div>
                <Typography variant='p' sx={{color: 'darkgrey'}}>Name: {user.name}</Typography>
                <Typography variant='p' sx={{color: 'darkgrey'}}>Email: {user.email}</Typography>
                {tagDiv}
              </div>
            ) : (
              <Typography variant='p'>No user data available.</Typography>
            )}
          </Box>)
}
