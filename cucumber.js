// module.exports = { default: "--publish-quiet" };
// export default {
//   default: {
//     paths: ["features/**/*.feature", "projectManagementCucumber/features/**/*.feature"],

//     import: [
//       "features/support/**/*.js",
//       "features/step_definitions/**/*.js",

//       "projectManagementCucumber/support/**/*.js",
//       "projectManagementCucumber/step-definitions/**/*.js",
//     ],

//     format: ["progress"],
//   },
// };

// export default {
//   default: {
//     paths: ["projectManagementCucumber/features/**/*.feature"],

//     import: ["projectManagementCucumber/support/**/*.js", "projectManagementCucumber/step-definitions/**/*.js"],

//     format: ["progress"],
//   },
// };
// export default {
//   default: {
//     paths: ["projectManagementCucumber/features/**/*.feature"],
//     import: ["projectManagementCucumber/support/**/*.js", "projectManagementCucumber/step-definitions/**/*.js"],
//     format: ["progress"],
//   },
// };

export default {
  paths: ["projectManagementCucumber/features/**/*.feature"],

  import: ["projectManagementCucumber/support/**/*.js", "projectManagementCucumber/step-definitions/**/*.js"],

  format: ["progress"],
};
