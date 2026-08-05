// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createServer } = require('http')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000, () => {
        console.log('Next.js app ready')
    })
})