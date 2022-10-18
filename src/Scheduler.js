import './scheduler.css'

function Scheduler() {
  return (
    <table className="scheduler" style={{ width: `${width}px` }}>
      <thead>
        <tr>
          <td colSpan="2">{schedulerHeader}</td>
        </tr>
      </thead>
      <tbody>{tbodyContent}</tbody>
    </table>
  )
}

export default Scheduler
