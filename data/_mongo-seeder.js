require("colors");
require("dotenv").config();
require("../DB").connectMONGO();

const { User, Dormitory, House, Booking } = require("../models");

const importData = async () => {
  try {
    await User.deleteMany();
    await Dormitory.deleteMany();
    await House.deleteMany();
    await Booking.deleteMany();

    const { users } = require("./userTestData");
    const createdUsers = await User.insertMany(users);

    const { dorms } = require("./dormTestData");
    if (dorms.length > 0 && users.length > 0) {
      const modifiedDorms = dorms.map(dorm => {
        return { ...dorm, management: createdUsers[0]._id };
      });
      // Only done to duplicate the dorms while waiting for real data
      const duplicatedDorms = Array(40)
        .fill(0)
        .map(() => Object.assign({}, modifiedDorms[0]));
      await Dormitory.insertMany(duplicatedDorms);
    }

    const { houses } = require("./houseTestData");
    if (houses.length > 0) {
      await House.insertMany(houses);
    }

    const { bookings } = require("./bookingTestData");
    if (bookings.length > 0) {
      await Booking.insertMany(bookings);
    }

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Dormitory.deleteMany();
    await House.deleteMany();
    await Booking.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
