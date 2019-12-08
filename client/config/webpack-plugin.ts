// const { UmiRule } = require('chain-css-loader')

declare namespace process {
  const env: any
} 

export default (config: any, { webpack }: any) => {
  // const rule = new UmiRule(config, {
  //   modules: false
  // })
  // rule.useStylus()

  config.output.filename('[name].[hash].js')
  
  var definePluginObj = {
    PRODOCE: process.env.NODE_ENV !== 'production' ? JSON.stringify(true) : JSON.stringify(false)
  };
  config.plugin('define-plugin').use(new webpack.DefinePlugin(definePluginObj))

  config.optimization.splitChunks({
    minSize: 300,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
        priority: -10,
      },
      antdesigns: {
        name: 'antdesigns',
        chunks: 'all',
        test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        priority: -11,
      }
    }
  })

};
