// Modules
const path = require(`path`);

// Function Definition
const getPath = current => {
  const dir = path
    .dirname(__dirname)
    .split("/")
    .pop();
  const file = current + ".txt";
  return path.join(dir, "public", "question", file);
};

module.exports = getPath;
