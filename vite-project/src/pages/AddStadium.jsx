import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import Client from "../services/api"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const AddStadium = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const seatsRef = useRef(null)
  const locationRef = useRef(null)
  let obj = {}

  const handleChange = (e) => {
    obj = {
      ...obj,
      [e.target.name]: e.target.value,
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(obj)
    Client.post(`/stadiums`, obj).then((response) => {
      console.log(response)
      navigate("/Stadiumslist")
    })
    nameRef.current.value = null
    sportRef.current.value = null
    seatsRef.current.value = null
    locationRef.current.value = null
    e.target.reset()
  }
  return (
    <form onSubmit={handleSubmit} className="add-stadium-form-modal">
      <label htmlFor="text">Name:</label>
      {/* <input type="text" id="name" ref={nameRef} /> */}
      <TextField
        placeholder="Name"
        variant="outlined"
        type="text"
        id="name"
        name="name"
        ref={nameRef}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="text">Sport:</label>
      <TextField
        placeholder="Sport"
        variant="outlined"
        type="text"
        id="sport"
        name="sport"
        ref={sportRef}
        onChange={handleChange}
      />
      <br />
      <label className="add-text" htmlFor="text">
        Seats:
      </label>
      {/* <input type="number" id="seats" ref={seatsRef} /> */}
      <TextField
        placeholder="Seats"
        variant="outlined"
        type="number"
        id="seats"
        name="seats"
        ref={seatsRef}
        onChange={handleChange}
      />
      <br />
      <label className="add-text" htmlFor="text">
        location
      </label>
      {/* <input type="text" id="location" ref={locationRef} /> */}
      <TextField
        placeholder="Location"
        variant="outlined"
        type="text"
        id="location"
        name="location"
        ref={locationRef}
        onChange={handleChange}
      />
      <br />
      <div className="flexa item">
        <Button variant="outlined" color="success" type="submit">
          Add
        </Button>
      </div>
    </form>
  )
}
export default AddStadium
