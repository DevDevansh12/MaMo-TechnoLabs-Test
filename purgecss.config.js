module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  css: ["./css/style1.css"],
  output: "./css",
  safelist: [
    "active",
    "show",
    "fade",
    "open",
    /^slick-/,
    /^swiper-/,
    /^modal/
  ]
}
