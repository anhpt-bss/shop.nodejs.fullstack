const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr, groupStr) {
    try {
      const categ = await new Category({ title: titleStr, group: groupStr });
      await categ.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }
  await seedCateg("Bags", null);
  await seedCateg("Backpacks", "Bags");
  await seedCateg("Briefcases", "Bags");
  await seedCateg("Mini Bags", "Bags");
  await seedCateg("Large Handbags", "Bags");
  await seedCateg("Travel", "Bags");
  await seedCateg("Totes", "Bags");
  await seedCateg("Purses", "Bags");
  await closeDB();
}

seedDB();
