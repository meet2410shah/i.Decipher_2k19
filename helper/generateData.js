const fs = require(`fs`);
const getPath = require(`./getPath`);

const generateData = current => {
  const text = fs.readFileSync(getPath(current), `utf8`);
  return {
    path: `/question/${current}.jpg`,
    current: `${current}`,
    skipAction: `/question/skip/${current}`,
    action: `/question/${current}`,
    text
  };
};

module.exports = generateData;
