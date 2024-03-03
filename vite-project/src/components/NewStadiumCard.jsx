import { useNavigate } from 'react-router-dom'
const NewStadiumCard=()=>{
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Stadium/New`)
  }
  return (
    <div onClick={handleClick}>
      +
    </div>
  )

}
export default NewStadiumCard