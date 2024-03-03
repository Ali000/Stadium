import { useEffect, useRef, useState } from 'react'
import Client from '../services/api'
import Search from '../components/Search'
import StadiumCard from '../components/StadiumCard'
const StadiumsList = () => {
  const searchRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [stadiums, setStadiums] = useState([])
  const [pressed, setPresssed] = useState(false)
  useEffect(() => {
    Client.get('/stadiums')
      .then((response) => {
        setStadiums(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.toLowerCase()
    const filteredTeams = stadiums.filter((stadium) =>
    stadium.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(filteredTeams)
    setPresssed(true)
  }

  return (
    <div>
      <h1>StadiumsList</h1>
    </div>
  )
}
export default StadiumsList
