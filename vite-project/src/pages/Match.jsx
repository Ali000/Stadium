import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"

const Match = (props) => {
  const navigate = useNavigate()
  const [matchDetails, setMatchDetails] = useState({})
  // const [found, setFound] = useState(false)
  // let { id } = useParams()
  let id = props.id
  let oldMatchDetails
  let time
  // let from
  // let to

  useEffect(() => {
    const getMatch = async () => {
      const response = await Client.get("/matches/" + id)
      console.log(response.data)
      oldMatchDetails = response.data
      let time = new Date(response.data.time)
      // from = new Date(response.data.time.from)
      // to = new Date(response.data.time.to)
      // response.data.time.from = `${from.getFullYear()}-${from.getMonth()}-${from.getDay()}`
      // response.data.time.to = `${to.getFullYear()}-${to.getMonth()}-${to.getDay()}`
      response.data.time = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()}  ${
        time.getHours() % 12 < 10 ? "0" : ""
      }${time.getHours() % 12}:${
        time.getMinutes() < 10 ? "0" : ""
      }${time.getMinutes()} ${time.getHours() > 12 ? "PM" : "AM"}`
      setMatchDetails(response.data)
    }

    getMatch()
  }, [id, props])

  const buyticket = async () => {
    const response = await Client.post("/tickets/", {
      user: props.user.id,
      match: matchDetails._id,
      price: matchDetails.price,
    })
    setMatchDetails((prev) => ({ ...prev, seats: prev.seats - 1 }))
    // navigate("/match/" + id)
  }
  return (
    <TableRow
      // key={matchDetails._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {/* // <div> */}
      {/* <h3>Name: {matchDetails.name} </h3>
      <h3>Stadium: {matchDetails?.stadium?.name} </h3>
      <h3>Teams: </h3>
      <h5>Team 1: {matchDetails?.teams?.home?.name}</h5>
      <h5>Team 2: {matchDetails?.teams?.away?.name}</h5>
      <h3>Date: {matchDetails?.time}</h3>
      <h3>Price for the ticket: {matchDetails?.price}</h3>
      {matchDetails?.seats > 0 ? (
        <>
          <h3>available seats: {matchDetails?.seats}</h3>
          {props?.user?.role == "customer" || props?.user?.role == "Admin" ? (
            <button onClick={buyticket}>buy a ticket</button>
          ) : null}
        </>
      ) : (
        <div>no seats available</div>
      )} */}
      {/* <> */}

      <TableCell component="th" scope="row">
        {matchDetails.name}
      </TableCell>
      <TableCell>{matchDetails?.stadium?.name}</TableCell>
      <TableCell>{matchDetails?.teams?.home?.name}</TableCell>
      <TableCell>{matchDetails?.teams?.away?.name}</TableCell>
      <TableCell>{matchDetails?.time}</TableCell>
      <TableCell>$ {matchDetails?.price}</TableCell>
      <TableCell>{matchDetails?.seats}</TableCell>
      <TableCell>
        {/* <button onClick={buyticket}>buy a ticket</button> */}
        <Button
          variant="outlined"
          color="success"
          type="submit"
          onClick={buyticket}
        >
          Book Ticket
        </Button>
      </TableCell>

      {/* // </div> */}
    </TableRow>
  )
}

export default Match
