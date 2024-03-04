import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
const NewMatchCard = (props) => {
  const [teams, setTeams] = useState([])
  const navigate = useNavigate()
  // navigate(`/Match/New`)
  const handleClick = () => {}
  // const handleSubmit = () => {}

  let obj = {
    name: "",
    from: "",
    to: "",
    stadium: props.stadium,
    home: "",
    away: "",
    price: "",
    // result:""
  }

  const handleChange = (e) => {
    obj = {
      ...obj,
      [e.target.id]: e.target.value,
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(obj)
    const dataToBeSend = {
      name: obj.name,
      time: { from: obj.from, to: obj.to },
      stadium: obj.stadium,
      teams: { home: obj.home, away: obj.away },
      price: obj.price,
    }
    console.log(dataToBeSend)
    const response = await Client.post("/matches", dataToBeSend)
    console.log(response.data)
    // navigate("/stadium/" + props.stadium._id)
    e.target.reset()
  }

  useEffect(() => {
    const getTeams = async () => {
      const response = await Client.get("/teams")
      const arrayOfTeams = []
      response.data.forEach((team) => {
        if (team.sport == props.stadium.sport) {
          arrayOfTeams.push(team)
        }
      })
      console.log(response.data)
      setTeams(arrayOfTeams)
    }
    getTeams()
  }, [props.stadium])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" onChange={handleChange} />
      <label htmlFor="from">from: </label>
      <input type="date" id="from" onChange={handleChange} />
      <label htmlFor="to">to: </label>
      <input type="date" id="to" onChange={handleChange} />
      <label htmlFor="home">first team:</label>
      <select name="home" id="home" onChange={handleChange}>
        {teams.map((team) => (
          <option value={team._id}> {team.name}</option>
        ))}
      </select>
      <label htmlFor="away">second team:</label>
      <select name="away" id="away" onChange={handleChange}>
        {teams.map((team) => (
          <option value={team._id}> {team.name}</option>
        ))}
      </select>

      <label htmlFor="price">Price for each ticket:</label>
      <input type="number" id="price" onChange={handleChange} />

      <div>
        <button type="submit">Add Match</button>
      </div>
    </form>
  )
}
export default NewMatchCard
