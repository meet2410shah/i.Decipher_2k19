const Teams = require(`../../database/models/teams`);

const validateDetails = (req, res, next) => {
  const { email, name1, name2, teamName, password, phone } = req.body;
  const team = {
    email,
    name1,
    name2,
    teamName,
    password,
    phone
  };
  // Validate participant name
  if (!(name1.length >= 3 && name2.length >= 3)) {
    return res.render(`signup`, {
      err: {
        msg: `Participant Name must be 3 characters long.`,
        code: 1000
      },
      team
    });
  }
  if (!(name1.length <= 20 && name2.length <= 20)) {
    return res.render(`signup`, {
      err: {
        msg: `Participant Name must be at most 20 characters long.`,
        code: 1001
      },
      team
    });
  }
  // Validate Team Name
  if (teamName.length < 3) {
    return res.render(`signup`, {
      err: {
        msg: `Team Name must be at least 4 characters long.`,
        code: 1002
      },
      team
    });
  }
  if (teamName.length > 20) {
    return res.render(`signup`, {
      err: {
        msg: `Team Name must be at most 20 characters long.`,
        code: 1003
      },
      team
    });
  }
  Teams.findOne({ teamName }, (err, result) => {
    if (result) {
      return res.render(`signup`, {
        err: {
          msg: `Team with the given teamName(${teamName}) is already exists.`,
          code: 1004
        },
        team
      });
    }
  });
  // Validate Email
  Teams.findOne({ email }, (err, result) => {
    if (result) {
      return res.render(`signup`, {
        err: {
          msg: `Team with the given email(${email}) is already exists.`,
          code: 1004
        },
        team
      });
    }
  });
  if (email.length > 255) {
    return res.render(`signup`, {
      err: {
        msg: `Provided email is too long.`,
        code: 1005
      },
      team
    });
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(email).toLowerCase())) {
    return res.render(`signup`, {
      err: {
        msg: `Please enter a valid email address.`,
        code: 1006
      },
      team
    });
  }
  // Validate Password
  if (password.length < 6) {
    return res.render(`signup`, {
      err: {
        msg: `Password is too short`,
        code: 1007
      }
    });
  }
  if (password.length > 25) {
    return res.render(`signup`, {
      err: {
        msg: `Password is too large`,
        code: 1008
      },
      team
    });
  }
  // Validate Phone
  if (phone.length !== 10) {
    res.render(`signup`, {
      err: {
        msg: `Please enter a valid contact number.`,
        code: 1009
      },
      team
    });
  }
  if (parseInt(phone) === NaN) {
    return res.render(`signup`, {
      err: {
        msg: `Please provide a valid conatact number`,
        code: 1010
      },
      team
    });
  }
  return next();
};

module.exports = validateDetails;
