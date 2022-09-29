import tw from 'twin.macro'

const slate_600 = '#475569'
const slate_800 = '#1e293b'
const slate_400 = '#94a3b8'
const slate_700 = '#334155'

export const styles = {
  aside: [
    tw`
      w-full border-r border-[${slate_600}] bg-[${slate_800}]
      flex flex-col justify-between text-[${slate_400}]
      flex-shrink-0 transition-all duration-300 ease-in-out
    `
  ],
  wrapper: tw`hidden flex-col overflow-hidden md:flex`,
  business_logo: [
    tw`
      flex w-full items-center justify-between px-5 py-2.5
      [> div]:(flex items-center space-x-3 text-white)
      [> div > svg]:(h-6 w-6)
      [> div > p]:(text-xl font-semibold)
    `
  ],
  nav: [
    tw` 
      md:h-screen min-w-[280px]
      [> ul]:(flex flex-col)
      [> ul > li > a]:(
        block w-full py-2 px-5 text-sm 
        flex cursor-pointer items-center space-x-3 font-medium
      )
      [> ul > li > a > svg]:(h-4 w-4)
    `
  ],
  project_wrapper: tw`flex-1`,
  project_caret: [
    tw`
      flex items-center justify-start px-5 py-3
      cursor-pointer select-none space-x-3
      [> p]:(text-sm font-medium)
    `
  ],
  li: [
    tw`
      inline-flex w-full items-center space-x-3 text-sm
      [> a]:(
        flex w-full items-center justify-between px-5 py-1.5
      )
    `
  ],
  link: [
    tw`
      flex items-center space-x-3
      [> svg]:(h-4 w-4 flex-shrink-0)
    `
  ],
  footer: [
    tw`
      flex items-center justify-between border-t 
      border-[${slate_700}] px-5 py-2
    `
  ],
  user_wrapper: tw`flex items-center space-x-3 flex-shrink-0`,
  user_details: [
    tw`
      flex flex-col
      [> h1]:(text-xs font-bold uppercase)
      [> span]:(text-xs font-light)
    `
  ]
}
