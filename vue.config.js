module.exports = {
  devServer: {
    proxy: {
      '/rest': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        ws: true,
      } 
    }
  }
}