module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    quotes: [
      1,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "react/display-name": "off",
  },
};
