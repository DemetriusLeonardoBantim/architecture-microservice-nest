import {getSession, useUser} from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'

export default function Home() {
  const {user} = useUser()

  return (
    <a href="/api/auth/login">Login</a>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req, res)
 
  if(!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    }
  }else {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}