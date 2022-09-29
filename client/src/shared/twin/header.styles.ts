import tw from 'twin.macro'

const slate_700 = '#334155'
const slate_900 = '#0f172a'
const slate_50 = '#f8fafc'

export const styles = {
  header: tw`border-b border-[${slate_700}] bg-[${slate_900}]`,
  container: tw`flex w-full items-center justify-between`,
  menu_wrapper: [
    tw`
      flex items-center
      [> div > button]:(cursor-pointer px-3 py-3 hover:bg-blue-600)
      [> div > button > svg]:(h-5 w-5 text-[${slate_50}])
    `
  ],
  bussiness_logo: [
    tw`
      ml-2 flex items-center space-x-2
      [> svg]:(h-5 w-5)
      [> h1]:(font-bold text-gray-200)
    `
  ],
  options: tw`flex flex-shrink-0 items-center justify-end space-x-2 px-4`
}
