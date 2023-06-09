import { format } from 'date-fns'

export default function timeSimply(time) {
  console.log(time)
  return format(new Date(time), 'yyyy-mm-dd hh:mm:ss')
}
