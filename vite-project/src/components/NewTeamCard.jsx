  import { useNavigate } from 'react-router-dom'
  const NewTeamCard=()=>{
    const navigate = useNavigate()
    const handleClick = () => {
      navigate(`/Team/New`)
    }
    return (
      <div onClick={handleClick}>
        +
      </div>
    )

}
export default NewTeamCard