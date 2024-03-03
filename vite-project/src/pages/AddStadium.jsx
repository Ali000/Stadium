import { useNavigate, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Client from '../services/api'
const AddStadium = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const seatsRef = useRef(null)
  const locationRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    Client.post(`/stadiums`, {
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Name:</label>
      <input type="text" id="name" ref={nameRef} />
      <label htmlFor="text">Sport:</label>
      <input type="text" id="sport" ref={sportRef} />
      <label className="add-text" htmlFor="text">
        Seats:
      </label>
      <input
        type="number"
        id="seats"
        ref={seatsRef}
      />
      <label className="add-text" htmlFor="text">
        location
      </label>
      <input type="text" id="location" ref={locationRef} />

      <div className="flexa item">
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
export default AddStadium
