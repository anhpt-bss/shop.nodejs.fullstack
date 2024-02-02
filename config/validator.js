const { check, validationResult } = require("express-validator");

const userSignUpValidationRules = () => {
  return [
    check("name", "Vui lòng nhập tên").not().isEmpty(),
    check("email", "Định dạng Email không hợp lệ").not().isEmpty().isEmail(),
    check("password", "Vui lòng nhập mật khẩu từ 4 kí tự trở lên")
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
  ];
};

const userSignInValidationRules = () => {
  return [
    check("email", "Định dạng Email không hợp lệ").not().isEmpty().isEmail(),
    check("password", "Mật khẩu không chính xác").not().isEmpty().isLength({ min: 4 }),
  ];
};

const userContactUsValidationRules = () => {
  return [
    check("name", "Vui lòng nhập tên").not().isEmpty(),
    check("email", "Định dạng Email không hợp lệ")
      .not()
      .isEmpty()
      .isEmail(),
    check("message", "Vui lòng nhập nội dung ít nhất 10 từ")
      .not()
      .isEmpty()
      .isLength({ min: 10 }),
  ];
};

const checkoutValidationRules = () => {
  return [
    check("phone", "Vui lòng nhập số điện thoại").not().isEmpty(),
    check("address", "Vui lòng nhập địa chỉ").not().isEmpty(),
    check("paymentMethod", "Vui lòng nhập phương thức thanh toán").not().isEmpty(),
  ];
};

const feedbackValidationRules = () => {
  return [
    check("rating", "Vui lòng đánh giá số sao").not().isEmpty(),
  ];
};

const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    req.flash("error", messages);
    return res.redirect("/user/signup");
  }
  next();
};

const validateSignin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    req.flash("error", messages);
    return res.redirect("/user/signin");
  }
  next();
};

const validateContactUs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    console.log(messages);
    req.flash("error", messages);
    return res.redirect("/pages/contact-us");
  }
  next();
};

const validateCheckout = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    console.log(messages);
    req.flash("error", messages);
    return res.redirect("/checkout");
  }
  next();
};

const validateFeedback = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    console.log(messages);
    req.flash("error", messages);
    const currentUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    return res.redirect(currentUrl);
  }
  next();
};

module.exports = {
  userSignUpValidationRules,
  userSignInValidationRules,
  userContactUsValidationRules,
  checkoutValidationRules,
  feedbackValidationRules,
  validateSignup,
  validateSignin,
  validateContactUs,
  validateCheckout,
  validateFeedback
};
