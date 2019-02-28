module.exports = {
    devServer: {
        proxy: {
            '^/login': {
                target: '^/dashboard',
                ws: true,
                changeOrigin: true
            }
        }
    }
}