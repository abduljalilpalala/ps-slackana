const today = new Date()
const curHr = today.getHours()

const getGreetings = () => {
  if (curHr < 12) {
    return 'Good Morning'
  } else if (curHr < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}

export default getGreetings;