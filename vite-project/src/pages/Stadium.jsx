import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'
import stadiumDefaultImg from "../images/stadiumDefault.jpg";

const Stadium = ({ user }) => {
  const navigate = useNavigate()
  const [stadiumDetails, setStadiumDetails] = useState({})
  const [bookingFrom, setBookingFrom] = useState('')
  const [bookingTo, setBookingTo] = useState('')
  const [isBooked, setIsBooked] = useState(false)
  let { id } = useParams()

  useEffect(() => {
    Client.get(`/stadiums/${id}`)
      .then((response) => {
        setStadiumDetails(response.data)
        checkIfBooked(response.data.bookings, bookingFrom, bookingTo)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, bookingFrom, bookingTo])

  const checkIfBooked = (bookings, from, to) => {
    if (!from || !to) return

    const fromTime = new Date(from).getTime()
    const toTime = new Date(to).getTime()

    const alreadyBooked = bookings.some((booking) => {
      const bookingFromTime = new Date(booking.from).getTime()
      const bookingToTime = new Date(booking.to).getTime()
      return fromTime < bookingToTime && toTime > bookingFromTime
    })

    setIsBooked(alreadyBooked)
  }

  const handleBookingDateChange = (setDate, value) => {
    setDate(value)
    checkIfBooked(stadiumDetails.bookings || [], bookingFrom, bookingTo)
  }

  const handleDelete = () => {
    Client.delete(`/stadiums/${id}`).then(() => {
      navigate('/StadiumsList')
    })
  }

  const handleUpdate = () => {
    navigate(`/Stadium/Update/${id}`)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    if (isBooked) {
      alert('The stadium is already booked for the selected dates.')
      return
    }

    const updatedStadiumDetails = {
      ...stadiumDetails,
      bookings: [
        ...(stadiumDetails.bookings || []),
        { from: new Date(bookingFrom), to: new Date(bookingTo) }
      ]
    }

    Client.put(`/stadiums/${id}`, {
      stadium: updatedStadiumDetails,
      user: user
    })
      .then((response) => {
        console.log('Booking successful:', response.data)
        setStadiumDetails(response.data)
        alert('Booking successful!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {stadiumDetails ? (
        <div>
          <img src={stadiumDefaultImg} alt="" />
          <h2>{stadiumDetails.name}</h2>
          <h4>Sport: {stadiumDetails.sport}</h4>
          <h4>Seats: {stadiumDetails.seats}</h4>
          <h4>Location: {stadiumDetails.location}</h4>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
          <div>
            <h3>Book Stadium</h3>
            <form onSubmit={handleBookingSubmit}>
              <label>
                From:
                <input
                  type="date"
                  value={bookingFrom}
                  onChange={(e) =>
                    handleBookingDateChange(setBookingFrom, e.target.value)
                  }
                />
              </label>
              <label>
                To:
                <input
                  type="date"
                  value={bookingTo}
                  onChange={(e) =>
                    handleBookingDateChange(setBookingTo, e.target.value)
                  }
                />
              </label>
              <button type="submit" disabled={isBooked}>
                Book
              </button>
            </form>
            {isBooked && (
              <p>This stadium is already booked for the selected dates.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Stadium
