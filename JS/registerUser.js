const form = document.querySelector("#registerForm");
const phNo = document.querySelector("#phoneNo");
const BASE_URL = "https://test-yu07.onrender.com/api";

phNo?.addEventListener("keypress", function (evt) {
  if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
    evt.preventDefault();
  }
});

form?.addEventListener("submit", function registerUser(e) {
  e.preventDefault();

  const firstName = e.target[0].value;
  const middleName = e.target[1].value;
  const lastName = e.target[2].value;
  const photoId = e.target[3].value;
  const photoIdNo = e.target[4].value;
  const gender = e.target[5].value;
  const phoneNumberCode = "+91";
  const phoneNumber = e.target[6].value;
  const address = e.target[7].value;
  const email = e.target[8].value;

  if (
    !(
      firstName &&
      middleName &&
      lastName &&
      photoId &&
      photoIdNo &&
      gender &&
      phoneNumberCode &&
      phoneNumber &&
      address &&
      email
    )
  ) {
    return alert("please fill all the details");
  }

  const data = {
    firstName,
    middleName,
    lastName,
    photoId,
    photoIdNo,
    gender,
    phoneNumberCode,
    phoneNumber,
    address,
    email,
  };

  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res?.json())
    .then((res) => {
      console.log(res);
      window.location.href = `/turismo/qr-code.html?userId=${res.user._id}`;
    })
    .catch((err) => console.log(err));
});
