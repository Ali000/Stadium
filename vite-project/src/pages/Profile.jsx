import { useEffect, useState } from 'react'
import Client from '../services/api'

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({})
  const [relatedData, setRelatedData] = useState([])

  useEffect(() => {
    Client.get(`/users/${userId}`)
      .then((response) => {
        setUserData(response.data)
        if (response.data.role === 'customer') {
          Client.get('/tickets').then((ticketResponse) => {
            setRelatedData(ticketResponse.data)
          })
        } else if (response.data.role === 'enterprise') {
          Client.get('/stadiums').then((stadiumResponse) => {
            setRelatedData(stadiumResponse.data)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>

      {userData.role === 'customer' && (
        <div>
          <h3>My Tickets</h3>
          {relatedData.map((ticket, index) => (
            <div key={index}>
              <p>Match: {ticket.match.name}</p>
              <p>Price: {ticket.price}</p>
            </div>
          ))}
        </div>
      )}

      {userData.role === 'enterprise' && (
        <div>
          <h3>My Stadiums</h3>
          {relatedData.map((stadium, index) => (
            <div key={index}>
              <p>Name: {stadium.name}</p>
              <p>Location: {stadium.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
