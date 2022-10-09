const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = today.toLocaleString('en-us', { month: 'long' });
const yy = today.getFullYear();

const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]

const when: any = {
  today: `${weekday}, ${mm} ${dd}`,
  todayWithYear: `${mm} ${dd}, ${yy}`,
}

const getDate = (input: any) => {
  return when[input];
}

export default getDate;
