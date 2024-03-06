import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"
import NewMatchCard from "../components/NewMatchCard"
import stadiumDefaultImg from "../images/stadiumDefault.jpg"
import { Carousel } from "../components/Carousel"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const Stadium = ({ user }) => {
  const navigate = useNavigate()
  const [stadiumDetails, setStadiumDetails] = useState({})
  const [bookingFrom, setBookingFrom] = useState("")
  const [bookingTo, setBookingTo] = useState("")
  const [isBooked, setIsBooked] = useState(false)
  let { id } = useParams()
  const style = {
    //style for stadium info
    py: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  }
  const slides = [
    //data for carousel test
    {
      src: stadiumDefaultImg,
      alt: "Image 1 for carousel",
    },
    {
      src: stadiumDefaultImg,
      alt: "Image 2 for carousel",
    },
    {
      src: stadiumDefaultImg,
      alt: "Image 3 for carousel",
    },
  ]

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
      navigate("/StadiumsList")
    })
  }

  const handleUpdate = () => {
    navigate(`/Stadium/Update/${id}`)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()

    if (isBooked) {
      alert("The stadium is already booked for the selected dates.")
      return
    }

    const updatedStadiumDetails = {
      ...stadiumDetails,
      bookings: [
        ...(stadiumDetails.bookings || []),
        { from: new Date(bookingFrom), to: new Date(bookingTo) },
      ],
    }

    Client.put(`/stadiums/${id}`, {
      stadium: updatedStadiumDetails,
      user: user,
    })
      .then((response) => {
        console.log("Booking successful:", response.data)
        setStadiumDetails(response.data)
        alert("Booking successful!")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {stadiumDetails ? (
        <div className="stadium-show">
          <div className="stadium-img">
            <Carousel data={slides} />
            <div className="stadium-info-form-wrap">
              <List sx={style}>
                <ListItem>
                  <ListItemText primary={<h2>{stadiumDetails.name}</h2>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={<h4>{stadiumDetails.sport} Stadium</h4>}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={<h4>{stadiumDetails.seats} Available Seats</h4>}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText primary={<h4>{stadiumDetails.location}</h4>} />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemText
                    primary={
                      <div className="stadium-edit-btn">
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={handleUpdate}
                        >
                          Update
                        </Button>
                      </div>
                    }
                  />
                </ListItem>
              </List>
              <div className="stadium-book-form">
                <List sx={style}>
                  <ListItem>
                    <ListItemText primary={<h3>Book Stadium</h3>} />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemText
                      primary={
                        <form onSubmit={handleBookingSubmit}>
                          <label className="stadium-book-from">
                            <span>From:</span>
                            {/* <input
                  type="date"
                  value={bookingFrom}
                  onChange={(e) =>
                  handleBookingDateChange(setBookingFrom, e.target.value)
                  }
                /> */}
                            <TextField
                              type="date"
                              value={bookingFrom}
                              onChange={(e) =>
                                handleBookingDateChange(
                                  setBookingFrom,
                                  e.target.value
                                )
                              }
                            ></TextField>
                          </label>
                          <br />
                          <label className="stadium-book-from">
                            <span>To:</span>
                            {/* <input
                  type="date"
                  value={bookingTo}
                  onChange={(e) =>
                    handleBookingDateChange(setBookingTo, e.target.value)
                  }
                /> */}
                            <TextField
                              type="date"
                              value={bookingTo}
                              onChange={(e) =>
                                handleBookingDateChange(
                                  setBookingTo,
                                  e.target.value
                                )
                              }
                            ></TextField>
                          </label>
                          <br />
                          {/* <button type="submit">Book</button> */}
                          <Button
                            variant="outlined"
                            color="success"
                            type="submit"
                            disabled={isBooked}
                          >
                            Book
                          </Button>
                        </form>
                      }
                    />
                  </ListItem>
                </List>
              </div>
              <div>
                {isBooked && (
                  <p>This stadium is already booked for the selected dates.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="match-card-outer">
        <NewMatchCard stadium={stadiumDetails} user={user} />
      </div>
    </div>
  )
}

export default Stadium
