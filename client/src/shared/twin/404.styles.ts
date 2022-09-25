import tw from 'twin.macro'

export const styles = {
  wrapper: [
    tw`flex items-center justify-center px-4 h-screen min-h-screen`,
    tw`bg-white text-gray-800 transition ease-in-out duration-700`
  ],
  container: tw`flex flex-col items-center space-y-4 max-w-md`,
  header: [
    tw`
      flex items-center
      [> span]:(font-extrabold text-9xl)
      [> div]:(flex-shrink-0 z-50)
    `
  ],
  section: [
    tw`
      flex flex-col items-center
      [> h2]:(text-xl uppercase font-bold)
      [> p]:(text-gray-500 text-sm text-center)
    `
  ],
  btn_homepage: [
    tw`px-6 py-3 rounded-full bg-yellow-300 hover:bg-yellow-400 text-white`,
    tw`font-semibold hover:shadow-xl transition ease-in-out duration-150 `,
    tw`focus:outline-none transition ease-in-out duration-150 cursor-pointer`
  ]
}
