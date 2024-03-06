import { useEffect, useState } from "react"
import Client from "../services/api"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState({})
  const [relatedData, setRelatedData] = useState([])
  const [roles, setRoles] = useState(["customer", "enterprise", "Admin"])
  const style = {
    //style for divider
    p: 0,
    width: "100%",
    maxWidth: 360,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
  }

  const handleSubmit = async (e, user) => {
    e.preventDefault()
    const dataToBeSend = {
      role: e.target.value,
    }
    const response = await Client.put("/users/" + user, dataToBeSend)
    setRoles(["customer", "enterprise", "Admin"])
  }

  useEffect(() => {
    const getInfo = async () => {
      await Client.get(`/users/${userId}`)
        .then((response) => {
          console.log(response.data)

          // let time = new Date(response.tickets.data.match.time)
          // response.data.match.time = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()}  ${
          //   time.getHours() % 12 < 10 ? "0" : ""
          // }${time.getHours() % 12}:${
          //   time.getMinutes() < 10 ? "0" : ""
          // }${time.getMinutes()} ${time.getHours() > 12 ? "PM" : "AM"}`

          setUserData(response.data)
          if (response.data.role === "customer") {
            Client.get("/tickets").then((ticketResponse) => {
              let tickets = []
              for (let index = 0; index < ticketResponse.data.length; index++) {
                const element = ticketResponse.data[index]
                console.log("🚀 ~ Client.get ~ element:", element)
                if (element.user == userId) {
                  tickets.push(element)
                }
              }
              console.log("🚀 ~ Client.get ~ tickets:", tickets)
              ticketResponse.data
              setRelatedData(tickets)
            })
          } else if (response.data.role === "enterprise") {
            // Client.get("/stadiums").then((stadiumResponse) => {
            //   setRelatedData(stadiumResponse.data)
            // })
          } else if (response.data.role === "Admin") {
            Client.get("/users").then((stadiumResponse) => {
              setRelatedData(stadiumResponse.data)
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getInfo()
  }, [userId, roles])

  return (
    <div>
      <h1 className="pages-title">User Profile</h1>
      <div className="user-profile-info">
        <List sx={style} aria-label="mailbox folders">
          <ListItem>
            <ListItemText primary={<h2>User Info</h2>} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary={<p>{userData.name}</p>} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary={<p>{userData.email}</p>} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary={<p>{userData.role}</p>} />
          </ListItem>
        </List>

        {userData.role === "customer" && (
          // {userData.role === "Admin" && (
          <div>
            <h3 className="pages-title">My Tickets</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Match</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.tickets.map((ticket) => (
                    <TableRow
                      key={ticket._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {ticket.match.name}
                      </TableCell>
                      <TableCell>{ticket.price}</TableCell>
                      <TableCell>{ticket.match.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          // <div>
          //   <h3>My Tickets</h3>
          //   {userData.tickets.map((ticket, index) => (
          //     <div key={index}>
          //       <p>Match: {ticket.match.name}</p>
          //       <p>Price: {ticket.price}</p>
          //     </div>
          //   ))}
          // </div>
        )}

        {/* {userData.role === "enterprise" && ( */}
        {userData.role === "Admin" && (
          <div>
            <h3 className="pages-title">My Stadiums</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Stadium Name</TableCell>
                    <TableCell>Stadium Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.stadiums.map((stadium) => (
                    <TableRow
                      key={stadium._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {stadium.name}
                      </TableCell>
                      <TableCell>{stadium.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <h3>My Stadiums</h3>
            {console.log(userData)}
            {userData.stadiums.map((stadium, index) => (
              <div key={index}>
                <p>Name: {stadium.name}</p>
                <p>Location: {stadium.location}</p>
              </div>
            ))} */}
          </div>
        )}
        {userData.role === "Admin" && (
          <div className="user-list-wrap">
            <div>
              <h3 className="pages-title">Users</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {relatedData.map((user) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <p>
                            role:
                            <select
                              name="role"
                              id="role"
                              value={user.role}
                              onChange={(e) => {
                                handleSubmit(e, user._id)
                              }}
                            >
                              {roles.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* {relatedData.map((user) => (
              <div key={user._id} className="users">
                <p>Name: {user.name}</p>
                <p>email: {user.email}</p>
                <p>
                  role:
                  <select
                    name="role"
                    id="role"
                    value={user.role}
                    onChange={(e) => {
                      handleSubmit(e, user._id)
                    }}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            ))} */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
