const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedCateg(titleStr, groupStr, thumbnail) {
    try {
      const categ = await new Category({ title: titleStr, group: groupStr, thumbnail: thumbnail });
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
  await seedCateg("Hạt đặc sản", null, null);
  await seedCateg("Hạt macca", "Hạt đặc sản", null);
  await seedCateg("Hạt bắp", "Hạt đặc sản", null);
  await seedCateg("Hạt sen", "Hạt đặc sản", null);
  await seedCateg("Hạt hạnh nhân", "Hạt đặc sản", null);
  await seedCateg("Hạt điều", "Hạt đặc sản", null);
  await seedCateg("Hạt đậu phộng", "Hạt đặc sản", null);
  await seedCateg("Hạt đậu nành", "Hạt đặc sản", null);
  await seedCateg("Hạt đậu hòa lan", "Hạt đặc sản", null);
  await seedCateg("Hạt thập cẩm", "Hạt đặc sản", null);

  await seedCateg("Trái cây sấy", null, null);
  await seedCateg("Trái cây sấy dẻo", "Trái cây sấy", null);
  await seedCateg("Trái cây sấy khô", "Trái cây sấy", null);

  await seedCateg("Trái cây theo mùa", null, null);
  await seedCateg("Bơ trái", "Trái cây theo mùa", null);
  await seedCateg("Sầu riêng", "Trái cây theo mùa", null);
  await seedCateg("Mít", "Trái cây theo mùa", null);
  await seedCateg("Chuối", "Trái cây theo mùa", null);
  await seedCateg("Dâu tây", "Trái cây theo mùa", null);

  await seedCateg("Nông sản khô và bột", null, null);
  await seedCateg("Cà phê", "Nông sản khô và bột", null);
  await seedCateg("Tiêu", "Nông sản khô và bột", null);
  await seedCateg("Trà xanh", "Nông sản khô và bột", null);
  await seedCateg("Ớt", "Nông sản khô và bột", null);
  await seedCateg("Đậu đen", "Nông sản khô và bột", null);
  await seedCateg("Đậu trắng", "Nông sản khô và bột", null);
  await seedCateg("Hạt lạc", "Nông sản khô và bột", null);

  await closeDB();
}

seedDB();
