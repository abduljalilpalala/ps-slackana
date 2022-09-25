import tw from 'twin.macro'

export const globals = {
  form_label: [
    tw`
      mb-1 block text-xs font-normal text-[#64748b]
      [> span]:(text-red-500)
    `
  ],
  form_control: [
    tw`block w-full rounded border-none px-3 py-2`,
    tw`text-sm placeholder:text-[#94a3b8] text-[#0f172a]`,
    tw`ring-1 ring-[#cbd5e1] transition duration-150 ease-in-out hover:ring-2`,
    tw`hover:ring-blue-600 focus:ring-2 focus:ring-blue-600 disabled:opacity-50`
  ]
}
