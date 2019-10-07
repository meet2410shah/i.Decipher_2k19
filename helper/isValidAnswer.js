const isValidAnswer = answer => {
  if (answer.length > 20) {
    return false;
  } else {
    return true;
  }
};

module.exports = isValidAnswer;
