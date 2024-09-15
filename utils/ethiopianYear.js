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
  // Function to determine if a given Ethiopian year is a leap year
function isEthiopianLeapYear(year) {
  return year % 4 === 3;
}

// Utility function to get the current Ethiopian month number
export  function getCurrentEthiopianMonth() {
  const currentDate = new Date();

  // Extract the current Gregorian year, month, and day
  const gregorianYear = currentDate.getFullYear();
  const gregorianMonth = currentDate.getMonth(); // 0-indexed (0 = January)
  const gregorianDay = currentDate.getDate();

  // Calculate the approximate Ethiopian year (Ethiopian year is roughly 8 years behind Gregorian)
  let ethiopianYear = gregorianYear - 8;

  // Check if the Ethiopian New Year (September 11 or 12) has passed
  let newYearDate = new Date(gregorianYear, 8, 11); // September 11th of the current year
  if (isEthiopianLeapYear(ethiopianYear)) {
    newYearDate.setDate(12); // Set to September 12th if it's a leap year
  }

  // If today is before the Ethiopian New Year, adjust the Ethiopian year
  if (currentDate < newYearDate) {
    ethiopianYear -= 1;
  }

  // Define Ethiopian month boundaries in the Gregorian calendar
  const monthBoundaries = [
    { month: 1, start: new Date(gregorianYear, 8, 11) }, // Meskerem starts September 11
    { month: 2, start: new Date(gregorianYear, 9, 11) }, // Tikimt starts October 11
    { month: 3, start: new Date(gregorianYear, 10, 10) }, // Hidar starts November 10
    { month: 4, start: new Date(gregorianYear, 11, 10) }, // Tahsas starts December 10
    { month: 5, start: new Date(gregorianYear + 1, 0, 9) }, // Tir starts January 9
    { month: 6, start: new Date(gregorianYear + 1, 1, 8) }, // Yekatit starts February 8
    { month: 7, start: new Date(gregorianYear + 1, 2, 10) }, // Megabit starts March 10
    { month: 8, start: new Date(gregorianYear + 1, 3, 9) }, // Miyazya starts April 9
    { month: 9, start: new Date(gregorianYear + 1, 4, 9) }, // Ginbot starts May 9
    { month: 10, start: new Date(gregorianYear + 1, 5, 8) }, // Sene starts June 8
    { month: 11, start: new Date(gregorianYear + 1, 6, 8) }, // Hamle starts July 8
    { month: 12, start: new Date(gregorianYear + 1, 7, 7) }, // Nehase starts August 7
    { month: 13, start: new Date(gregorianYear + 1, 8, 6) }, // Pagumē starts September 6
  ];

  // Determine the current Ethiopian month by comparing with boundaries
  for (let i = monthBoundaries.length - 1; i >= 0; i--) {
    if (currentDate >= monthBoundaries[i].start) {
      return monthBoundaries[i].month;
    }
  }

  // Fallback if no month matches (should not happen)
  return 1; // Default to Meskerem if something goes wrong
}
