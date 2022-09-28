import tw from 'twin.macro'
import { NextRouter } from 'next/router'

type LinkProps = {
  id: string | string[] | undefined
  slug: string
  router: NextRouter
}

const slate_900 = '#0f172a'
const slate_800 = '#1e293b'
const slate_600 = '#475569'
const slate_500 = '#64748b'
const slate_300 = '#cbd5e1'
const slate_100 = '#f1f5f9'

export const styles = {
  header: tw`z-10 flex items-center justify-between border-b border-[${slate_300}] bg-white px-5`,
  section: [
    tw`
      flex items-center space-x-4
      [> button]:(rounded-lg bg-blue-600 px-1.5 py-1)
      [> button > svg]:(h-7 w-7 text-white)
    `
  ],
  project_details: [
    tw`
      -mb-1.5 flex items-center space-x-2 text-[${slate_600}]
      [> h1]:(text-lg font-semibold text-[${slate_900}] line-clamp-1)
    `
  ],
  nav: [
    tw`
      [> ul]:(flex items-center space-x-4)
    `
  ],
  a: ({ router, id, slug }: LinkProps) => [
    tw`
      border-b-[3px] pb-0.5 text-sm font-normal
      transition duration-150 ease-in-out cursor-pointer
    `,
    router.asPath.includes(`/team/${id}/${slug}`)
      ? tw`border-blue-600 font-medium text-blue-600`
      : tw`border-transparent text-[${slate_500}] hover:border-[${slate_500}]`
  ],
  members: [
    tw`
      flex flex-shrink-0  items-center space-x-0.5 rounded-lg border border-[${slate_300}]
      px-1 py-0.5 transition duration-150 ease-in-out hover:bg-[${slate_100}]
      [> div]:(flex -space-x-1.5)
      [> div > img]:(h-6 w-6 rounded-lg border-2 border-white)
      [> h3]:(text-sm font-bold text-[${slate_800}])
    `
  ]
}
