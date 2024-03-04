import { useNavigate } from "react-router-dom"
const NewMatchCard = () => {
  const navigate = useNavigate()
  // navigate(`/Match/New`)
  const handleClick = () => {}
  // const handleSubmit = () => {}

  let obj = {
    name: "",
    image: "",
  }

  const handleChange = (e) => {
    obj = {
      ...obj,
      [e.target.id]: e.target.value,
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(obj)
    const response = await axios.post("http://localhost:3000/clowns", obj)
    console.log(response)
    navigate("/clowns")
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
      <label htmlFor="sport">Sport:</label>
      <input type="text" id="sport" />
      <label className="add-text" htmlFor="players">
        Players:
      </label>
      <input type="text" id="players" />
      <div className="flexa item">
        <button type="submit">Add Match</button>
      </div>
    </form>
  )
}
export default NewMatchCard
