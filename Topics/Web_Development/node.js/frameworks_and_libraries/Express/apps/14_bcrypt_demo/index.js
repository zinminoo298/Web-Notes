const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const hashedPassword = await bcrypt.hash(pw, 12);

  console.log(hashedPassword);
};

const login = async (pw, hashedPassword) => {
  const result = await bcrypt.compare(pw, hashedPassword);
  if (result) {
    console.log("Logged In!");
  } else {
    console.log("Incorrect Password!!");
  }
};
hashPassword("1234");

login("1234", "$2b$12$ROFJxKmHGDee.xI23I2b3.wG1RnZB6uYS6Scf41a6uKCu5zWUq6Re");
