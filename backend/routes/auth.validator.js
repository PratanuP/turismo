const { isValidEmail, isPasswordStrong } = require("./auth.helper");

exports.registerValidator = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber } = req?.body;
  console.log(req.body);

  if (!(firstName && lastName && email && phoneNumber))
    return res.json({
      message: "firstname, lastname, email and phonenumber are required",
    });

  if (!isValidEmail(email))
    return res.status(422).send({ error: "Email is Invalid" });

  next();
};
