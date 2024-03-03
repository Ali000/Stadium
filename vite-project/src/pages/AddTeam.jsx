import { useRef, useState } from 'react'
import Client from '../services/api'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const AddTeam = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const playersRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    Client.post('/teams', {
      name: nameRef.current.value,
      sport: sportRef.current.value,
      players: playersRef.current.value
    }).then((response) => {
      // console.log(response)
      navigate('/Teamslist')
    })
    nameRef.current.value = null
    sportRef.current.value = null
    playersRef.current.value = null
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Name:</label>
      <input type="text" id="name" ref={nameRef} />
      <label htmlFor="text">Sport:</label>
      <input type="text" id="sport" ref={sportRef} />
      <label className="add-text" htmlFor="text">
        Players:
      </label>
      <input type="text" id="players" ref={playersRef} />
      <div className="flexa item">
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default AddTeam
