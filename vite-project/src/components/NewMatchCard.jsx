import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import Paper from "@mui/material/Paper"

const NewMatchCard = (props) => {
  const [teams, setTeams] = useState([])
  const navigate = useNavigate()
  // navigate(`/Match/New`)
  const handleClick = () => {}
  // const handleSubmit = () => {}

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#000" : "#000",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#f0a500",
  }))

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
    <div className="stack-div">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
      >
        <Item>
          <h2>Create a match</h2>
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
                    variant="outlined"
                  ></TextField>
                  <label htmlFor="home">first team:</label>
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
        </Item>
      </Stack>
    </div>
  )
}
export default NewMatchCard
