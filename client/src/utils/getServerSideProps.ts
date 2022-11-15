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
    async ({ req, params, query }) => {
      const token = req.cookies['token']
      const config = { headers: { Authorization: `Bearer ${token}` } }

      try {
        const res = await axios.get('/api/auth', config)
        store.dispatch(setAuth(res.data))
        if (
          req.url?.includes('overview') ||
          req.url?.includes('chat') ||
          req.url?.includes('board')
        ) {
          await axios.get(`/api/project/${params?.id}/member/${res.data.id}`, config)
          if (req.url?.includes('board?task_id')) {
            await axios.get(`/api/project/${params?.id}/task/${query?.task_id}/details`, config)
          }
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          return {
            notFound: true
          }
        }
        if (error.response.status === 500) {
          throw new Error('Internal Server Error')
        }
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
