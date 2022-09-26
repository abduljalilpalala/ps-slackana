import tw from 'twin.macro'

type PopoverButtonProps = {
  open: boolean
}

const slate_900 = '#0f172a'
const slate_300 = '#cbd5e1'
const slate_200 = '#e2e8f0'
const slate_50 = '#f8fafc'

export const styles = {
  popover: tw`relative`,
  popover_button: ({ open }: PopoverButtonProps) => [
    tw`
      rounded-full hover:bg-blue-600 hover:text-white
      transition duration-150 ease-in-out active:scale-95
      p-1 focus:outline-none
      [> svg]:(h-6 w-6)
    `,
    open && tw`bg-blue-600 text-white`
  ],
  popover_panel: tw`absolute right-0 bottom-10 w-60 origin-top-right overflow-hidden`,
  section: [
    tw`
      z-20 divide-y divide-gray-800 overflow-hidden rounded-lg
      bg-[${slate_900}] shadow-lg ring-1 ring-white ring-opacity-5
      [> button]:(
        w-full py-2 px-4 text-left text-sm text-[${slate_200}]
        transition duration-150 ease-in-out hover:bg-blue-600
      )
    `
  ],
  user_wrapper: [
    tw`
      flex justify-between py-4
      [> svg]:(mr-4 h-6 w-6 text-blue-600)
    `
  ],
  user_details: [
    tw`
      flex items-center space-x-4 px-4
      [> div]:(flex flex-col)
      [> div > h1]:(text-sm font-bold uppercase text-[${slate_50}])
      [> div > span]:(text-xs font-light text-[${slate_300}])
    `
  ]
}
