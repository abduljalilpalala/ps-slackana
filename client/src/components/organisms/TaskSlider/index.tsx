import moment from 'moment'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import ReactDatePicker from 'react-datepicker'
import React, { FC, forwardRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Check, MoreHorizontal, LogIn, Trash, Calendar, Search, X } from 'react-feather'

import { classNames } from '~/helpers/classNames'
import Tooltip from '~/components/templates/Tooltip'
import { assignees } from '~/shared/jsons/assigneeData'
import DialogBox from '~/components/templates/DialogBox'
import MenuTransition from '~/components/templates/MenuTransition'
import handleImageError from '~/helpers/handleImageError'

type Props = {}

const TaskSlider: FC<Props> = (): JSX.Element => {
  const router = useRouter()
  const { task_id } = router.query
  const [assignee, setAssignee] = useState({})
  const [updateAssignee, setUpdateAssignee] = useState({})
  const [updateTaskDueDate, setUpdateTaskDueDate]: any = useState('')
  const [updateAssigneeModal, setUpdateAssigneeModal] = useState<boolean>(false)

  const [isTaskCompleted, setIsTaskCompleted] = useState(false)

  const handleTaskStatusToggle = () => setIsTaskCompleted(!isTaskCompleted)

  const handleUpdateAssigneeToggle = () => setUpdateAssigneeModal(!updateAssigneeModal)

  const handleSetAssignee = (id: number) => {
    const getMember: any = assignees.find((member) => member.id === id)
    setUpdateAssignee(getMember)
    handleUpdateAssigneeToggle()
  }

  const CustomCalendarButton = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onClick}
        ref={ref}
        className="flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-blue-600 p-1 text-blue-600 active:scale-95"
      >
        <Calendar className="h-4 w-4 rounded-full" />
      </button>
      {value && (
        <span className="text-sm font-medium text-slate-600">
          {moment(new Date(value)).format('MMM D')}
        </span>
      )}
    </div>
  ))

  const addAssigneeComponent = (
    <DialogBox
      isOpen={true}
      closeModal={handleUpdateAssigneeToggle}
      headerTitle="Add Assignee"
      bodyClass="!px-0 !pb-0 mobile:!px-0 !pt-0"
    >
      <div className="flex flex-col">
        <div className="mt-3 flex items-center justify-between border-b px-6 pb-3">
          <div className="flex w-full flex-row items-center rounded-md border border-slate-300 pl-2">
            <Search color="#94A3B8" />
            <input
              type="text"
              className="mr-5 w-full border-none text-slate-900 focus:ring-transparent"
              placeholder="Find members"
            />
          </div>
        </div>
        <div className="mb-3 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
          {assignees.map((assignee) => (
            <MemberList key={assignee.id} actions={{ handleSetAssignee }} {...assignee} />
          ))}
        </div>
      </div>
    </DialogBox>
  )

  return (
    <>
      {task_id && (
        <section
          className="absolute inset-0 z-10 bg-slate-900/10"
          onClick={() => router.push(`/team/${router.query.id}/board`)}
        ></section>
      )}
      <section
        className={`
          default-scrollbar fixed right-0 z-20 -mt-3 h-full w-full  max-w-[520px] flex-1 
          flex-shrink-0  border-l border-slate-300 bg-white
          text-slate-900 transition-all duration-300 ease-in-out
          ${task_id ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <header className="sticky top-0 flex items-center justify-between border-b border-slate-300 bg-white py-3 px-5">
          <div>
            <button
              className={`
              flex items-center rounded-md border border-slate-300 px-1.5 py-1 text-xs font-medium text-slate-600
              outline-none transition duration-75 ease-in-out focus:border-green-500 focus:bg-green-50
            focus:text-green-600 hover:border-green-500 hover:bg-green-50 hover:text-green-600 active:scale-95
            ${isTaskCompleted && 'border-green-500 bg-green-50 text-green-600'}
          `}
              onClick={handleTaskStatusToggle}
            >
              <Check className="mr-1 h-4 w-4" />
              {isTaskCompleted ? 'Completed' : 'Mark complete'}
            </button>
          </div>
          <div className="flex flex-shrink-0 items-center space-x-2">
            <Menu as="div" className="relative z-20 inline-block items-center text-left">
              {({ open }) => (
                <>
                  <Menu.Button
                    className={`
                      rounded-md p-1.5 text-slate-500 outline-none transition duration-75 ease-in-out focus:bg-slate-200 
                    focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900 active:scale-95
                        ${open ? 'bg-slate-200 text-slate-900' : ''}
                      `}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Menu.Button>
                  <MenuTransition>
                    <Menu.Items
                      className={classNames(
                        'absolute right-0 mt-1 w-44 origin-top-right divide-y divide-gray-200 overflow-hidden',
                        'rounded-md border border-slate-200 bg-white py-1 shadow-md focus:outline-none'
                      )}
                    >
                      <Menu.Item>
                        <button
                          className={classNames(
                            'flex w-full items-center space-x-3 py-2 px-4 font-medium text-rose-600',
                            'text-sm transition duration-150 ease-in-out hover:bg-rose-100 active:bg-rose-600 active:text-white'
                          )}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Remove Task
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </MenuTransition>
                </>
              )}
            </Menu>
            <button
              onClick={() => router.push(`/team/${router.query.id}/board`)}
              className="rounded-md p-1.5 text-slate-500 outline-none transition duration-75 ease-in-out focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
            </button>
          </div>
        </header>
        <div className="flex items-center justify-between bg-rose-50 py-2.5 px-4 text-sm text-rose-600">
          <p className="flex items-center">
            <Trash className="mr-2 h-4 w-4" />
            This task is deleted.
          </p>
          <button className="mr-2 active:scale-95">
            <X className="h-4 w-4" />
          </button>
        </div>
        <main className="flex h-full flex-col space-y-3 px-5 py-6">
          <div className="-mx-3">
            <ReactTextareaAutosize
              defaultValue="[113] - [Markup] Create Task Modal"
              className={`
                w-full resize-none overflow-hidden rounded-lg border border-transparent text-xl font-semibold
                outline-none ring-blue-600 transition duration-75 ease-in-out focus:ring-2 hover:border-slate-400
              `}
            />
          </div>
          <div className="flex flex-col space-y-6">
            {/**
             * Assignee Field
             * */}
            <section className="flex items-center">
              <div className="w-full max-w-[130px]">
                <h1 className="text-sm font-medium">Assignee</h1>
              </div>
              <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-3">
                <Tooltip text="Assignee">
                  <button
                    onClick={handleUpdateAssigneeToggle}
                    className="flex flex-shrink-0 cursor-pointer items-center overflow-hidden active:scale-95"
                  >
                    <img
                      className="h-8 w-8 rounded-lg"
                      src="https://ca.slack-edge.com/E028JVBUY4F-U03N1UNTGAY-5ef1b06f109b-512"
                    />
                  </button>
                </Tooltip>
                {updateAssigneeModal && addAssigneeComponent}
                <div className="flex flex-col text-sm">
                  <div className="flex items-center space-x-3">
                    <h1 className="font-medium">Joshua Galit</h1>
                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    <p className="text-slate-500">Developer</p>
                  </div>
                  <h2 className="leading-tight text-slate-500">Backend</h2>
                </div>
              </div>
            </section>
            {/**
             * Due Date Field
             * */}
            <section className="flex items-center">
              <div className="w-full max-w-[130px]">
                <h1 className="text-sm font-medium">Due Date</h1>
              </div>
              <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
                <Tooltip text="Due Date">
                  <ReactDatePicker
                    selected={updateTaskDueDate}
                    onChange={(date: Date) => setUpdateTaskDueDate(date)}
                    customInput={<CustomCalendarButton />}
                  />
                </Tooltip>
                <button className="outline-none active:scale-95">
                  <Trash className="h-4 w-4 text-slate-900" />
                </button>
              </div>
            </section>
            {/**
             * Estimated Time Field
             * */}
            <section className="flex items-center">
              <div className="w-full max-w-[130px]">
                <h1 className="text-sm font-medium">Estimated Time</h1>
              </div>
              <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
                <input
                  type="number"
                  className={`
                  w-32 rounded border border-slate-300 py-1 px-2 outline-none transition duration-75
                  ease-in-out focus:border-blue-600 hover:border-slate-400
                `}
                />
              </div>
            </section>
            {/**
             * Actual Time Field
             * */}
            <section className="flex items-center">
              <div className="w-full max-w-[130px]">
                <h1 className="text-sm font-medium">Actual Time</h1>
              </div>
              <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
                <input
                  type="number"
                  className={`
                  w-32 rounded border border-slate-300 py-1 px-2 outline-none transition duration-75
                  ease-in-out focus:border-blue-600 hover:border-slate-400
                `}
                />
              </div>
            </section>
            {/**
             * Details Field
             * */}
            <section className="pt-8">
              <h1 className="text-sm font-medium">Details</h1>
              <ReactTextareaAutosize
                className={`
                mt-3 min-h-[110px] w-full resize-none overflow-hidden rounded-lg border border-slate-300
                transition duration-75 ease-in-out placeholder:text-slate-400 hover:border-slate-400
              `}
                placeholder="Descriptions"
              />
              {/* <div className="flex justify-end space-x-2 py-1">
                <button className="rounded-lg bg-blue-600 py-1.5 px-14 text-sm text-white outline-none transition duration-75 ease-in-out hover:bg-blue-700 hover:shadow active:scale-95">
                  Edit
                </button>
                <button className="rounded-lg bg-slate-300 py-1.5 px-14 text-sm text-slate-600 outline-none active:scale-95">
                  Done
                </button>
              </div> */}
            </section>
          </div>
        </main>
      </section>
    </>
  )
}

const MemberList = ({ id, name, avatar_url, actions: { handleSetAssignee } }: any) => {
  return (
    <button
      onClick={() => handleSetAssignee(id)}
      className="block w-full transform px-4 py-2 transition duration-75 ease-in-out hover:bg-slate-200 active:scale-95"
    >
      <div className="flex min-w-[150px] flex-row items-center justify-start gap-3 truncate text-ellipsis mobile:w-[75%]">
        <div className="flex items-center justify-center mobile:min-w-[36px]">
          <img
            src={avatar_url}
            onError={(e) => handleImageError(e, '/images/team/qa.png')}
            className="h-8 w-8 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center gap-3">
            <p className="text-[16px] font-medium tracking-tighter text-slate-900">{name}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default TaskSlider
