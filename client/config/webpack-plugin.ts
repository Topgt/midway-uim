// const { UmiRule } = require('chain-css-loader')

declare namespace process {
  const env: any
} 

export default (config: any, { webpack }: any) => {
  // const rule = new UmiRule(config, {
  //   modules: false
  // })
  // rule.useStylus()
  
  var definePluginObj = {
    PRODOCE: process.env.NODE_ENV !== 'production' ? JSON.stringify(true) : JSON.stringify(false)
  };
  config.plugin('define-plugin').use(new webpack.DefinePlugin(definePluginObj))

  config.optimization.splitChunks({
    minSize: 300,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 1,
    maxInitialRequests: 1,
    cacheGroups: {
      vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules|Views\/*.js$/,
      },
    }
  })

};
