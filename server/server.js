import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { dbConnect } from './config/config.mongoose.js'
import userRouter from './routes/user.routes.js'


dbConnect()
config()

const PORT = process.env.PORT
const app = express()

app.use( cors( { origin: 'http://localhost:5173', credentials: true } ) )
// 🔐 credentials: true tells the browser it's okay to send cookies/credentials.
// 🎯 origin must be explicit. You can’t use '*' if credentials: true.
app.use( express.json())
app.use( cookieParser() )
// cookie-parser is a middleware used in Express applications to parse cookies attached to the request object.
// When you import cookie-parser and use it as middleware, it automatically parses incoming cookies and makes them available in req.cookies
// When used with app.use(cookieParser()), this middleware will parse any cookies sent with incoming HTTP requests and populate req.cookies with an object containing key-value pairs where the keys are cookie names and the values are the cookie values.
app.use('/v1/user', userRouter)

app.listen( PORT, ()=> console.log(`Listening on port ${PORT}`)  )

// Purpose: cookie-parser simplifies the process of reading and parsing cookies in Express requests.

// Usage: It makes cookies available in req.cookies for easy access and manipulation.

// Signatures: It can also handle signed cookies, ensuring that the cookie values haven’t been tampered with.

// Security: Helps handle cookies with httpOnly, secure, and sameSite attributes, which enhance security (especially for authentication tokens).

// By using cookie-parser, you gain the ability to easily work with cookies in Express, making it especially useful for implementing things like authentication systems that rely on JWT tokens stored in cookies.