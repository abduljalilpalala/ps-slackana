import tw from 'twin.macro'

type ButtonProps = {
  open: boolean
}

const slate_900 = '#0f172a'
const slate_200 = '#e2e8f0'
const rose_600 = '#e11d48'
const rose_50 = '#fff1f2'

export const styles = {
  menu_button: ({ open }: ButtonProps) => [
    tw`
      rounded-md px-1 transition duration-150 ease-in-out
      hover:bg-[${slate_200}] hover:text-[${slate_900}]
      [> svg]:(h-5 w-5)
    `,
    open && tw`bg-[${slate_200}] text-[${slate_900}]`
  ],
  menu_items: [
    tw`
      absolute left-0 w-44 origin-top-left divide-y
      divide-gray-200 overflow-hidden rounded-md bg-white shadow-xl
       focus:outline-none border border-[${slate_200}]
    `
  ],
  menu_item_button: [
    tw`
      flex w-full items-center py-2 px-4 text-sm
      font-medium text-[${rose_600}] transition duration-150
      ease-in-out hover:bg-[${rose_50}]
      [> svg]:(mr-2 h-4 w-4)
    `
  ]
}
