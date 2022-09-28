import tw from 'twin.macro'

const slate_50 = '#f8fafc';
const slate_100 = '#F1F5F9';
const slate_200 = '#e2e8f0';
const slate_300 = '#cbd5e1';
const slate_400 = '#94a3b8';
const slate_500 = '#64748b';
const slate_600 = '#475569';
const slate_700 = '#334155';
const slate_800 = '#1e293b';
const slate_900 = '#0f172a';

export const styles = {
  upload: [tw`w-px-170 h-px-36 tracking-tight bg-blue-600 text-[${slate_50}] rounded-md hover:bg-blue-800 ease-in-out duration-150`],
  remove: [tw`w-px-170 border h-px-36 tracking-tight border-blue-600 text-[${slate_900}] rounded-md hover:bg-[${slate_500}] hover:text-[${slate_50}] ease-in-out duration-150`],
  uploadContainer: [tw`flex flex-row justify-between items-center`],
  active: [tw`border-b border-[${slate_900}] text-[${slate_900}]`],
  inactive: [tw`text-[${slate_400}] outline-none`],
  notification: [tw`flex flex-row justify-between items-start border-b border-[${slate_300}] pb-5`],
  p: [tw`text-[${slate_900}] text-[15px] text-left mb-5`],
  disabled: [tw`flex flex-row justify-between items-start pt-3 opacity-50`],
  value: [tw`text-[${slate_900}] text-[15px] text-left`],
}
