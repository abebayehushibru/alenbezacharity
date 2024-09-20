import Transaction from '../models/Transaction.js';
import User from '../models/Users.js';
import Gift from '../models/Gift.js';
import Post from '../models/Post.js';




// Function to calculate the current Ethiopian year based on the current Gregorian date
const getCurrentEthiopianYear = () => {
  const currentGCDate = new Date();
  const gcMonth = currentGCDate.getMonth() + 1; // Get the current Gregorian month (0-indexed, so +1)
  const gcDay = currentGCDate.getDate();

  // If we are before September 11, we are still in the previous Ethiopian year
  const isBeforeEthiopianNewYear = gcMonth < 9 || (gcMonth === 9 && gcDay < 11);

  // Calculate the Ethiopian year based on the current Gregorian year
  const ethiopianYear = currentGCDate.getFullYear() - (isBeforeEthiopianNewYear ? 9 : 8);
  return ethiopianYear;
};

// Controller function to update the user's role
const updateUserRole = async (req, res) => {
  const { customId, role } = req.body;

  // Check if both customId and role are provided
  if (!customId || !role) {
    return res.status(400).json({ message: 'Both customId and role are required.' });
  }

  try {
    // Find the user by customId
    const user = await User.findOne({ customId });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's role
    user.role = role;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User role updated successfully.' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'An error occurred while updating the user role.' });
  }
};

