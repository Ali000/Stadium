import { useState, useEffect } from "react"
import React from "react"
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
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Typography from "@mui/material/Typography"

const Stadium = ({ user }) => {
  const navigate = useNavigate()
  const [stadiumDetails, setStadiumDetails] = useState({})
  const [bookingFrom, setBookingFrom] = useState("")
  const [bookingTo, setBookingTo] = useState("")
  const [isBooked, setIsBooked] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [open, setOpen] = React.useState(false)
  const [slides, setSlides] = useState([])
  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  let { id } = useParams()
  let images
  let obj = {}

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

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
  const slidesDefault = [
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
        if (response.data.images) {
          images = response.data.images.map((image) => ({
            src: image,
            alt: "image",
          }))
        } else {
          images = slidesDefault
        }

        setSlides(images)
        // console.log(images)

        checkIfBooked(response.data.bookings, bookingFrom, bookingTo)
      })
      .catch((error) => {
        console.log(error)
      })
    const getUserDetails = async () => {
      const res = await Client.get(`/users/${user?.id}`)
      // console.log(res.data)
      setUserDetails(res.data)

      // (imasetSlidesges)
    }
    getUserDetails()
    // console.log(userDetails)
  }, [id, bookingFrom, bookingTo, isBooked])

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

  const handleUpdate = async (e) => {
    e.preventDefault()
    let response = await Client.put(`/stadiums/${id}`, obj)
    // console.log(response)
    // console.log(obj)
    let newstadDetails = { ...stadiumDetails, ...obj }
    console.log(newstadDetails)
    console.log(stadiumDetails)
    console.log(obj)
    setStadiumDetails(newstadDetails)
    setOpenModal(false)
  }

  const handleChange = (e) => {
    obj = {
      ...obj,
      [e.target.name]: e.target.value,
    }
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
        // setStadiumDetails(response.data)
        // alert("Booking successful!")
        setBookingFrom(bookingFrom)
        setStadiumDetails(stadiumDetails)
        setIsBooked(true)
      })
      .catch((error) => {
        console.log(error)
      })
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Staduim
            </Typography>
            <br />
            <form onSubmit={handleUpdate} className="add-stadium-form-modal">
              <label htmlFor="text">Name:</label>
              {/* <input type="text" id="name" ref={nameRef} /> */}
              <TextField
                placeholder="Name"
                variant="outlined"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                defaultValue={stadiumDetails.name}
              />
              <br />
              <label htmlFor="text">Sport:</label>
              <TextField
                placeholder="Sport"
                variant="outlined"
                type="text"
                id="sport"
                name="sport"
                onChange={handleChange}
                defaultValue={stadiumDetails.sport}
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
                onChange={handleChange}
                defaultValue={stadiumDetails.seats}
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
                onChange={handleChange}
                defaultValue={stadiumDetails.location}
              />
              <br />
              <div className="flexa item">
                <Button variant="outlined" color="success" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Stadium has been booked!
        </Alert>
      </Snackbar>
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
                {user?.role == "Admin" ? (
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
                            onClick={handleOpenModal}
                          >
                            Update
                          </Button>
                        </div>
                      }
                    />
                  </ListItem>
                ) : null}
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
      {(user?.role == "enterprise" || user?.role == "Admin") &&
      userDetails?.stadiums?.some((stadium) => stadium._id == id) ? (
        <div className="match-card-outer">
          <NewMatchCard stadium={stadiumDetails} user={user} />
        </div>
      ) : null}
    </div>
  )
}

export default Stadium
