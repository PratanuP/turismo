const { handleError } = require("../helper/utils.helper");
const User = require("../models/user.model");

exports.getUserData = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id, id);

  const user = await User.findById(id).exec();

  const date = new Date();
  const createdDate = new Date(user?.updatedAt);
  const expiryDate = date.setMonth(date.getMonth() + 3);

  if (createdDate > expiryDate) return res.json({ message: "Code Expired" });

  return res.json(user);
};

exports.register = async (req, res) => {
  let {
    firstName,
    middleName,
    lastName,
    photoId,
    photoIdNo,
    gender,
    phoneNumber,
    phoneNumberCode,
    address,
    email,
  } = req.body;

  User.find({ $or: [{ email: email }, { phoneNumber: phoneNumber }] }).exec(
    async (findError, user) => {
      // mongo err
      if (handleError(findError, res)) return;

      // check for duplicate entry
      if (user.length !== 0) {
        const date = new Date();
        const createdDate = new Date(user[0]?.updatedAt);
        const expiryDate = date.setMonth(date.getMonth() - 3);

        if (createdDate < expiryDate)
          return res.json({ message: "You already have an active code" });

        const updateUser = await User.findById(user[0]._id);

        updateUser.firstName = firstName;
        updateUser.middleName = middleName;
        updateUser.lastName = lastName;
        updateUser.photoId = photoId;
        updateUser.photoIdNo = photoIdNo;
        updateUser.phoneNumber = phoneNumber;
        updateUser.phoneNumberCode = phoneNumberCode;
        updateUser.gender = gender;
        updateUser.address = address;

        updateUser.save((saveError, success) => {
          if (handleError(saveError, res, { statusCode: 500 })) return;

          return res.status(200).send({
            user: success,
            message: `${firstName} registered successfully`,
          });
        });
        return;
      }

      const newUser = new User({
        firstName,
        middleName,
        lastName,
        photoId,
        photoIdNo,
        gender,
        phoneNumber,
        phoneNumberCode,
        address,
        email,
      });
      newUser.save((saveError, success) => {
        if (handleError(saveError, res, { statusCode: 500 })) return;

        return res.status(200).send({
          user: success,
          message: `${firstName} registered successfully`,
        });
      });
    },
  );

  return;
};
