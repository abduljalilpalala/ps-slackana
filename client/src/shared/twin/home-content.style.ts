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
export const scrollbar = 'scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-gray-100 border-x'

export const styles = {
  home: [tw`flex items-center justify-center flex-col gap-16`],
  headerContent: [tw`flex flex-col gap-5 items-center justify-center`],
  body: [tw`px-6 py-3 rounded-t-lg border border-[${slate_300}]`],
  bodyHeader: [tw`flex flex-row justify-between content-between`],
  addProjectDiv: [tw`flex flex-row items-center justify-center gap-3`],
  addProjectButton: [tw`hover:bg-[${slate_100}] cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg border-dotted border border-[${slate_400}]`],
  dropDown: [tw`hover:bg-[${slate_100}] cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg border border-[${slate_500}]`],
  container: [tw`z-10 border-b rounded-b-lg border-[${slate_300}] mobile:grid-cols-1 tablet:grid-cols-2 px-7 py-10 grid grid-cols-3 gap-6 h-px-400 overflow-y-scroll`],
  more: [tw`text-[${slate_600}] hover:text-[${slate_400}] ease-in-out duration-300 font-medium cursor-pointer flex justify-start items-center`],
  tags: [tw`flex flex-col justify-start items-start`],
  dropDownMenu: [tw`absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`]
}