import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import Client from "../services/api"
import React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
const StadiumUpdate = () => {
  const nameRef = useRef(null)
  const sportRef = useRef(null)
  const seatsRef = useRef(null)
  const locationRef = useRef(null)
  const [stadiumsDetails, setStadiumDetails] = useState({})
  const [stadiums, setStadiums] = useState([])
  const [openModal, setOpenModal] = React.useState(false)

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const style = {
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

  let { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    Client.get("/stadiums")
      .then((response) => {
        setStadiums(response.data)
        // console.log(response.data)
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
      sport: sportRef.current.value,
    }).then((response) => {
      console.log(response)
      navigate("/Stadiumslist")
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
          <Button variant="outlined" color="success" onClick={handleOpenModal}>
            Open
          </Button>
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
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add Stadium
                </Typography>
                <br />
                {/* <AddStadium /> */}
              </Box>
            </Fade>
          </Modal>
          {/* <form onSubmit={handleUpdate}>
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
          </form> */}
        </div>
      ) : null}
    </div>
  )
}
export default StadiumUpdate
