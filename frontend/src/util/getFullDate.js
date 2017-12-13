export const getFullDate = (timestamp) => {

	const date = new Date(timestamp)
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const minutes = (date.getMinutes() > 10) ?  date.getMinutes() : ("0" + date.getMinutes()) 
	const fullDate = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + minutes 

	return fullDate;

}