
exports.handleResponse = (error, responseObject, message) => {
  if (error) return responseObject.status(400).json({ error: error });

  responseObject.json(message);
};

exports.handleError = (error, responseObject, responseData = {}) => {
  const { statusCode = 400, errMsg = "Something went wrong" } = responseData;

  if (error) {
    console.log("API Error: ", error);
    responseObject.status(statusCode).json({ error: errMsg });
  }

  return !!error;
};

exports.setLoginDeviceData = (user, deviceData, refreshToken) => {
  const randomAlphnumeric = Math.random().toString(36).slice(2);

  const loggedInDevice = {
    refreshToken,
    deviceOS: deviceData.deviceName,
    displayName: deviceData.displayName || deviceData.deviceName,
    deviceId: randomAlphnumeric,
  };

  const deviceIndex = user.loggedInDevices.findIndex(
    ({ deviceId }) => deviceId === deviceData.deviceId,
  );
  console.log(deviceIndex);
  if (deviceIndex >= 0) {
    user.loggedInDevices[deviceIndex] = loggedInDevice;
  } else {
    user.loggedInDevices.push(loggedInDevice);
  }

  return loggedInDevice;
};

exports.removeLoginDeviceData = (
  user,
  deviceData,
  removeAllExceptCurrentOne = false,
) => {
  const deviceIndex = user.loggedInDevices.findIndex(
    ({ deviceId }) => deviceId === deviceData.deviceId,
  );
  console.log(deviceIndex);
  if (deviceIndex === -1) return false;

  if (removeAllExceptCurrentOne) {
    const currentLoggedInDevice = user.loggedInDevices[deviceIndex];
    user.loggedInDevices = [currentLoggedInDevice];
    return true;
  }

  user.loggedInDevices.splice(deviceIndex, 1);
  return true;
};
