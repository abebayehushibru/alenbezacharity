
import Child  from '../models/Child.js'; // Import the Child model

// Controller to get all children
export const getAllChildren = async (req, res) => {
  try {
 
 
    const children = await Child.find();
    console.log(children.length);
    
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: 'Server error: Unable to retrieve children.' });
  }
};

export const addChild = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      firstName,
      lastName,
      nickName,
      grade,
      hobbies,
      favoriteSubject,
      entryYear,
      enrolledDate,
    } = req.body;

    // Validation: Check required fields
    if (!firstName || !lastName || !grade || !entryYear) {
      return res.status(400).json({
        message: 'First name, last name, grade, and entry year are required.',
      });
    }

    // Convert hobbies string to an array if it's provided as a comma-separated string
    const hobbiesArray = hobbies ? hobbies.split(',').map((hobby) => hobby.trim()) : [];

    // Create a new child document
    const newChild = new Child({
      firstName,
      lastName,
      nickName,
      grade,
      hobbies: hobbiesArray,
      favoriteSubject,
      enteryYear: entryYear, // Ensure 'enteryYear' matches the schema spelling
      enrolledDate: enrolledDate ? new Date(enrolledDate) : new Date(), // Set default to current date if not provided
    });

    // Save the child to the database
    await newChild.save();

    // Respond with success message
    res.status(201).json({
      message: 'Child added successfully',
      child: newChild,
    });
  } catch (error) {
    // Handle errors, e.g., database errors
    res.status(500).json({
      message: 'Error adding child',
      error: error.message,
    });
  }};
 

export const  editChild = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, nickName, grade, hobbies, favoriteSubject, enrolledDate } = req.body;

  try {
    const updatedChild = await Child.findByIdAndUpdate(
      id,
      { firstName, lastName, nickName, grade, hobbies, favoriteSubject, enrolledDate },
      { new: true, runValidators: true }
    );

    if (!updatedChild) {
      return res.status(404).json({ message: 'Child not found.' });
    }

    res.json({ message: 'Child updated successfully.', child: updatedChild });
  } catch (error) {
    res.status(400).json({ message: 'Error updating child.', error: error.message });
  }
};
export const getChildById = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Child.findById(id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching child details', error: error.message });
  }
};

export const deleteChild= async (req, res) => {
  const { id } = req.params; // Extract the child's ID from the request parameters

  try {
    // Find the child by ID and delete
    const deletedChild = await Child.findByIdAndDelete(id);

    // Check if the child was found and deleted
    if (!deletedChild) {
      return res.status(404).json({ message: 'Child not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Child deleted successfully', child: deletedChild });
  } catch (error) {
    // Handle errors, such as invalid IDs or database errors
    res.status(500).json({ message: 'Error deleting child', error: error.message });
  }
}