import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import Players from "../components/Players"
const Stadium = () => {
  const navigate = useNavigate()
  const [stadiumDetails, setStadiumDetails] = useState({})
  let { id } = useParams()
  useEffect(() => {
    Client.get(`/stadiums/${id}`)
      .then((response) => {
        setStadiumDetails(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  const handleDelete = () => {
    Client.delete(`/stadiums/${id}`, {}).then((response) => {
      navigate("/StadiumsList")
    })
  }
  const handleUpdate = () => {
    navigate(`/Stadium/Update/${id}`)
  }
  return (
    <div>
      {stadiumDetails ? (
        <div>
          <h2>{stadiumDetails.name}</h2>
          <h4>Sport: {stadiumDetails.sport}</h4>
          <h4>Seats: {stadiumDetails.seats}</h4>
          <h4>location : {stadiumDetails.location}</h4>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
            <NewMatchCard />
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Stadium
