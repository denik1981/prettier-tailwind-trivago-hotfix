/*
 * @link https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1024722576
 */

const tailwind = require("prettier-plugin-tailwindcss");
const organizeImports = require("@trivago/prettier-plugin-sort-imports");

const combinedFormatter = {
  ...tailwind,
  parsers: {
    ...tailwind.parsers,
    ...Object.keys(organizeImports.parsers).reduce((acc, key) => {
      acc[key] = {
        ...tailwind.parsers[key],
        preprocess(code, options) {
          return organizeImports.parsers[key].preprocess(code, options);
        },
      };
      return acc;
    }, {}),
  },
};

module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 110,
  arrowParens: "always",
  importOrder: ["^next$", "^next/(.*)$", "^(.*)styles/(.*)$"],
  importOrderSeparation: true,
  plugins: [combinedFormatter],
};
