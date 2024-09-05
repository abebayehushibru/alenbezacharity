
import MonthlyPayment from '../models/MonthlyPayment.js';
import User, { Gift } from '../models/Users.js';


// Helper function to get the current GC month in MM format (e.g., '09' for September)
const getCurrentGCMonth = () => {
  const currentDate = new Date();
  return (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get month in 'MM' format
};

// Admin Dashboard Route
const getDashbordData=async (req, res) => {
  try {
    const currentGCMonth = getCurrentGCMonth();

    // 1. Count totals and percentages for the current month based on GC

    // Count total members
    const totalMembers = await User.countDocuments();

    // Count members created this month using the GC month
    const newMembers = await User.countDocuments({
      createdate: { $regex: `^.*-${currentGCMonth}-.*$` }, // Match the current GC month in createdate
    });
    const memberPercentage = ((newMembers / totalMembers) * 100).toFixed(0);

    // Count total gifts
    const totalGifts = await Gift.countDocuments();

    // Count gifts created this month based on GC
    const newGifts = await Gift.countDocuments({
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of the current month
        $lt: new Date(), // Up to the current date
      },
    });
    const giftPercentage = ((newGifts / totalGifts) * 100).toFixed(0);

    // Count total posts (replace with your Post model query if needed)
    const totalPosts = 100; // Placeholder: replace with your actual post count query
    const newPosts = 10; // Placeholder: replace with current month post count query
    const postPercentage = ((newPosts / totalPosts) * 100).toFixed(0);

    // 2. Group monthly payments by month and calculate amounts
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
  }}


export default getDashbordData;
