import tw from 'twin.macro'

export const styles = {
  main: tw`flex min-h-screen items-center justify-center bg-white md:(bg-[#f8fafc])`,
  section: tw`w-full max-w-[423px] rounded-lg bg-white py-12 px-10 shadow-none md:(shadow-lg)`,
  nav: tw`flex flex-col items-center space-y-2`,
  business_logo: [
    tw`
      flex items-center space-x-4
      [> svg]:(h-6 w-6)
      [> h1]:(text-xl font-normal text-black)
    `
  ],
  google_provider: [
    tw`
      flex w-full flex-col items-center
      [> h1]:(mt-2 text-2xl font-normal text-black)
      [> button]:(
        relative mt-6 flex w-full items-center justify-center rounded border-none py-2.5 px-4
        ring-1 ring-[#cbd5e1] transition duration-150 ease-in-out hover:ring-2
        hover:ring-blue-600
      )
      [> button > svg]:(absolute left-4 h-4 w-4)
      [> button > span]:(text-sm font-normal text-[#1e293b])
    `
  ],
  or: [
    tw`
      relative mt-6 flex w-full items-center justify-center border-t border-[#edeae9]
      [> span]:(absolute bg-white px-2 text-sm font-light)
    `
  ],
  form: tw`mt-7 space-y-4`,
  form_submit: [
    tw`w-full rounded bg-blue-600 px-5 py-2 text-center text-sm`,
    tw`text-white transition duration-150 ease-in-out hover:bg-blue-700`,
    tw`focus:outline-none focus:ring-4 focus:ring-blue-600/50`,
    tw`disabled:opacity-50 disabled:hover:bg-blue-600`,
    tw`flex justify-center`
  ],
  footer: [
    tw`
      mt-5 text-center text-xs text-[#64748b]
      [> a]:(ml-2 text-blue-600 font-semibold hover:underline focus:underline)
    `
  ]
}
