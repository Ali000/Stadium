import { useEffect } from 'react'
import Client from '../services/api'
import Button from '@mui/material/Button'
import video from '../videoplayback.webm'
import MatchCard from '../components/MatchCard'
import MatchesTabs from '../components/MatchesTabs'
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
        the right app for booking stadiums and setup matches
      </h1>
      <h1> Some of the Matches:</h1>
      <MatchesTabs matches={matches} />
    </div>
  )
}

export default Home
