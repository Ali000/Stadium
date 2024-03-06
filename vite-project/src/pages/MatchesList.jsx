import { useEffect, useRef, useState } from "react"
import Client from "../services/api"
import Search from "../components/Search"
import MatchCard from "../components/MatchCard"
import NewMatchCard from "../components/NewMatchCard"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Match from "./Match"

const MatchesList = (props) => {
  const searchRef = useRef(null)
  const [searchResults, setSearchResults] = useState([])
  const [matches, setMatches] = useState([])
  const [pressed, setPresssed] = useState(false)
  useEffect(() => {
    Client.get("/matches")
      .then((response) => {
        setMatches(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      color: "#f0a500",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    "&:nth-of-type(1n)": {
      color: "#f0a500",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchTerm = searchRef.current.value.toLowerCase()
    const filteredMatches = matches.filter((match) =>
      match.name.toLowerCase().includes(searchTerm)
    )
    setSearchResults(filteredMatches)
    setPresssed(true)
  }
  return (
    <div>
      {/* <Search onSubmit={handleSubmit} searchRef={searchRef} /> */}
      <h1 className="pages-title">Matches</h1>
      <div className="" key={Math.random()}>
        {pressed ? (
          searchResults.length > 0 ? (
            searchResults.map((match) => (
              <MatchCard key={match._id} match={match} user={props.user} />
            ))
          ) : (
            <h2>No Matches Found</h2>
          )
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Stadium</StyledTableCell>
                  <StyledTableCell>Home Team</StyledTableCell>
                  <StyledTableCell>Away Team</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Ticket Price</StyledTableCell>
                  <StyledTableCell>Available Tickets</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {matches.map((match) => (
                  <Match
                    user={props.user}
                    key={match._id}
                    match={match}
                    id={match._id}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  )
}
export default MatchesList
