import { format } from 'date-fns'

const formatDate = (date: Date) => {
  const currentTime = new Date()
  const difference = Math.floor((currentTime.getTime() - date.getTime()) / 1000)

  // check if date is later than current time
  if (difference < 0) {
    return 'Last updated... in the future???'
  }

  if (difference < 60) {
    return 'Last updated just now'
  }

  if (difference < 60 * 60) {
    const minutes = Math.floor(difference / 60)
    return `Last updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }

  if (difference < 60 * 60 * 24 && date.getDate() === currentTime.getDate()) {
    return `Last updated today at ${format(date, "h:mm aaaaa'm'")}`
  }

  if (
    difference < 60 * 60 * 24 * 2 &&
    date.getDate() === currentTime.getDate() - 1
  ) {
    return `Last updated yesterday at ${format(date, "h:mm aaaaa'm'")}`
  }

  if (
    date.getFullYear() === currentTime.getFullYear() &&
    date.getMonth() === currentTime.getMonth()
  ) {
    return `Last updated ${format(date, 'iiii, MMMM d')}`
  }

  return `Last updated ${format(date, 'iiii, MMMM d, yyyy')}`
}

export default formatDate
