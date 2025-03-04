export function maskString(str) {
    return str.length > 4 ? str.substring(0, 4) + "***" : str + "***";
  }
  
  export function getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    return formattedDate;
  }
  
  export function getCurrentWeekDates() {
    let today = new Date();
    let dayOfWeek = today.getDay();
  
    let monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split("T")[0]);
    }
  
    return weekDates;
  }
  
  export function convertUTCToLocal(utcDateTime) {
    const date = new Date(utcDateTime + "Z");
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }
  