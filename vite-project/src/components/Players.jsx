const Players = ({ players }) => {
  return (
    <div>
      {players && players.length > 0 ? (
        players.map((player, index) => <h1 key={index}>{player.name}</h1>)
      ) : (
        <h1>There are no players for this team</h1>
      )}
    </div>
  )
}
export default Players