// Admin Dashboard Route with Year Parameter
const getDashboardData = async (req, res) => {
  try {
    const year = getCurrentEthiopianYear(); // Get year from query or default to current Ethiopian year
    // 1. Fetch recent top 3 transactions where isGift is false and paymentMethod is monthly payment
    const recentGifts = await Gift.find()
      .sort({ createdAt: -1 }) // Sort by latest first
      .limit(3);
      const recentMonthlyPayments = await Transaction.find({
        isGift: false,
   status:"completed"
      })
        .sort({ createdAt: -1 }) // Sort by latest first
        .limit(3);

    // 2. Group transactions by Ethiopian month using the date ranges for the specified Ethiopian year
    const transactionsByMonth = [];
   
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentDay = currentDate.getDate();

  const currentYear = currentDate.getFullYear();
  let prevYear = currentYear - 1;
  let nextYear = currentYear + 1;

  // Determine which year to use for the Ethiopian months
  const isAfterMeskeremStart = currentMonth > 9 || (currentMonth === 9 && currentDay >= 11);

  // Define Ethiopian month ranges with current, previous, and next years
  const ethiopianMonthRanges = [
    { name: 'መስከ', start: `09-11-${isAfterMeskeremStart ? currentYear : prevYear}`, end: `10-10-${isAfterMeskeremStart ? currentYear : prevYear}` },
    { name: 'ጥቅም', start: `10-11-${isAfterMeskeremStart ? currentYear : prevYear}`, end: `11-09-${isAfterMeskeremStart ? currentYear : prevYear}` },
    { name: 'ህዳር', start: `11-10-${isAfterMeskeremStart ? currentYear : prevYear}`, end: `12-09-${isAfterMeskeremStart ? currentYear : prevYear}` },
    { name: 'ታህሳ', start: `12-10-${isAfterMeskeremStart ? currentYear : prevYear}`, end: `01-08-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ጥር', start: `01-09-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `02-07-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'የካቲ', start: `02-08-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `03-09-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'መጋቢ', start: `03-10-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `04-08-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ሚያዝ', start: `04-09-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `05-08-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ግንቦ', start: `05-09-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `06-07-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ሰኔ', start: `06-08-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `07-07-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ሐምሌ', start: `07-08-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `08-06-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ነሐሴ', start: `08-07-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `09-05-${isAfterMeskeremStart ? nextYear : currentYear}` },
    { name: 'ጳጉሜ', start: `09-06-${isAfterMeskeremStart ? nextYear : currentYear}`, end: `09-10-${isAfterMeskeremStart ? nextYear : currentYear}` }
  ];
    for (const dateRange of ethiopianMonthRanges) {
     
   const { startDate, endDate } = getGregorianDateRangeForMonth( dateRange);

      const monthlyTransactions = await Transaction.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
            status:"completed"
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" }, // Sum the amounts for the month
            count: { $sum: 1 }, // Count the number of transactions for the month
          },
        },
      ]);

      transactionsByMonth.push({
        month: dateRange.name, // Ethiopian month name
        totalAmount: monthlyTransactions[0]?.totalAmount || 0,
        count: monthlyTransactions[0]?.count || 0,
      });
    }
    const groupedPayments =await User.aggregate([
      {
        $group: {
          _id: '$monthlyamount', // Group by the monthlyamount field
          count: { $sum: 1 }, // Count the number of users in each group
        },
      },
      {
        $project: {
          amount: '$_id', // Rename _id to amount for easier understanding
          count: 1, // Include the count in the result
          _id: 0, // Exclude the original _id field from the output
        },
      },
      { $sort: { amount: 1 } }, // Optional: Sort by amount in ascending order
    ]);
   
    // 3. Additional dashboard stats (members, gifts, posts)
    const totalMembers = await User.countDocuments();
    const newMembers = await User.countDocuments({
      createdate: { $regex: `^.*-${getCurrentGCMonth()}-.*$` },
    });
    const memberPercentage = ((newMembers / totalMembers) * 100).toFixed(0);

    const totalGifts = await Gift.countDocuments();
    const newGifts = await Gift.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    });
    const giftPercentage = ((newGifts / totalGifts) * 100).toFixed(0);

    const totalPosts = await Post.countDocuments();
    const newPosts = await Post.countDocuments({
      createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    });
    const postPercentage = ((newPosts / totalPosts) * 100).toFixed(0);

    // Formatting the response
    const response = {
      totals: {
        members: totalMembers,
        posts: totalPosts,
        gifts: totalGifts,
      },
      currentMonthStats: {
        members: { count: newMembers, percentage: memberPercentage },
        posts: { count: newPosts, percentage: postPercentage },
        gifts: { count: newGifts, percentage: giftPercentage },
      },
      recentMonthlyPayments: recentMonthlyPayments.map((payment) => ({
        transactionId: payment.transactionId,
        name: payment.name,
        phoneNumber: payment.phoneNumber,
        amount: payment.amount,
        status: payment.status,
        date: payment.createdAt,
      })),
      recentGifts: recentGifts.map((gift) => ({
        id: gift.id,
        name: `${gift.firstName} ${gift.lastName}`,
        phoneNumber: gift.phoneNumber,
        amount: gift.amount,
        typeOfGift:gift.typeOfGift,
        status: gift.status,
        date: gift.createdAt,
      })),
      transactionsByMonth: transactionsByMonth,
      groupedPayments: groupedPayments.map((item) => ({
        month: item.month,
        amount: item.amount,
        value: item.count,
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
// Convert Ethiopian month ranges into a Gregorian date range for a specific Ethiopian year
const getGregorianDateRangeForMonth = (dataRange) => {
  const [stmonth, stday, styear] = dataRange.start.split('-').map(Number);
  const [etmonth, etday, etyear] = dataRange.end.split('-').map(Number);

  const startDate = new Date(styear, stmonth - 1, stday);
  const endDate = new Date(etyear, etmonth - 1, etday);

 
  return { startDate, endDate };
};
// Utility function for getting the current Gregorian month (in MM format)
const getCurrentGCMonth = () => {
  const date = new Date();
  return (date.getMonth() + 1).toString().padStart(2, '0'); // Returns month in MM format
};
const getTransactions =async (req, res) => {
  try {
    const { selectedYear, isGift, status, page = 1 } = req.query;

    const query = {};
    
    // Filter by year if selectedYear is provided
    if (selectedYear) {
      const yearStart = new Date(`${selectedYear}-01-01`);
      const yearEnd = new Date(`${parseInt(selectedYear) + 1}-01-01`);
      query.timestamp = { $gte: yearStart, $lt: yearEnd };
    }
    
    // Filter by isGift if provided
    if (isGift !== undefined) {
      query.isGift = isGift === 'true'; // Convert to boolean
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Pagination setup (25 items per page)
    const pageSize = 25;
    const transactions = await Transaction.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    
    const total = await Transaction.countDocuments(query); // Total for pagination

    res.json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
}
export  {getDashboardData,updateUserRole,getTransactions};
