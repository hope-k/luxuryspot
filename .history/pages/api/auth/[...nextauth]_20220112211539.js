import NextAuth from 'next-auth'
import { dbConnect } from '../../../backend/dbConfig/dbConnect'
import User from '../../../backend/models/user'
import CredentialsProvider from 'next-auth/providers/credentials'




export default NextAuth({

    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in with email and password',
            async authorize(credentials) {
                dbConnect(); //connect database
                const { email, password } = credentials;
                //Check if email and password is entered
                if (!email || !password) {
                    throw new Error('Please enter email or password');
                }
                //Find user in the db
                const user = await User.findOne({ email: email }).select('+password')
                if (!user) {
                    throw new Error('Invalid Email or Password')
                }


                //Check if password is valid
                const isPasswordMatch = await user.comparePassword(password);

                if (!isPasswordMatch) {
                    throw new Error('Invalid Email or Password')

                }

                return Promise.resolve(user)




            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return Promise.resolve(session)
        }
    },
    jwt: {
        secret: 'MWpgryxBGo15xcgP1GUUy6l4F3n55HfQMF3/WBphMuo=',
        maxAge: 15 * 24 * 60 * 60,
    }
})
