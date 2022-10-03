import React, { Fragment, FC, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CloseIcon } from '~/shared/icons/CloseIcon';

type Props = {
  hasHeader?: boolean;
  headerTitle?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  hasMenu?: boolean;
  menu?: any;
  bodyClass?: string;
}

const DialogBox: FC<Props> = ({
  hasHeader = true,
  headerTitle = "Header title",
  isOpen,
  closeModal,
  children,
  className = "",
  headerClassName = "",
  hasMenu = false,
  menu,
  bodyClass = ""
}: Props): JSX.Element => {

  const header = (
    <>
      <div className={`flex items-center justify-between px-6 py-3 ${hasMenu || 'border-b border-slate-300'} ${headerClassName}`}>
        <h1 className='font-medium text-xl'>{headerTitle}</h1>
        <div onClick={closeModal}><CloseIcon className='cursor-pointer' /></div>
      </div>
      {
        hasMenu &&
        <div className='flex flex-row gap-4 justify-start items-center px-6 border-b border-slate-300'>
          {menu}
        </div>
      }
    </>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900 bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-px-500 mobile:max-w-[90%] transform rounded-lg bg-white shadow-xl transition-all ${className}`}>
                {hasHeader && header}

                <div className={`mobile:px-10 flex flex-col pt-10 ${bodyClass ? bodyClass : "px-20 pb-20 gap-10"}`}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DialogBox;
