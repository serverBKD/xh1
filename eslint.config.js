import config from "eslint-config-standard";

//export default [...[].concat(config)];
export default [
  {
    rules: {
      eqeqeq: "off",
      semi: ["error", "never"],
      "no-unused-expressions": "warn",
      "no-unused-vars": "warn",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
];
