import ReactMde from 'react-mde'
import { Controller, useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useState } from 'react'

import { converter } from '~/utils/mdeOptions'
import SendIcon from '~/shared/icons/SendIcon'
import { ThreadMessage } from '~/shared/interfaces'
import { Spinner } from '~/shared/icons/SpinnerIcon'

type Props = {
  isOpen: boolean
  threadMessage: ThreadMessage
  closeModal: () => void
  actions: {
    handleUpdateThread: (data: ThreadMessage) => Promise<void>
  }
}

const EditMessageDialog: FC<Props> = (props): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write')
  const {
    isOpen,
    closeModal,
    threadMessage,
    actions: { handleUpdateThread }
  } = props

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid }
  } = useForm<ThreadMessage>({
    defaultValues: {
      thread_id: threadMessage.id,
      message: threadMessage.message
    }
  })

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
              <Dialog.Panel>
                <form
                  onSubmit={handleSubmit(handleUpdateThread)}
                  className="relative rounded-xl bg-white"
                >
                  <input
                    {...register('thread_id')}
                    hidden
                    type="text"
                    defaultValue={threadMessage.thread_id}
                  />
                  <Controller
                    name="message"
                    control={control}
                    defaultValue={threadMessage.message}
                    rules={{ required: 'You must a message to reply.' }}
                    render={({ field }) => (
                      <ReactMde
                        {...field}
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                          Promise.resolve(converter.makeHtml(markdown))
                        }
                        childProps={{
                          writeButton: {
                            tabIndex: -1
                          }
                        }}
                      />
                    )}
                  />
                  <button
                    type="submit"
                    className="absolute top-0.5 right-1 rounded-r-lg bg-white py-3 px-3 outline-none"
                  >
                    {!isSubmitting ? (
                      <SendIcon
                        className={`
                      h-5 w-5 fill-current text-slate-400
                      ${isDirty || isValid || isSubmitting ? 'text-blue-500' : ''}
                    `}
                      />
                    ) : (
                      <Spinner className="h-5 w-5 fill-current text-slate-400" />
                    )}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default EditMessageDialog
