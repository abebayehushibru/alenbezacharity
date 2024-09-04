import Gift from '../models/Gift';


// Controller to get all gifts
 const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({});
    res.status(200).json(gifts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gifts', error });
  }
};

// Controller to update gift status - for material gifts only
 const updateGiftStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expected status from request body

  try {
    const gift = await Gift.findById(id);
    if (!gift) return res.status(404).json({ message: 'Gift not found' });

    if (gift.typeOfGift !== 'material') {
      return res.status(400).json({ message: 'Status update is allowed only for material gifts' });
    }

    gift.status = status; // Update the gift status
    await gift.save();
    res.status(200).json({ message: 'Gift status updated successfully', gift });
  } catch (error) {
    res.status(500).json({ message: 'Error updating gift status', error });
  }
};

// Controller to process a gift (material or money)
 export const processGift = async (req, res) => {
  const {paymentMethod, firstName, lastName, phoneNumber, email, reasonForGift, address, typeOfGift, materialName, amount, giftRecipient, selectedChild } = req.body;
  // Generate a unique transaction ID
  const transactionId = `TRX_${Date.now()}`;
  try {
    // // Create a new gift
    // const gift = new Gift({
    //   firstName,
    //   lastName,
    //   phoneNumber,
    //   email,
    //   reasonForGift,
    //   address,
    //   typeOfGift,
    //   materialName: typeOfGift === 'material' ? materialName : undefined,
    //   amount: typeOfGift === 'money' ? amount : undefined,
    //   paymentMethod: typeOfGift === 'money' ? paymentMethod : undefined,
    //   transactionId: typeOfGift === 'money' ?transactionId:undefined,
    //   giftRecipient,
    //   selectedChild: giftRecipient !== 'charity' ? selectedChild : undefined,
    // });

    // // If the gift is material, save it to the database directly
    // if (typeOfGift === 'material') {
    //   await gift.save();
    //   return res.status(201).json({ message: 'Material gift registered successfully', gift });
    // }

    // // If the gift is money, initiate payment process
    // await gift.save();
    
    // // Payment logic based on the chosen gateway
    // const paymentMethod = req.body.paymentMethod; // E.g., 'telebirr' or 'chapa'
    // let paymentLink;

    // if (paymentMethod === 'telebirr') {
    //   // Send request to initiate Telebirr payment and get the payment link
    //   paymentLink = await initiateTelebirrPayment(gift);
    // } else if (paymentMethod === 'chapa') {
    //   // Send request to initiate Chapa payment and get the payment link
    //   paymentLink = await initiateChapaPayment(gift);
    // }
  const   gift={
    firstName: 'Abebayehu',
    lastName: 'Shibru',
    phoneNumber: '0987654321',
    email: 'bob.johnson@example.com',
    reasonForGift: 'Birthday Gift',
    address: '456 Maple Avenue, Springfield',
    typeOfGift: 'money',
    materialName: undefined, // Not applicable for money gifts
    amount: 500, // Required for money gifts
    paymentMethod: 'credit_card', // Required for money gifts
    transactionId: transactionId, // Required for money gifts
    giftRecipient: 'childFamily',
    selectedChild: 'Jane Doe',

  }
 let paymentLink = await initiateChapaPayment(gift);
    res.status(200).json({ message: 'Payment initiation successful', paymentLink });
  } catch (error) {
    res.status(500).json({ message: 'Error processing gift', error });
  }
};

