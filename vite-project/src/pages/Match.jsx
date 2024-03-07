import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import React from "react"
import Client from "../services/api"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

const Match = (props) => {
  const navigate = useNavigate()
  const [matchDetails, setMatchDetails] = useState({})
  const [open, setOpen] = React.useState(false)

  // const [found, setFound] = useState(false)
  // let { id } = useParams()
  let id = props.id
  let oldMatchDetails
  let time
  // let from
  // let to

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    const getMatch = async () => {
      const response = await Client.get("/matches/" + id)
      // console.log(response.data)
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

  const buyticket = async (newState) => {
    const response = await Client.post("/tickets/", {
      user: props.user.id,
      match: matchDetails._id,
      price: matchDetails.price,
    })
    setOpen(true)
    setMatchDetails((prev) => ({ ...prev, seats: prev.seats - 1 }))
    // navigate("/match/" + id)
  }

  return (
    <>
      <TableRow
        // key={matchDetails._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
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
          {props?.user?.role == "customer" || props?.user?.role == "Admin" ? (
            <Button
              variant="outlined"
              color="success"
              type="submit"
              onClick={() => buyticket()}
            >
              Book Ticket
            </Button>
          ) : null}
        </TableCell>
      </TableRow>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Ticket has been booked!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Match
