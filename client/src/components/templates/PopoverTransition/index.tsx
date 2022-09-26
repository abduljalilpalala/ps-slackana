import React from 'react'
import { Transition } from '@headlessui/react'
import { Fragment, FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const PopoverTransition: FC<Props> = (props): JSX.Element => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      {props.children}
    </Transition>
  )
}

export default PopoverTransition
