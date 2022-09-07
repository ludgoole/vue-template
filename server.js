const http = require('http')
const fs = require('fs')
const url = require('url')
const cp = require('child_process')
const port = 80

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true)
  const ext = pathname.split('.').slice(-1)[0]

  console.log('pathname', pathname)

  // 判断我们访问的路径存在不存在；
  fs.stat(__dirname + pathname, (err) => {
    // fs.stat() 判断路径是否存在，如果不存在err将会是一个对象，如果路径存在err是null
    if (err) {
      res.statusCode = '404'
      res.end(`${pathname} is not found`)
    }
    else {
      // 如果代码执行到这里，说明路径有效；
      res.statusCode = '200'

      let filePath = ''
      if (pathname === '/') {
        // 当访问路径是 / 时要返回index.html
        filePath = `${__dirname}/index.html`
        res.setHeader('Content-Type', 'text/html')
      }
      else {
        filePath = __dirname + pathname
        res.setHeader('Content-Type', `text/${ext === 'js' ? 'javascript' : ext}`)
      }

      fs.readFile(filePath, (err, data) => {
        res.end(data)
      })
    }
  })
})
server.listen(port, () => console.log(`port ${port} is on`))

// 自动打开默认浏览器
cp.exec(`start http://localhost:${port}/#/`)
