import { useNavigate } from "react-router-dom"

const StadiumCard = ({ stadium }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Stadium/${stadium._id}`)
  }
  return (
    <div className="card game-card" onClick={handleClick}>
      <div className="img-wrapper">
        <h3>{stadium.name} </h3>
      </div>
      <div className="info-wrapper flex-col">
        <h3>{stadium.sport}</h3>
      </div>
    </div>
  )
}
export default StadiumCard
