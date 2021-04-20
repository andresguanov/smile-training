// TODO: update to take format into account, maybe using regex
// TODO: accept a Date instance as second parameter
export function isSameDate(dateInstance, dateString, format = "yyyy-mm-dd") {
  const [year, month, day] = dateString.split("-")
  return (
    dateInstance.getFullYear() == year &&
    dateInstance.getMonth() + 1 == month &&
    dateInstance.getDate() == day
  )
}
