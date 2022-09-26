import tw from 'twin.macro'

type MenuItemProps = {
  active: boolean
}

export const styles = {
  menu_items: [
    tw`
      absolute right-0 mt-3 w-44 origin-top-right divide-y divide-gray-200 overflow-hidden
      rounded-b-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none
    `
  ],
  user_wrapper: [
    tw`
      flex items-center space-x-3 px-4 py-2
      [> div]:(flex flex-col)
      [> div > h1]:(text-sm font-medium text-gray-900 line-clamp-1)
      [> div > p]:(text-xs font-normal text-gray-600)
    `
  ],
  menu_item: ({ active }: MenuItemProps) => [
    tw`
      flex w-full items-center px-3 py-2 text-sm font-medium
      overflow-hidden transition duration-150 ease-in-out
      [> svg]:(mr-2 h-4 w-4)
    `,
    active ? tw`bg-blue-600 text-white` : tw`text-gray-600`
  ]
}
