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
      await Dormitory.insertMany(modifiedDorms);
    }

    const { houses } = require("./houseTestData");
    if (houses.length > 0) {
      const modifiedHouses = houses.map(house => {
        return { ...house, management: createdUsers[0]._id };
      });
      await House.insertMany(modifiedHouses);
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
