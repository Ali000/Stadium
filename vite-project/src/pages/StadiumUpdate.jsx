import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Client from '../services/api'
const StadiumUpdate = () => {
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const seatsRef = useRef(null)
  const locationRef = useRef(null)
  const [stadiumsDetails, setStadiumDetails] = useState({})
  const [stadiums, setStadiums] = useState([])
  let { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    Client.get('/stadiums')
      .then((response) => {
        setStadiums(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    getDetails()
  })
  const getDetails = () => {
    const filteredStadiums = stadiums.find((stadium) => stadium._id === id)
    setStadiumDetails(filteredStadiums)
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    Client.put(`/stadiums/${id}`, {
      name: nameRef.current.value,
      seats: seatsRef.current.value,
      location: locationRef.current.value,
      sport: sportRef.current.value
    }).then((response) => {
      console.log(response)
      navigate('/Stadiumslist')
    })
    nameRef.current.value = null
    sportRef.current.value = null
    seatsRef.current.value = null
    locationRef.current.value = null
  }
  return (
    <div>
      {stadiumsDetails ? (
        <div>
          <form onSubmit={handleUpdate}>
            <label htmlFor="text">Name:</label>
            <input
              defaultValue={stadiumsDetails.name}
              type="text"
              id="name"
              ref={nameRef}
            />
            <label htmlFor="text">Sport:</label>
            <input
              type="text"
              id="sport"
              defaultValue={stadiumsDetails.sport}
              ref={sportRef}
            />
            <label className="add-text" htmlFor="text">
              Seats:
            </label>
            <input
              type="number"
              id="seats"
              defaultValue={stadiumsDetails.seats}
              ref={seatsRef}
            />
            <label htmlFor="text">location</label>
            <input
              defaultValue={stadiumsDetails.location}
              type="text"
              id="location"
              ref={locationRef}
            />
            <div className="flexa item">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
export default StadiumUpdate
