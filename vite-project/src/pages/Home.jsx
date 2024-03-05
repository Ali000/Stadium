import { useEffect } from 'react'
import Client from '../services/api'
import Button from '@mui/material/Button'
import video from '../videoplayback.webm'
import MatchCard from '../components/MatchCard'
import InfoSharpIcon from '@mui/icons-material/InfoSharp'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
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
      <h1 className="Home-moto">
      Your Gateway to the Greatest Games.
      </h1>
      <h1> Some of the Matches:</h1>
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
