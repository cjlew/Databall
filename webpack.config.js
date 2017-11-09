module.exports = {
  context: __dirname,
  entry: "./lib/scatter.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};
