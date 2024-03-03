import { useNavigate } from 'react-router-dom'
const NewMatchCard=()=>{
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Match/New`)
  }
  return (
    <div onClick={handleClick}>
      +
    </div>
  )

}
export default NewMatchCard