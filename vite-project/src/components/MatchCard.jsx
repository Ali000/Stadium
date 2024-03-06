import { useNavigate } from "react-router-dom"
import Match from "../pages/Match"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const MatchCard = (props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Match/${props.match._id}`)
  }
  return (
    // <div onClick={handleClick}>
    <div>
      <div>{/* <h3>{props.match.name} </h3> */}</div>
      <div>
        <Match id={props.match._id} user={props.user} />
      </div>
    </div>
  )
}
export default MatchCard
