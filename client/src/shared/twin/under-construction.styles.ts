import tw from 'twin.macro'

export const styles = {
  main: [tw`bg-white flex flex-col min-h-screen items-center justify-center`],
  section: [
    tw`
      flex flex-col items-center
      [> h1]:(text-lg md:text-3xl font-medium text-yellow-900)
      [> p]:(mt-3 text-gray-500 text-sm md:text-base text-center)
    `
  ]
}
