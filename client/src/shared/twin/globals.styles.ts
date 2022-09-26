import tw from 'twin.macro'

export const slate_900 = '#0f172a'
export const slate_800 = '#1e293b'
export const slate_700 = '#334155'
export const slate_600 = '#475569'
export const slate_500 = '#64748b'
export const slate_400 = '#94a3b8'
export const slate_300 = '#cbd5e1'
export const slate_200 = '#e2e8f0'
export const slate_100 = '#f1f5f9'
export const slate_50 = '#f8fafc'

export const globals = {
  form_label: [
    tw`
      mb-1 block text-xs font-normal text-[#64748b]
      [> span]:(text-red-500)
    `
  ],
  form_control: [
    tw`block w-full rounded border-none px-3 py-2`,
    tw`text-sm placeholder:text-[${slate_400}] text-[${slate_900}]`,
    tw`ring-1 ring-[${slate_300}] transition duration-150 ease-in-out hover:ring-2`,
    tw`hover:ring-blue-600 focus:ring-2 focus:ring-blue-600 disabled:opacity-50`,
    tw`disabled:hover:ring-2`
  ],
  avatar: [
    tw`
      flex w-6 items-center justify-center rounded-full
      bg-transparent ring-[3px] ring-green-500 flex-shrink-0
      [> img]:(h-6 rounded-full bg-cover)
    `
  ]
}
