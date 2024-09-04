
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
    // Array of new child data
    const childrenData = [
        {
          firstName: "Pinel",
          lastName: "Area",
          grade: "4th",
          enteryYear: "2011",
        },
        {
          firstName: "Rahimet",
          lastName: "Abdu",
          grade: "3th",
          enteryYear: "2012",
        },
        {
          firstName: "Teketel",
          lastName: "Alemu",
          grade: "3th",
          enteryYear: "2012",
        },
        {
          firstName: "Nazret",
          lastName: "Shifera",
          grade: "6th",
          enteryYear: "2013",
        },
        {
          firstName: "Getayawkal",
          lastName: "Gutu",
          grade: "3th",
          enteryYear: "2011",
        },
        {
          firstName: "Wubalem",
          lastName: "Yohanis",
          grade: "3th",
          enteryYear: "2012",
        },
        {
          firstName: "Muluken",
          lastName: "Alemayehu",
          grade: "3th",
          enteryYear: "2011",
        },
        {
          firstName: "Frikos",
          lastName: "Temesgen",
          grade: "3th",
          enteryYear: "2012",
        },
        {
          firstName: "Mesafnt",
          lastName: "Mariam",
          grade: "3th",
          enteryYear: "2012",
        }
      ];
  
    try {
      // Clear all existing data
     //// await Child.deleteMany({});
  
      // Add new children data
      const newChildren = await Child.insertMany(childrenData);
  console.log(newChildren.length);
  
      // Log the new children for debugging
      console.log("newChildren:", newChildren);
  
      res.status(201).json({ message: 'Children added successfully.',  });
    } catch (error) {
      res.status(400).json({ message: 'Error adding children.', error: error.message });
    }
  };
 

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
