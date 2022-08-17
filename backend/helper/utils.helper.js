exports.isEmpty = (value) => {
  if (!value) return true;

  return !value.trim();
};

exports.handleError = (err, res) => {
  if (!err) return false;
  console.log(err);

  res
    .status(err?.status || 500)
    .send({ error: err?.errMsg || "Something went wrong!" });
  return true;
};

exports.isRequiredDataAvailable = (res, requiredDataArr = []) => {
  if (!requiredDataArr.length) throw "Array not passed";

  let isDataValid = true;
  const isRequiredDataAbsent = requiredDataArr.some((obj) => {
    // return error message if data is not present
    if (this.isEmpty(obj.value)) {
      isDataValid = false;
      res.status(422).json({ error: `${obj.name} is required!!` });
    }

    return !isDataValid;
  });

  return !isRequiredDataAbsent;
};
