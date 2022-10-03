import { GetServerSideProps } from 'next'

import { setAuth } from '~/redux/auth/authSlice'
import { wrapper } from '~/redux/store'
import { axios } from '~/shared/lib/axios'

export const signInUpAuthCheck: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies['token']
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const res = await axios.get('/api/auth', config)
        if (res.data) {
          store.dispatch(setAuth(res.data))
          return {
            redirect: {
              permanent: false,
              destination: '/'
            },
            props: {}
          }
        }
      } catch (error: any) {}

      return {
        props: {}
      }
    }
)

export const authCheck: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies['token']
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const res = await axios.get('/api/auth', config)
        store.dispatch(setAuth(res.data))
      } catch (error: any) {
        return {
          redirect: {
            permanent: false,
            destination: '/sign-in'
          },
          props: {}
        }
      }

      return {
        props: {}
      }
    }
)
