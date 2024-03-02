  import { useNavigate } from 'react-router-dom'
  const NewTeamCard=()=>{
    const navigate = useNavigate()
    const handleClick = () => {
      navigate(`/Team/New`)
    }
    return (
      <div className="card game-card" onClick={handleClick}>
        <div className="img-wrapper">
        <h3>{team.name} </h3>
        </div>
        <div className="info-wrapper flex-col">
          <h3>{team.sport}</h3>
        </div>
      </div>
    )

}
export default NewTeamCard