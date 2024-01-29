const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  const nuts = [
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/bap_rang_toi_ot__150g__hu__mau_tobita__yumsea_-_01_e43065539aae4307b29e3853948b8a91_grande.jpg",
      title: "Bắp rang tỏi ớt, 150g, hũ, mẫu tobita, Yumsea",
      price: "60,000₫",
      category: 'Hạt bắp'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a4834_df01645b30ff46c7a1a93dc574a5c65f_grande.jpg",
      title:
        "Granola siêu hạt ăn kiêng 45% yến mạch L’angfarm, 300g, bịch, mẫu kraft 1 mặt trong",
      price: "98,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a4810_d6ff83d8fb594ee38760684a5c614673_grande.jpg",
      title: "Granola siêu hạt ăn kiêng 45% yến mạch, 750g, bịch, mẫu mawashi",
      price: "229,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a4839_a8fd8eb50045437baed3722dddebd03d_grande.jpg",
      title: "Granola siêu hạt ăn kiêng 45% yến mạch, 200g, hũ, mẫu tobita",
      price: "76,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a6782_0cf94c3eda99472cb74cb89d77b26983_grande.jpg",
      title:
        "Granola siêu hạt ăn kiêng 15% yến mạch, 300g, bịch, mẫu kraft 1 mặt trong",
      price: "133,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a6760_db809d74065a4a528a552cf3581abbfe_grande.jpg",
      title: "Granola siêu hạt ăn kiêng 15% yến mạch, 750g, bịch, mẫu mawashi",
      price: "318,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a4573_72c4a27b6df84fc59ded461b62222868_grande.jpg",
      title: "Granola siêu hạt ăn kiêng 15% yến mạch, 200g, hũ, mẫu tobita",
      price: "99,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_hat_sen_say__120g__hu__mau_tobita_-_01_6b0c5fd83968414d8c47fb4b0f6b88f8_grande.jpg",
      title: "Hạt sen sấy, 120g, hũ, mẫu tobita",
      price: "94,000₫",
      category: 'Hạt sen'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/cp7a7801_a06cce10df104dfe8d9ec7e0eb3648bc_grande.jpg",
      title: "Hạt sen sấy, 150g, bịch, mẫu kraft 1 mặt trong",
      price: "109,000₫",
      category: 'Hạt sen'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hanh_nhan_rang_muoi_bien__240g__hu__mau_tobita_-_01_73906e69ecdc40738f7763f998703c0c_grande.jpg",
      title: "Hạnh nhân rang muối biển, 240g, hũ, mẫu tobita",
      price: "150,000₫",
      category: 'Hạt hạnh nhân'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_ngu_hat_thap_cam__135g__hu__mau_tobita_111269_01a_084bb3a9c14a41acaae37e7412399e80_grande.jpg",
      title: "Ngũ hạt thập cẩm, 135g, hũ, mẫu tobita",
      price: "42,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_hat_macca__200g__hu__mau_tobita_111268_01a_ed226745f7174ffdb4391d76d509fd6b_grande.jpg",
      title: "Hạt macca, 200g, hũ, mẫu tobita",
      price: "103,000₫",
      category: 'Hạt macca'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_hat_dieu_vo_lua__200g__hu__mau_tobita_111267_01a_0fa9287d96ce4d0a9d1a608b149c3981_grande.jpg",
      title: "Hạt điều vỏ lụa, 200g, hũ, mẫu tobita",
      price: "81,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_hat_dieu_vang__200g__hu__mau_tobita_111266_01a_8b5d9c48d1e84d95ae00e00cf829c855_grande.jpg",
      title: "Hạt điều vàng, 200g, hũ, mẫu tobita",
      price: "105,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_phong_say_sua_bap__100g__hu__mau_tobita_111265_01a_35859de7ec6f46299526909465b74206_grande.jpg",
      title: "Đậu phộng sấy sữa bắp, 100g, hũ, mẫu tobita",
      price: "33,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_phong_say_rau_cu__100g__hu__mau_tobita_111264_01a_c2ffb4279b69497e8785d76e39ae3a95_grande.jpg",
      title: "Đậu phộng sấy rau củ, 100g, hũ, mẫu tobita",
      price: "33,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_phong_nuoc_cot_dua__200g__hu__mau_tobita_111263_01a_8517c0e106ca4f738bad2d1abb46b6b4_grande.jpg",
      title: "Đậu phộng nước cốt dừa, 200g, hũ, mẫu tobita",
      price: "41,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_nanh_say__180g__hu__mau_tobita_111262_01a_15a7a289ded84b5ba497ae116e5f9317_grande.jpg",
      title: "Đậu nành sấy, 180g, hũ, mẫu tobita",
      price: "38,000₫",
      category: 'Hạt đậu nành'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_hoa_lan_wasabi__150g__hu__mau_tobita_111261_01a_e24f59d7d61e4d3f81bb39107b36a5da_grande.jpg",
      title: "Đậu hòa lan wasabi, 150g, hũ, mẫu tobita",
      price: "42,000₫",
      category: 'Hạt đậu hòa lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/lfm_dau_hoa_lan_muoi__180g__hu__mau_tobita_111260_01a_15e9cd32ea2e402cb4ce9d618df36c78_grande.jpg",
      title: "Đậu hòa lan muối, 180g, hũ, mẫu tobita",
      price: "38,000₫",
      category: 'Hạt đậu hòa lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hat_macca__850g__bich__mau_mawashi_-_01_30edf28460454c1580edf5d2e905a580_grande.jpg",
      title: "Hạt macca, 850g, bịch, mẫu mawashi",
      price: "373,000₫",
      category: 'Hạt macca'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hat_dieu_vang__750g__bich__mau_mawashi_-_01_c9a22bdb583940cbbaa37668dff26e64_grande.jpg",
      title: "Hạt điều vàng, 750g, bịch, mẫu mawashi",
      price: "340,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_hanh_nhan_rang_muoi_bien__275g__hu__mau_nap_nhom_-_110693_-_01_a01aed1e6d804463b7d3e082fb26c437_grande.jpg",
      title: "Hạnh nhân rang muối biển, 275g, hũ, mẫu nắp nhôm",
      price: "171,000₫",
      category: 'Hạt hạnh nhân'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_ngu_hat_thap_cam__185g__hu__mau_nap_nhom_-_110616_-_01_5168f59007904c80823be49e4c1850e6_grande.jpg",
      title: "Ngũ hạt thập cẩm, 185g, hũ, mẫu nắp nhôm",
      price: "53,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_hat_macca__250g__hu__mau_nap_nhom_-_110987_-_01_243fcff4f2154e3db1294554db5f5bd3_grande.jpg",
      title: "Hạt macca, 250g, hũ, mẫu nắp nhôm",
      price: "127,000₫",
      category: 'Hạt macca'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_hat_dieu_vo_lua__225g__hu__mau_nap_nhom_-_110618_-_02_aea5358c6231471795a1d5bd3ff7ff00_grande.jpg",
      title: "Hạt điều vỏ lụa, 225g, hũ, mẫu nắp nhôm",
      price: "90,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_hat_dieu_vang__225g__hu__mau_nap_nhom_-_110619_-_02_94c8dcaab31645ecbe461fdf85c36d32_grande.jpg",
      title: "Hạt điều vàng, 225g, hũ, mẫu nắp nhôm",
      price: "116,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_phong_say_sua_bap__125g__hu__mau_nap_nhom_-_110615_-_01_aeb91be94ba244f7979d57a1da80dd96_grande.jpg",
      title: "Đậu phộng sấy sữa bắp, 125g, hũ, mẫu nắp nhôm",
      price: "40,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_phong_say_rau_cu__135g__hu__mau_nap_nhom_-_110614_-_01_f4a88b25f2714e2394ea01576e090ba3_grande.jpg",
      title: "Đậu phộng sấy rau củ, 135g, hũ, mẫu nắp nhôm",
      price: "42,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_phong_nuoc_cot_dua__250g__hu__mau_nap_nhom_-_110613_-_01_0d88bebe29ee444296fbdb8323409a68_grande.jpg",
      title: "Đậu phộng nước cốt dừa, 250g, hũ, mẫu nắp nhôm",
      price: "49,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_nanh_say__225g__hu__mau_nap_nhom_-_110612_-_01_f08036293b8b4a15a0bae361d51edd3a_grande.jpg",
      title: "Đậu nành sấy, 225g, hũ, mẫu nắp nhôm",
      price: "44,000₫",
      category: 'Hạt đậu nành'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_hoa_lan_wasabi__200g__hu__mau_nap_nhom_-_110611_-_01_49e6a88931b44056a3e8d2dae6856aef_grande.jpg",
      title: "Đậu hoà lan wasabi, 200g, hũ, mẫu nắp nhôm",
      price: "52,000₫",
      category: 'Hạt đậu hoà lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/190930_dau_hoa_lan_muoi__225g__hu__mau_nap_nhom__110617_-_01_203d3e61de724b1683f586f37746cc3e_grande.jpg",
      title: "Đậu hoà lan muối, 225g, hũ, mẫu nắp nhôm",
      price: "47,000₫",
      category: 'Hạt đậu hoà lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hat_macca__250g__bich__mau_kraft_1_mat_trong_-_110989_-_01_39063af275324894b11d74b112949a23_grande.jpg",
      title: "Hạt macca, 250g, bịch, mẫu kraft 1 mặt trong",
      price: "120,000₫",
      category: 'Hạt macca'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/ngu_hat_thap_cam_185g_bich_mau_kraft_1_mat_trong_01_63b9fd7b52a74b24a6614dbff6e7869c_grande.jpg",
      title: "Ngũ hạt thập cẩm, 185g, bịch, mẫu kraft 1 mặt trong",
      price: "48,000₫",
      category: 'Hạt thập cẩm'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_hoa_lan_muoi_225g_bich_mau_kraft_1_mat_trong_01_4a54c5a3183140b68613ed764464a700_grande.jpg",
      title: "Đậu hoà lan muối, 225g, bịch, mẫu kraft 1 mặt trong",
      price: "39,000₫",
      category: 'Hạt đậu hoà lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_hoa_lan_wasabi_200g_bich_mau_kraft_1_mat_trong_01_8487f918d2d24d76bb09f5fec6ba9961_grande.jpg",
      title: "Đậu hoà lan wasabi, 200g, bịch, mẫu kraft 1 mặt trong",
      price: "47,000₫",
      category: 'Hạt đậu hoà lan'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_nanh_say_225g_bich_mau_kraft_1_mat_trong_01_a0b37348a71e4a35b0f54918818907db_grande.jpg",
      title: "Đậu nành sấy, 225g, bịch, mẫu kraft 1 mặt trong",
      price: "39,000₫",
      category: 'Hạt đậu nành'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_phong_nuoc_cot_dua_250g_bich_mau_kraft_1_mat_trong_01_a2ae42094c51436891ab3bb0ac7567db_grande.jpg",
      title: "Đậu phộng nước cốt dừa, 250g, bịch, mẫu kraft 1 mặt trong",
      price: "43,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_phong_say_rau_cu_135g_bich_mau_kraft_1_mat_trong_01_f588067504e145158e9fe92c7e226414_grande.jpg",
      title: "Đậu phộng sấy rau củ, 135g, bịch, mẫu kraft 1 mặt trong",
      price: "36,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/dau_phong_say_sua_bap_125g_bich_mau_kraft_1_mat_trong_01_c34a541bde5b45a0842ab22cf702f426_grande.jpg",
      title: "Đậu phộng sấy sữa bắp, 125g, bịch, mẫu kraft 1 mặt trong",
      price: "33,000₫",
      category: 'Hạt đậu phộng'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hanh_nhan_rang_muoi_bien_275g_bich_mau_kraft_1_mat_trong_01_3ede55d2648444d1a98ecce085cbf096_grande.jpg",
      title: "Hạnh nhân rang muối biển, 275g, bịch, mẫu kraft 1 mặt trong",
      price: "164,000₫",
      category: 'Hạt hạnh nhân'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hat_dieu_vang_225g_bich_mau_kraft_1_mat_trong_01_cbf81f25e9f34eb59fd29a1e97808cdd_grande.jpg",
      title: "Hạt điều vàng, 225g, bịch, mẫu kraft 1 mặt trong",
      price: "109,000₫",
      category: 'Hạt điều'
    },
    {
      imagePath:
        "https://product.hstatic.net/1000303672/product/hat_dieu_vo_lua_225g_bich_mau_kraft_1_mat_trong_01_a2d5d1ffbc694854a4ad84709d86c65b_grande.jpg",
      title: "Hạt điều vỏ lụa, 225g, bịch, mẫu kraft 1 mặt trong",
      price: "83,000₫",
      category: 'Hạt điều'
    },
  ];

  const traicaysaydeo = [
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_ca_chua_bi_say_deo__225g__hu__mau_tobita__1000958__-_00001_ffa0f3dcccec4bbca2499932d17fb202_grande.jpg",
      "title": "Cà chua bi sấy dẻo nguyên vỏ, 150g, hũ, mẫu tobita",
      "price": "58,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/a_chua_bi_say_deo__300g__bich__mau_kraft_1_mat_trong__1000959__-_00001_c313be3eea4648289218d89f91ea1fbf_grande.jpg",
      "title": "Cà chua bi sấy dẻo nguyên vỏ, 200g, bịch, mẫu kraft 1 mặt trong",
      "price": "65,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/200608_hong_say_treo__dong_pho_thong__225g__bich_-_110627_-_01_669f87a31e864d4a9475ec3ebce56b36_grande.jpg",
      "title": "Hồng sấy treo Nhật Bản, 250g, bịch, dòng phổ thông, mẫu hút chân không",
      "price": "152,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_roi_say_deo__200g__hu__mau_tobita_-_01_11faaf042b1749459aeccba452aadd0d_grande.jpg",
      "title": "Roi sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "142,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_cam_say_deo__200g__hu__mau_tobita_-_01_32d7a4ebaeef415e9e88202ed69b6549_grande.jpg",
      "title": "Cam sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "97,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/cp7a7811_cd7b3d5410a84b2bac4ec1e3dd5e3953_grande.jpg",
      "title": "Cam sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "105,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/cp7a7815_3b5c47fe90d740c8ae5ed028d45865db_grande.jpg",
      "title": "Roi sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_oi_say_deo__200g__hu__mau_tobita_-_01_015674a79f524982a85dc11fd1d032af_grande.jpg",
      "title": "Ổi sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "68,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_oi_say_deo__225g__bich__mau_kraft_1_mat_trong_-_01_c3ba780ead5b47b5b3d5cdfafef162b3_grande.jpg",
      "title": "Ổi sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "69,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_oi_ruot_do_say_deo__200g__hu__mau_tobita_-_01_e4067348ce9d4ef0b2b9d974f34fdf0c_grande.jpg",
      "title": "Ổi ruột đỏ sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "131,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_oi_ruot_do_say_deo__225g__bich__mau_kraft_1_mat_trong_-_01_6de8def3ee9c496597796603e9d2835a_grande.jpg",
      "title": "Ổi ruột đỏ sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "140,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_ca_chua_bi_say_deo__225g__hu__mau_tobita_-_02_0b8f793a20014fdd91e4d706f92aec0a_grande.jpg",
      "title": "Cà chua bi sấy dẻo, 225g, hũ, mẫu tobita",
      "price": "109,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_ca_chua_bi_say_deo__300g__bich__mau_kraft_1_mat_trong_-_01_95eafb1a535d43f1913a3b3fef4a47d5_grande.jpg",
      "title": "Cà chua bi sấy dẻo, 300g, bịch, mẫu kraft 1 mặt trong",
      "price": "131,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_long_nhan_say_deo__180g__bich__mau_kraft_1_mat_trong_111182_01a_b29995ad5bdb462090840bbc1c69d2ec_grande.jpg",
      "title": "Long nhãn sấy dẻo, 180g, bịch, mẫu kraft 1 mặt trong",
      "price": "95,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thanh_long_say_deo__225g__bich__mau_kraft_1_mat_trong_110728_01a_30656586a1504d31866cc37214c88a03_grande.jpg",
      "title": "Thanh long sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "85,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_buoi_say_deo__225g__bich__mau_kraft_1_mat_trong_110723_01a_4004600c24724f26be0c7a56530c2f27_grande.jpg",
      "title": "Bưởi sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "76,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_tao_say_kho__300g__bich__mau_kraft_1_mat_trong_110727_01a_580830347817446d9db8a2103717ee45_grande.jpg",
      "title": "Táo sấy khô, 300g, bịch, mẫu kraft 1 mặt trong",
      "price": "90,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_chanh_day_say_deo__250g__bich__mau_kraft_1_mat_trong_110724_01a_e55782d0ff16450dbbdc1d711e91579e_grande.jpg",
      "title": "Chanh dây sấy dẻo, 250g, bịch, mẫu kraft 1 mặt trong",
      "price": "92,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_du_du_say_deo__bich__225g__mau_kraft_1_mat_trong_110725_01a_464358f1f86542a280c243b7bf677ee2_grande.jpg",
      "title": "Đu đủ sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "76,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_xoai_say_deo__225g__bich__mau_kraft_1_mat_trong_110730_01a_43d97260ad9440798fc51604e15195fb_grande.jpg",
      "title": "Xoài sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "93,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_man_say_deo__300g__bich__mau_kraft_1_mat_trong_110988_01a_3d084f6fc83f4fb8be4c67bf242a6bf8_grande.jpg",
      "title": "Mận sấy dẻo, 300g, bịch, mẫu kraft 1 mặt trong",
      "price": "103,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thom_say_deo__225g__bich__mau_kraft_1_mat_trong_110729_01a_f149c414e5854c9ea67c2b82eb456cdb_grande.jpg",
      "title": "Thơm sấy dẻo, 225g, bịch, mẫu kraft 1 mặt trong",
      "price": "101,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_mut_nho__bich__250g__mau_kraft_1_mat_trong_110726_01a_509c830ea83e4da7853d9566e1b17b30_grande.jpg",
      "title": "Mứt nho, 250g, bịch, mẫu kraft 1 mặt trong",
      "price": "92,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_xoai_say_deo__200g__hu__mau_tobita_111281_01a_1155755e9b2d4a39a474599f02f09a2f_grande.jpg",
      "title": "Xoài sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "92,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thom_say_deo__200g__hu__mau_tobita_111280_01a_-_copy_6706b07e83db4fac80131da7dd6c60aa_grande.jpg",
      "title": "Thơm sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "91,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thanh_long_say_deo__200g__hu__mau_tobita_111279_01a_296e0e4dafb14a3ba4d5160558c27fbe_grande.jpg",
      "title": "Thanh long sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "83,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_tao_say_kho__250g__hu__mau_tobita_111278_01a_13c68e55116040cc9e1ce68382dfce54_grande.jpg",
      "title": "Táo sấy khô, 250g, hũ, mẫu tobita",
      "price": "81,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_mut_nho__200g__hu__mau_tobita_111277_01a_07b75379071541eb9643ca4960427c2a_grande.jpg",
      "title": "Mứt nho, 200g, hũ, mẫu tobita",
      "price": "82,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_long_nhan_say_deo__150g__hu__mau_tobita_111275_01a_1635f502dfce48abbe55ae9e54d454ff_grande.jpg",
      "title": "Long nhãn sấy dẻo, 150g, hũ, mẫu tobita",
      "price": "76,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_buoi_say_deo__200g__hu__mau_tobita_111272_01a_9f1943047aa34c1c839f1b277bf114e0_grande.jpg",
      "title": "Bưởi sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "76,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_man_say_deo__250g__hu__mau_tobita_-_111276_-_01a_a79c3eb9a39b43ca811f9775e6ec4582_grande.jpg",
      "title": "Mận sấy dẻo, 250g, hũ, mẫu tobita",
      "price": "79,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_chanh_day_say_deo__225g__hu__mau_tobita_111273_01a_5f2a36869da042d2ac27ba978b3aa4ac_grande.jpg",
      "title": "Chanh dây sấy dẻo, 225g, hũ, mẫu tobita",
      "price": "91,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_du_du_say_deo__200g__hu__mau_tobita_111274_01a_641ebfd58d32496da10c3b3e35a7a171_grande.jpg",
      "title": "Đu đủ sấy dẻo, 200g, hũ, mẫu tobita",
      "price": "75,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/buoi_say_deo__650g__bich__mau_mawashi_-_01_cdb221b5e44d47f6a83292e06ff435f0_grande.jpg",
      "title": "Bưởi sấy dẻo, 650g, bịch, mẫu mawashi",
      "price": "197,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/xoai_say_deo__650g__bich__mau_mawashi_-_01_3292bcc8e5f54f80af27ee613fbc4901_grande.jpg",
      "title": "Xoài sấy dẻo, 650g, bịch, mẫu mawashi",
      "price": "259,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/0608_chuoi_la_ba_say_deo__300g__bich__mau_hut_chan_khong_-_111076_-_01_982f02f8bc5c4c27b8cb64338ae272c3_grande.jpg",
      "title": "Chuối la ba Đà Lạt sấy dẻo, 300g, bịch, mẫu hút chân không",
      "price": "65,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/200608_chuoi_say_deo__300g__bich__mau_hut_chan_khong_-_110083_-_01_cc58114c4d7343898b732a60f281445d_grande.jpg",
      "title": "Chuối sấy dẻo, 300g, bịch, mẫu hút chân không",
      "price": "55,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/00608_khoai_lang_say_deo__300g__bich__mau_hut_chan_khong_-_110107_-_01_db7e495aefd4484d8831f148ed5de637_grande.jpg",
      "title": "Khoai lang sấy dẻo, 300g, bịch, mẫu hút chân không",
      "price": "85,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/say_treo_nhat_ban__dong_dac_biet__270g__hop__mau_van_go_-_110685_-_01c_grande.jpg",
      "title": "Hồng sấy treo Nhật Bản, dòng đặc biệt, 270g, hộp, mẫu vân gỗ",
      "price": "228,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/ay_treo_nhat_ban__dong_pho_thong__250g__hop__mau_van_go_-_110686_-_01a_grande.jpg",
      "title": "Hồng sấy treo Nhật Bản, dòng phổ thông, 250g, hộp, mẫu vân gỗ",
      "price": "194,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/200608_hong_che_say_deo__300g__bich__mau_hut_chan_khong_-_110109_-_03_2a9fce8f49984d709cc6823fab39f17f_grande.jpg",
      "title": "Hồng chẻ sấy dẻo, 300g, bịch, mẫu hút chân không",
      "price": "120,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/200608_hong_chen_say_deo__300g__bich__mau_hut_chan_khong_-110096_-_01_4991630cf9bd4e52ad62249c55904b08_grande.jpg",
      "title": "Hồng chén sấy dẻo, 300g, bịch, mẫu hút chân không",
      "price": "131,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/200608_hong_say_treo__dong_pho_thong__225g__bich_-_110627_-_01_82851661553c4be7929a62c3b68c2362_grande.jpg",
      "title": "Hồng sấy treo Nhật Bản, 225g, bịch, dòng phổ thông, mẫu hút chân không",
      "price": "124,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_man_say_deo__300g__hu__mau_nap_nhom_1fe92c970ef041e591cb54e130e189ba_grande.jpg",
      "title": "Mận sấy dẻo, 300g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_xoai_say_deo__225g__hu__mau_nap_nhom_93566803b58f4f2fb165546a67ee44c9_grande.jpg",
      "title": "Xoài sấy dẻo, 225g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_buoi_say_deo__225g__hu__mau_nap_nhom_db9efe0a86a74369ae91fa529a7a1b5b_grande.jpg",
      "title": "Bưởi sấy dẻo, 225g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_tao_say_kho__300g__hu__mau_nap_nhom_22e1364b1e8741f0b0550df62e024001_grande.jpg",
      "title": "Táo sấy khô, 300g, hũ, mẫu nắp nhôm",
      "price": "87,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_du_du_say_deo__225g__hu__mau_nap_nhom_399635d23b104d729c05aa07b82befc1_grande.jpg",
      "title": "Đu đủ sấy dẻo, 225g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_thom_say_deo__225g__hu__mau_nap_nhom_4f6f987d900f49268696b11a465cf1cf_grande.jpg",
      "title": "Thơm sấy dẻo, 225g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/190914_chanh_day_say_deo__250g__hu__mau_nap_nhom_f9105c9b78854d5bbfb9507aae8a55da_grande.jpg",
      "title": "Chanh dây sấy dẻo, 250g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy dẻo"
    }
  ]

  const traicaysaykho = [
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_mit_say_gion__250g__bich__mau_mawashi__1000687__-_00001_51f5e5c794664b0a85d5c45f8f9966bb_grande.jpg",
      "title": "Mít sấy giòn, 225g, bịch, mẫu mawashi",
      "price": "82,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thap_cam_say__80g__hu__mau_tobita_111287_01a_98ae6e94aba64b3bb392ed697a7fb68a_grande.jpg",
      "title": "Thập cẩm sấy giòn, 90g, hũ, mẫu tobita, L’angfarm",
      "price": "33,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/cp7a2647_ea442d1b0b944fd28b001e31c5dd5667_grande.jpg",
      "title": "Củ sen sấy giòn, 70g, hũ, mẫu tobita",
      "price": "69,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/thap_cam_say__400g__bich__mau_mawashi_-_01_f910ed574cc24b0b84c1265fd84b2cb0_grande.jpg",
      "title": "Thập cẩm sấy giòn, 400g, bịch, mẫu mawashi",
      "price": "95,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/chuoi_say__400g__bich__mau_mawashi_-_01_eab006734a2b47c68e78cc6e5000feee_grande.jpg",
      "title": "Chuối sấy giòn, 400g, bịch, mẫu mawashi",
      "price": "73,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/khoai_lang_tim_say_soi__350g__bich__mau_mawashi_-_01_ec06af38898d43b2ae921e8c5a24f828_grande.jpg",
      "title": "Khoai lang tím sấy giòn, 350g, bịch, mẫu mawashi",
      "price": "87,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/khoai_lang_vang_say_soi__350g__bich__mau_mawashi_-_01_9c75af252c2247c0a5fd7677907c692d_grande.jpg",
      "title": "Khoai lang vàng sấy giòn, 350g, bịch, mẫu mawashi",
      "price": "85,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/khoai_mon_say__350g__bich__mau_mawashi_-_01_f94bb272def243088df859f46459f8f6_grande.jpg",
      "title": "Khoai môn sấy giòn, 350g, bịch, mẫu mawashi",
      "price": "129,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/mit_say__250g__bich__mau_mawashi_-_01_38377730ff064b149e36b40a38036cb2_grande.jpg",
      "title": "Mít sấy giòn, 250g, bịch, mẫu mawashi",
      "price": "87,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_mit_say__60g__hu__mau_tobita_111286_01a_ffaaf7cea5124a5f885a331f688a65c1_grande.jpg",
      "title": "Mít sấy giòn, 60g, hũ, mẫu tobita",
      "price": "33,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_mon_say__80g__hu__mau_tobita_111285_01a_1dd6e0daa736453b9a44b438f298bfe1_grande.jpg",
      "title": "Khoai môn sấy giòn, 80g, hũ, mẫu tobita",
      "price": "43,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_lang_vang_say__80g__hu__mau_tobita_111284_01a_8a42968896fd49ef90fa8f3d5f7466f4_grande.jpg",
      "title": "Khoai lang vàng sấy giòn, 80g, hũ, mẫu tobita",
      "price": "32,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_lang_tim_say__80g__hu__mau_tobita_111283_01a_56aeafd638784a2ba70467b2e0d470cd_grande.jpg",
      "title": "Khoai lang tím sấy giòn, 80g, hũ, mẫu tobita",
      "price": "33,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_chuoi_say__100g__hu__mau_tobita_111282_01a_e5ccc9494903446cadb5948ae9139649_grande.jpg",
      "title": "Chuối sấy giòn, 100g, hũ, mẫu tobita",
      "price": "30,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/thap_cam_say__dong_pho_thong__450g__bich__mau_nhan_kep_-_110110_-_01a_grande.jpg",
      "title": "Thập cẩm sấy giòn, 450g, bịch, mẫu nhãn kẹp",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_thap_cam_say__100g__bich__mau_kraft_1_mat_trong_110736_01a_030ae45153974445af66b6d1d139b833_grande.jpg",
      "title": "Thập cẩm sấy giòn, 100g, bịch, mẫu kraft 1 mặt trong",
      "price": "32,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_mit_say__80g__bich__mau_kraft_1_mat_trong_110735_01a_820743a328924423a1bfa5b8940329cc_grande.jpg",
      "title": "Mít sấy giòn, 80g, bịch, mẫu kraft 1 mặt trong",
      "price": "35,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_mon_say__120g__bich__mau_kraft_1_mat_trong_110734_01a_05caf8ad79134740a831dc27aead8a98_grande.jpg",
      "title": "Khoai môn sấy giòn, 120g, bịch, mẫu kraft 1 mặt trong",
      "price": "50,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_lang_vang_say__120g__bich__mau_kraft_1_mat_trong_110733_01a_e1180145b0a14f1ebf0d5bfb93fa76b1_grande.jpg",
      "title": "Khoai lang vàng sấy giòn, 120g, bịch, mẫu kraft 1 mặt trong",
      "price": "36,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_khoai_lang_tim_say__120g__bich__mau_kraft_1_mat_trong_110732_01a_1345a0d346004c55b5d1d397e6e6d878_grande.jpg",
      "title": "Khoai lang tím sấy giòn, 120g, bịch, mẫu kraft 1 mặt trong",
      "price": "37,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/lfm_chuoi_say__120g__bich__mau_kraft_1_mat_trong_110731_01a_385a5a288048404192836fbf7143cea3_grande.jpg",
      "title": "Chuối sấy giòn, 120g, bịch, mẫu kraft 1 mặt trong",
      "price": "29,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/cp7a7823_b527002609f24706be82ff54b7476920_grande.jpg",
      "title": "Củ sen sấy giòn, 80g, bịch, mẫu kraft 1 mặt trong",
      "price": "72,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_chuoi_say__120g__hu__mau_nap_nhom_-_110608_-_01_a2d1c938559a4477b2b8557af1ac1253_grande.jpg",
      "title": "Chuối sấy giòn, 120g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_khoai_lang_tim_say__soi___120g__hu__mau_nap_nhom_-_110605_-_01_6e96b1cd84564888befea583aebb0d40_grande.jpg",
      "title": "Khoai lang tím sấy giòn, 120g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_khoai_lang_vang_say__soi___120g__hu__mau_nap_nhom_-_110606_-_01_b6fe2487040a43919701207bfcefb9e0_grande.jpg",
      "title": "Khoai lang vàng sấy giòn, 120g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_khoai_mon_say__120g__hu__mau_nap_nhom_-_110607_-_01_d1b66635843d48359e7aafa5b7f5376b_grande.jpg",
      "title": "Khoai môn sấy giòn, 120g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_mit_say__80g__hu__mau_nap_nhom_-_110604_-_01_bc1921b4d8874950ae4e6e9760212c2e_grande.jpg",
      "title": "Mít sấy giòn, 80g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    },
    {
      "imagePath": "https://product.hstatic.net/1000303672/product/191007_thap_cam_say__100g__hu__mau_nap_nhom_-_110603_-_01_05ea7d5b91284ffa90408c40c1383cb1_grande.jpg",
      "title": "Thập cẩm sấy giòn, 100g, hũ, mẫu nắp nhôm",
      "price": "100,000₫",
      "category": "Trái cây sấy khô"
    }
  ]

  function convertPriceToInteger(price) {
    // Remove currency symbols and commas
    let priceConverted = price.replace(/[^\d]/g, "");

    // Convert the string to an integer
    let integerPrice = parseInt(priceConverted, 10);

    return integerPrice;
  }

  async function seedProducts(products, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      const productsWithCategory = products.filter((item) => item.category === categStr)
      for (let i = 0; i < productsWithCategory.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: productsWithCategory[i].title,
          imagePath: productsWithCategory[i].imagePath,
          imageGallery: [],
          summary: null,
          description: null,
          price: convertPriceToInteger(productsWithCategory[i].price),
          discount: 10,
          manufacturer: 'Việt Nam',
          available: 100,
          category: categ._id,
          rating: 5,
          numberRating: 0
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(nuts, "Hạt macca");
  await seedProducts(nuts, "Hạt bắp");
  await seedProducts(nuts, "Hạt sen");
  await seedProducts(nuts, "Hạt hạnh nhân");
  await seedProducts(nuts, "Hạt điều");
  await seedProducts(nuts, "Hạt đậu phộng");
  await seedProducts(nuts, "Hạt đậu nành");
  await seedProducts(nuts, "Hạt đậu hòa lan");
  await seedProducts(nuts, "Hạt thập cẩm");

  await seedProducts(traicaysaydeo, "Trái cây sấy dẻo");
  await seedProducts(traicaysaykho, "Trái cây sấy khô");
  await closeDB();
}

seedDB();
