import tw from 'twin.macro'

type PopoverButtonProps = {
  open: boolean
}

const slate_900 = '#0f172a'
const slate_200 = '#e2e8f0'

export const styles = {
  popover: tw`relative z-40`,
  popover_button: ({ open }: PopoverButtonProps) => [
    tw`
      cursor-pointer rounded-full p-1 text-white focus:outline-none hover:bg-blue-600
      [> svg]:(h-5 w-5)
    `,
    open && tw`bg-blue-600`
  ],
  popover_panel: [
    tw`
      absolute right-0 mt-2 w-64 origin-top-right divide-y divide-gray-200 overflow-hidden
      rounded-b-md bg-white shadow-lg border border border-[${slate_200}] focus:outline-none
    `
  ],
  header: [
    tw`
      px-3 py-2
      [> h1]:(text-sm font-semibold)
    `
  ],
  main: [
    tw`
      max-h-[25vh] min-h-[25vh] py-2
      [> a]:(flex items-center border-b px-4 py-3 hover:bg-gray-100)
    `
  ],
  footer: [
    tw`
      [> a]:(block bg-[${slate_900}] py-2 text-center text-sm font-bold text-white)
    `
  ]
}
