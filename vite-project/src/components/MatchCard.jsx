import { useNavigate } from "react-router-dom"

const MatchCard = (props) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Match/${props.match._id}`)
  }

  return (
    <div onClick={handleClick}>
      <div>
        <h3>{props.match.name} </h3>
      </div>
      <div>
        <h6>{props.match.sport}</h6>
      </div>
    </div>
  )
}
export default MatchCard
