import { useNavigate } from "react-router-dom"
import stadiumDefaultImg from "../images/stadiumDefault.jpg"

import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"

const StadiumCard = ({ stadium }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Stadium/${stadium._id}`)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="250" image={stadiumDefaultImg} />
        <CardContent sx={{ bgcolor: "black", color: "gold" }}>
          <Typography gutterBottom variant="h5" component="div">
            {stadium.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stadium.sport}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default StadiumCard
