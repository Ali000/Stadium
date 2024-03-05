import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"

const NewMatchCard = (props) => {
  const [teams, setTeams] = useState([])
  const navigate = useNavigate()
  // navigate(`/Match/New`)
  const handleClick = () => {}
  // const handleSubmit = () => {}

  const style = {
    //style for stadium info
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  }

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
    // console.log(obj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(obj)
    const dataToBeSend = {
      name: obj.name,
      time: { from: obj.from, to: obj.to },
      stadium: obj.stadium._id,
      teams: { home: obj.home, away: obj.away },
      price: obj.price,
      seats: obj.stadium.seats,
    }
    // console.log(dataToBeSend)
    const response = await Client.post("/matches", dataToBeSend)
    // console.log(response.data)
    //  await Client.put("/matches", dataToBeSend)

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
      // console.log(response.data)
      setTeams(arrayOfTeams)
    }
    getTeams()
  }, [props.stadium])

  return (
    <div>
      <List sx={style}>
        <ListItem>
          <ListItemText
            primary={
              <form onSubmit={handleSubmit}>
                <label htmlFor="from">Name: </label>
                <TextField
                  type="text"
                  id="name"
                  onChange={handleChange}
                  placeholder="Name"
                ></TextField>
                <label htmlFor="from">from: </label>
                <TextField
                  type="date"
                  id="from"
                  onChange={handleChange}
                ></TextField>
                <label htmlFor="to">To </label>

                <TextField
                  type="date"
                  id="to"
                  onChange={handleChange}
                  label="to"
                  variant="outlined"
                ></TextField>
                <label htmlFor="home">first team:</label>
                <br />
                <TextField
                  helperText="Please select home team"
                  name="home"
                  id="name"
                  select
                  label="Select"
                >
                  {teams.map((team) => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </TextField>
                <label htmlFor="away">second team:</label>
                <br />
                <TextField
                  helperText="Please select away team"
                  id="away"
                  select
                  label="Select"
                >
                  {teams.map((team) => (
                    <MenuItem key={team._id} value={team._id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <label htmlFor="price">Ticket Price:</label>
                <TextField
                  type="number"
                  id="price"
                  onChange={handleChange}
                ></TextField>
                <div>
                  <button type="submit">Add Match</button>
                </div>
              </form>
            }
          />
        </ListItem>
        <Divider component="li" />
      </List>
    </div>
  )
}
export default NewMatchCard
