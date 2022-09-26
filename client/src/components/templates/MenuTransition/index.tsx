import { Transition } from '@headlessui/react'
import React, { FC, ReactNode, Fragment } from 'react'

type Props = {
  children: ReactNode
}

const MenuTransition: FC<Props> = (props): JSX.Element => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {props.children}
    </Transition>
  )
}

export default MenuTransition
