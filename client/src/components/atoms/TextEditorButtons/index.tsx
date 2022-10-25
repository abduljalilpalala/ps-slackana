import { FC } from 'react'
import { Bold, Italic, Link, List, Code } from 'react-feather'

import ListNumberIcon from '~/shared/icons/ListNumberIcon'
import BlockquoteIcon from '~/shared/icons/BlockquoteIcon'
import StrikeThroughIcon from '~/shared/icons/StrikeThroughIcon'

type Props = {
  isSubmitting: boolean
}

const TextEditorButtons: FC<Props> = ({ isSubmitting }): JSX.Element => {
  return (
    <header className="flex flex-1 items-center space-x-2 bg-slate-50 px-3 py-1 group-focus-within:bg-slate-100">
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
        
      `}
      >
        <Bold className="p-1" />
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
       
      `}
      >
        <Italic className="p-1" />
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed
        group-focus-within:text-slate-500
        hover:bg-slate-200  
      `}
      >
        <StrikeThroughIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
      </button>
      <span className="h-4 w-[1px] bg-slate-300"></span>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
        
      `}
      >
        <Link className="p-1" />
      </button>
      <span className="h-4 w-[1px] bg-slate-300"></span>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
        
      `}
      >
        <ListNumberIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
      </button>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
        
      `}
      >
        <List className="stroke-1.5 p-0.5" />
      </button>
      <span className="h-4 w-[1px] bg-slate-300"></span>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-not-allowed 
        group-focus-within:text-slate-500 hover:bg-slate-200
        
      `}
      >
        <BlockquoteIcon className="h-6 w-6 fill-current p-1 text-slate-400 group-focus-within:text-slate-500" />
      </button>
      <span className="h-4 w-[1px] bg-slate-300"></span>
      <button
        type="button"
        disabled={isSubmitting}
        className={`
        rounded outline-none focus:bg-slate-200 disabled:cursor-pointer 
        group-focus-within:text-slate-500 hover:bg-slate-200  
      `}
      >
        <Code className="p-1" />
      </button>
    </header>
  )
}

export default TextEditorButtons
