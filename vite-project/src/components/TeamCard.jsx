import { useNavigate } from "react-router-dom"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import teamDefaultImg from "../images/teamDefault.jpg"

const TeamCard = ({ team }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Team/${team._id}`)
  }
  return (
    <div className="team-card">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 200 }} image={teamDefaultImg} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {team.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {team.sport}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="error" variant="outlined" size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
export default TeamCard
