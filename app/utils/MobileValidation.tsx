const MobileValidation = (mobile: string) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

export default MobileValidation;
