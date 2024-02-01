const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");

connectDB();

async function updateDB() {
  faker.seed(0);

  async function updateProducts(updateFields) {
    try {
      await Product.updateMany({}, { $set: updateFields });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function replaceContentAndUpdateProducts() {
    try {
      const result = await Product.aggregate([
        { $match: {} },
        {
          $addFields: {
            updatedDescription: {
              $concat: [
                "<h5>Đặc tính nổi bật</h5>",
                "<ul>",
                "<li>Thơm ngon tự nhiên, an toàn và tốt cho sức khỏe</li>",
                "<li>Nguyên liệu từ thiên nhiên, sạch sẽ, nguồn gốc rõ ràng</li>",
                "<li>Cơ sở sản xuất tiêu chuẩn cao, an toàn vệ sinh thực phẩm</li>",
                "<li>Bao bì handmade đẹp mắt, phù hợp tiêu dùng hoặc làm quà tặng</li>",
                "<li>Công nghệ sấy nhiệt độ thấp, thoát hơi ẩm nhanh, giữ lại màu sắc, chất dinh dưỡng và vitamin</li>",
                "<li>Sản phẩm độc quyền do Nông Sản Miền Nam trực tiếp sản xuất và đóng gói</li>",
                "<li>Sản phẩm chính hãng, giá chính gốc, ship toàn quốc</li>",
                "</ul>",
                "<h5>Thông tin sản phẩm</h5>",
                "<ul>",

                "<li>Tên sản phẩm: ",
                `<span style="color: #929292;">`,
                "$title",
                "</span>",
                "</li>",

                "<li>Sản xuất tại: ",
                `<span style="color: #929292;">`,
                "$manufacturer",
                "</span>",
                "</li>",

                "<li>Mã sản phẩm: ",
                `<span style="color: #929292;">`,
                "$productCode",
                "</span>",
                "</li>",

                "<li>Khối lượng tịnh / Thể tích thực: ",
                `<span style="color: #929292;">`,
                "Đang cập nhật...",
                "</span>",
                "</li>",

                "<li>Hạn sử dụng: ",
                `<span style="color: #929292;">`,
                "Đang cập nhật...",
                "</span>",
                "</li>",

                "<li>Thành phần: ",
                `<span style="color: #929292;">`,
                "Đang cập nhật...",
                "</span>",
                "</li>",

                "<li>Hướng dẫn sử dụng: ",
                `<span style="color: #929292;">`,
                "Dùng ngay không qua chế biến",
                "</span>",
                "</li>",

                "<li>Hướng dẫn bảo quản: ",
                `<span style="color: #929292;">`,
                "Nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời trực tiếp. Nhiệt độ bảo quản tốt nhất dưới 20ºC",
                "</span>",
                "</li>",

                "<li>Thông tin cảnh báo an toàn, vệ sinh: ",
                `<span style="color: #929292;">`,
                "Không sử dụng sản phẩm khi có hiện tượng nấm mốc, mùi vị lạ. Sản phẩm có chứa gói hút oxy",
                "</span>",
                "</li>",

                "</ul>",
              ],
            },
          },
        },

        { $set: { description: "$updatedDescription" } },
        { $unset: "updatedDescription" },
        { $project: { _id: 1, title: 1, description: 1, price: 1 } },
      ]);

      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        await Product.updateOne({ _id: element._id }, { description: element.description });
        console.log('Update: ', element._id);
      }

      console.log("Update Success!");

    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  const descriptionExample = {
    description:
      "<h5>Đặc tính nổi bật</h5><ul><li>Thơm ngon tự nhiên, an toàn và tốt cho sức khỏe</li><li>Nguyên liệu từ thiên nhiên, sạch sẽ, nguồn gốc rõ ràng</li><li>Cơ sở sản xuất tiêu chuẩn cao, an toàn vệ sinh thực phẩm</li><li>Bao bì handmade đẹp mắt, phù hợp tiêu dùng hoặc làm quà tặng</li><li>Công nghệ sấy nhiệt độ thấp, thoát hơi ẩm nhanh, giữ lại màu sắc, chất dinh dưỡng và vitamin</li><li>Sản phẩm độc quyền do Nông Sản Miền Nam trực tiếp sản xuất và đóng gói</li><li>Sản phẩm chính hãng, giá chính gốc, ship toàn quốc</li></ul><h5>Thông tin sản phẩm</h5><ul><li>Tên sản phẩm: {title}</li><li>Sản xuất tại: {manufacturer}</li><li>Mã sản phẩm: {productCode}</li><li>Khối lượng tịnh / Thể tích thực: Đang cập nhật</li><li>Hạn sử dụng: Đang cập nhật</li><li>Thành phần: Đang cập nhật</li><li>Hướng dẫn sử dụng: Dùng ngay không qua chế biến</li><li>Hướng dẫn bảo quản: Nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời trực tiếp. Nhiệt độ bảo quản tốt nhất dưới 20ºC</li><li>Thông tin cảnh báo an toàn, vệ sinh: Không sử dụng sản phẩm khi có hiện tượng nấm mốc, mùi vị lạ. Sản phẩm có chứa gói hút oxy</li></ul><p><br></p>",
  };

  // await updateProducts(descriptionExample);
  await replaceContentAndUpdateProducts();

  await closeDB();
}

updateDB();
