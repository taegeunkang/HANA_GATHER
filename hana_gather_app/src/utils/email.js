export const checkEmail = email => {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

export const checkMobile = mobileNumber => {
  let phoneNumberRegex = /^010\d{8}$/;
  return phoneNumberRegex.test(mobileNumber);
};
