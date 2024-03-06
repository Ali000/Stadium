import { useEffect } from 'react'
import Client from '../services/api'
import video from '../videoplayback.webm'
import InfoSharpIcon from '@mui/icons-material/InfoSharp'
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
import { Card, Grid, Typography, CardContent } from '@mui/material';
const Home = () => {
  const [matches, setMatches] = useState([])
  useEffect(() => {
    Client.get('/matches')
      .then((response) => {
        setMatches(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  return (
    <div className="HomePage">
      <video
        width="1510"
        height="1080"
        autoPlay
        loop
        playsInline
        style={{ pointerEvents: 'none' }}
      >
        <source src={video} type="video/webm" />
      </video>
      <div className="Home-box">
      <h1 className="Home-title">Welcome To Stadium App!</h1>
      </div>
      <Typography variant="h4" className="Home-moto" gutterBottom>
        Your Gateway to the Greatest Games.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Some of the Matches:
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={match._id}>
            <Card sx={{ bgcolor: '#000', color: '#f0a500' }}>
              <CardContent>
                <Typography variant="h6">{match.name}</Typography>
                <Typography>{new Date(match.time).toLocaleString()}</Typography>
                <Typography>Price: ${match.price}</Typography>
                <Typography>Seats available: {match.seats}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <footer
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '1rem',
          fontSize: '0.8rem',
          textAlign: 'center',
          borderTop: '1px solid #444' // this creates a slight edge to the top of the footer, adjust color as needed
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px', // assuming the container is this wide, adjust as needed
            margin: '0 auto',
            padding: '0 1rem' // give some padding on the sides
          }}
        >
          <div>Stadiums.com. All rights reserved.</div>
          <div>
            <a
              href="/about"
              style={{
                color: '#fff',
                marginRight: '1rem',
                textDecoration: 'none'
              }}
            >
              <InfoSharpIcon />
            </a>
            <a
              href="https://github.com/Ali000/Stadium"
              style={{
                color: '#fff',
                marginRight: '1rem',
                textDecoration: 'none'
              }}
            >
              <GitHubIcon />
            </a>
            <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
              <LoginIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
