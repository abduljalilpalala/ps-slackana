import type { NextPage } from 'next'

import Layout from '~/components/templates/HomeLayout'

const Index: NextPage = () => {
  return (
    <Layout metaTitle="Home">
      <div className="container p-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste aut ut velit nobis
        et, tempore perspiciatis odio adipisci debitis esse, saepe, at nulla accusantium quam
        provident beatae quibusdam deleniti.
      </div>
    </Layout>
  )
}

export default Index
