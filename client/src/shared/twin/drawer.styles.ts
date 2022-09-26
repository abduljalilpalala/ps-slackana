import tw from 'twin.macro'

export const styles = {
  wrapper: tw`relative flex min-h-screen flex-col justify-between`,
  business_logo: [
    tw`
      flex w-full items-center justify-between px-5 py-2.5
      [> div]:(flex items-center space-x-3 text-white)
      [> div > svg]:(h-6 w-6)
      [> div > p]:(text-xl font-semibold)
      [> div > button]:(active:scale-95)
      [> div > button > svg]:(h-5 w-5 fill-current text-white)
    `
  ]
}
