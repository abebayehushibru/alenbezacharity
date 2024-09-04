// utils/ethiopianYear.js

const  getCurrentEthiopianYear=()=> {
    const now = new Date();
    const gregorianYear = now.getFullYear();
    const gregorianMonth = now.getMonth(); // 0-based index (0 for January, 8 for September)
  
    // Ethiopian New Year is on September 11 (or 12 in a leap year)
    const newYearMonth = 8; // September
  
    let ethiopianYear = gregorianYear;
    if (gregorianMonth < newYearMonth || (gregorianMonth === newYearMonth && now.getDate() < 11)) {
      ethiopianYear -= 8; // Previous Ethiopian year
    } else {
      ethiopianYear -= 7; // Current Ethiopian year
    }
  
    return ethiopianYear.toString();
  }
  
  export default getCurrentEthiopianYear;
  