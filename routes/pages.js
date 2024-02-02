const express = require("express");
const csrf = require("csurf");
const nodemailer = require("nodemailer");
const router = express.Router();
const middleware = require("../middleware");
const {
  userContactUsValidationRules,
  validateContactUs,
} = require("../config/validator");
const csrfProtection = csrf();
router.use(csrfProtection);

//GET: display abous us page
router.get("/about-us",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/about-us", {
    pageName: "Về Chúng Tôi",
  });
});

//GET: display shipping policy page
router.get("/shipping-policy",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/shipping-policy", {
    pageName: "Chính Sách Giao Hàng",
  });
});

//GET: display term of service page
router.get("/terms-of-service",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/terms-of-service", {
    pageName: "Điều Khoản Sử Dụng",
  });
});

//GET: display privacy policy page
router.get("/privacy-policy",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/privacy-policy", {
    pageName: "Chính Sách Bảo Mật",
  });
});

//GET: display payment policy page
router.get("/payment-policy",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/payment-policy", {
    pageName: "Chính Sách Thanh Toán",
  });
});

//GET: display return policy page
router.get("/return-policy",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/return-policy", {
    pageName: "Chính Sách Hoàn Trả",
  });
});

//GET: display shopping guide page
router.get("/shopping-guide",  middleware.savePreviousPage, (req, res) => {
  res.render("pages/shopping-guide", {
    pageName: "Hướng Dẫn Mua Hàng",
  });
});

//GET: display contact us page and form with csrf tokens
router.get("/contact-us",  middleware.savePreviousPage, (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error");
  res.render("pages/contact-us", {
    pageName: "Liên Hệ",
    csrfToken: req.csrfToken(),
    successMsg,
    errorMsg,
  });
});

//POST: handle contact us form logic using nodemailer
router.post(
  "/contact-us",
  [userContactUsValidationRules(), validateContactUs],
  (req, res) => {
    // instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // company's email and password
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // email options
    const mailOpts = {
      from: req.body.email,
      to: process.env.GMAIL_EMAIL,
      subject: `Nông Sản Miền Nam - ${req.body.name}`,
      html: `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Tên người dùng: ${req.body.name}</h2>
      <h3 style="color: #478ba2;">Địa chỉ Email người dùng: (${req.body.email})<h3>
      </div>
      <h3 style="color: #478ba2;">Nội dung: </h3>
      <div style="font-size: 30;">
      ${req.body.message}
      </div>
      `,
    };

    // send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        req.flash(
          "error",
          "Đã xảy ra lỗi... Vui lòng kiểm tra kết nối mạng của bạn và thử lại sau"
        );
        return res.redirect("/pages/contact-us");
      } else {
        req.flash(
          "success",
          "Email đã gửi đi thành công! Cảm ơn bạn vì đã liên hệ."
        );
        return res.redirect("/pages/contact-us");
      }
    });
  }
);

module.exports = router;
