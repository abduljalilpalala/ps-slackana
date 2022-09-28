import tw from 'twin.macro'

type MenuButtonProps = {
  open: boolean
}

const slate_900 = '#0f172a'
const slate_200 = '#e2e8f0'
const slate_100 = '#f1f5f9'

export const styles = {
  menu_button: ({ open }: MenuButtonProps) => [
    tw`
      flex items-center rounded-md px-1.5 transition duration-150 
      ease-in-out hover:bg-[${slate_200}] hover:text-[${slate_900}]
      [> span]:(ml-1 text-sm line-clamp-1)
    `,
    open && tw`bg-[${slate_200}] text-[${slate_900}]`
  ],
  menu_items: [
    tw`
      absolute right-0 mt-1 w-44 origin-top-right divide-y divide-gray-200 overflow-hidden 
      rounded-md bg-white py-1 shadow-xl border border-[${slate_200}] focus:outline-none
    `
  ],
  menu_item_button: [
    tw`
      flex w-full items-center space-x-3 py-2 px-4 text-sm font-medium text-[${slate_900}]
      transition duration-150 ease-in-out hover:bg-[${slate_100}]
      [> span]:(h-2 w-2 rounded-full)
    `
  ]
}
