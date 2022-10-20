import moment from 'moment'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import ReactDatePicker from 'react-datepicker'
import React, { FC, forwardRef, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { Check, MoreHorizontal, LogIn, Trash, Calendar, Search, X, User } from 'react-feather'

import { classNames } from '~/helpers/classNames'
import Tooltip from '~/components/templates/Tooltip'
import DialogBox from '~/components/templates/DialogBox'
import MenuTransition from '~/components/templates/MenuTransition'
import handleImageError from '~/helpers/handleImageError'
import { useTaskMethods } from '~/hooks/taskMethods'
import { useMemberMethods } from '~/hooks/memberMethods'
import PeopleList from '~/components/molecules/PeopeList'
import BoxSkeleton from '~/components/atoms/Skeletons/BoxSkeleton'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import ImageSkeleton from '~/components/atoms/Skeletons/ImageSkeleton'
import { useProjectMethods } from '~/hooks/projectMethods'

type Props = {
  updateAssignee: any
  updateTaskDueDate: any
  isTaskCompleted: any
  actions: {
    setTaskID: (e: any) => void
    setUpdateAssignee: (e: any) => void
    setUpdateTaskDueDate: (e: any) => void
    setIsTaskCompleted: (e: any) => void
  }
}

const TaskSlider: FC<Props> = (props): JSX.Element => {
  const { updateAssignee, updateTaskDueDate, isTaskCompleted } = props
  const { setTaskID, setUpdateAssignee, setUpdateTaskDueDate, setIsTaskCompleted } = props.actions
  const router = useRouter()
  const { id, task_id } = router.query
  const [updateTaskName, setUpdateTaskName]: any = useState('')
  const [updateDescription, setUpdateDescription]: any = useState('')
  const [updateActualTime, setUpdateActualTime]: any = useState(0)
  const [updateEstimatedTime, setUpdateEstimatedTime]: any = useState(0)
  const [deleteTask, setDeleteTask]: any = useState(false)
  const [updateAssigneeModal, setUpdateAssigneeModal] = useState<boolean>(false)
  const { members, isMemberLoading, filterMembersName } = useMemberMethods(parseInt(id as string))
  const {
    useHandleUpdateTaskDueDate,
    useHandleUpdateTaskAssignee,
    useHandleCompleteTaskSlider,
    useHandleRefetchTasks,
    useHandleUpdateTaskName,
    useHandleUpdateTaskDetails,
    useHandleRemoveTask,
    useHandleGetTask,
    useHandleGetTaskWithoutLoading,
    taskData,
    isTaskLoading
  } = useTaskMethods(parseInt(id as string))
  const { permissions, canComplete, getMemberFromProject } = useProjectMethods(
    parseInt(id as string)
  )

  useEffect(() => {
    if (task_id) {
      useHandleGetTask(parseInt(task_id as string))
      setTaskID(task_id)
    }
  }, [task_id])

  useEffect(() => {
    setUpdateAssignee(taskData?.assignee)
    setUpdateTaskName(taskData?.name)
    setUpdateTaskDueDate(taskData?.due_date ? new Date(taskData?.due_date) : null)
    setIsTaskCompleted(taskData?.is_completed)
    setUpdateDescription(taskData?.description ?? '')
    setUpdateEstimatedTime(taskData?.estimated_time ?? 0)
    setUpdateActualTime(taskData?.actual_time_finished ?? 0)
    return () => {
      setDeleteTask(false)
    }
  }, [taskData])

  const handleTaskStatusToggle = async () => {
    setIsTaskCompleted(!isTaskCompleted)
    useHandleCompleteTaskSlider(parseInt(task_id as string))
  }

  const handleUpdateAssigneeToggle = () => {
    setUpdateAssigneeModal(!updateAssigneeModal)
    filterMembersName(parseInt(id as string), '')
  }

  const handleClearDueDate = () => {
    setUpdateTaskDueDate(null)
    useHandleUpdateTaskDueDate(parseInt(task_id as string), null)
  }

  const handleSetDueDate = (date: Date) => {
    let value = date ? moment(new Date(date)).format('YYYY-MM-DD') : null
    setUpdateTaskDueDate(date)
    useHandleUpdateTaskDueDate(parseInt(task_id as string), value)
  }

  const handleSetAssignee = (id: number) => {
    const getMember: any = members.find((member: any) => member.id === id)
    setUpdateAssignee(getMember)
    useHandleUpdateTaskAssignee(parseInt(task_id as string), getMember.id)
    handleUpdateAssigneeToggle()
  }
  const onSearchChange = (e: any): void => {
    const value = e.target.value
    if (value.length === 0) {
      filterMembersName(parseInt(id as string), value)
    }
  }
  const onSearch = (e: any): void => {
    const value = e.target.value
    const isEnter = e.key === 'Enter' || e.keyCode === 13

    if (!isEnter) return
    filterMembersName(parseInt(id as string), value)
  }
  const handleSetName = (e: any) => {
    const keyCode = e.which || e.keyCode
    if (keyCode === 13 && !e.shiftKey) e.preventDefault()
  }
  const handleTaskNameOnBlur = async (e: any) => {
    if (e.target.value === taskData?.name) return
    if (e.target.value === '') setUpdateTaskName((e.target.value = 'Untitled Task'))
    await useHandleUpdateTaskName(
      taskData?.section_id as number,
      taskData?.id as number,
      e.target.value
    )
  }
  const handleEstimatedTimeOnBlur = async (e: any) => {
    if (parseInt(e.target.value) === (taskData?.estimated_time ?? 0)) return
    await useHandleUpdateTaskDetails(parseInt(task_id as string), {
      estimated_time: e.target.value,
      actual_time_finished: taskData?.actual_time_finished,
      description: taskData?.description
    })
  }
  const handleActualTimeOnBlur = async (e: any) => {
    if (parseInt(e.target.value) === (taskData?.actual_time_finished ?? 0)) return
    await useHandleUpdateTaskDetails(parseInt(task_id as string), {
      estimated_time: taskData?.estimated_time,
      actual_time_finished: e.target.value,
      description: taskData?.description
    })
  }
  const handleDescriptionOnBlur = async (e: any) => {
    if (e.target.value === (taskData?.description ?? '')) return
    await useHandleUpdateTaskDetails(parseInt(task_id as string), {
      estimated_time: taskData?.estimated_time,
      actual_time_finished: taskData?.actual_time_finished,
      description: e.target.value
    })
  }
  const handleRemoveTask = async (): Promise<void> => {
    setDeleteTask(true)
    useHandleRemoveTask(taskData?.section_id as number, taskData?.id as number)
  }
  const dueDateColor = (value: any, defaultValue: string = '') => {
    if (!value) return defaultValue
    return new Date(moment(new Date(value)).format('YYYY-MM-DD')) >=
      new Date(moment().format('YYYY-MM-DD'))
      ? 'green'
      : 'red'
  }
  const CustomCalendarButton = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onClick}
        ref={ref}
        className={`flex-shrink-0 cursor-pointer overflow-hidden rounded-full border 
        border-${dueDateColor(value, 'blue')}-600 p-1 
        text-${dueDateColor(value, 'blue')}-600 active:scale-95`}
      >
        <Calendar className={`h-4 w-4 rounded-full`} />
      </button>
      {value && (
        <span className={`text-sm font-medium text-${dueDateColor(value)}-600`}>
          {moment().format('MMM D') === moment(new Date(value)).format('MMM D')
            ? 'Today'
            : moment(new Date(value)).format('MMM D')}
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
              onChange={onSearchChange}
              onKeyDown={onSearch}
              className="mr-5 w-full border-none text-slate-900 focus:ring-transparent"
              placeholder="Find members"
            />
          </div>
        </div>
        <div className="mb-3 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md">
          {isMemberLoading ? (
            <PeopleList isLoading={isMemberLoading} />
          ) : members?.length === 0 ? (
            <h1 className="text-px-18 mt-5 text-slate-600 opacity-60">No available data</h1>
          ) : (
            members?.map((member: any) => (
              <MemberList key={member?.id} actions={{ handleSetAssignee }} {...member} />
            ))
          )}
        </div>
      </div>
    </DialogBox>
  )
  const loadingTask = (
    <section
      className={`
          fixed right-0 z-20 -mt-3 h-full w-full  max-w-[520px] flex-1 
          flex-shrink-0  border-l border-slate-300 bg-white
          text-slate-900 transition-all duration-300 ease-in-out
          ${task_id ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <header className="sticky top-0 flex items-center justify-between border-b border-slate-300 bg-white py-3 px-5">
        <BoxSkeleton className="flex h-4 w-[100px] items-center" />
      </header>
      <main className="flex h-full flex-col space-y-3 px-5 py-6">
        <div className="">
          <LineSkeleton className="h-[30px] w-full" />
        </div>
        <div className="flex flex-col space-y-6">
          <section className="flex items-center">
            <div className="w-full max-w-[130px]">
              <LineSkeleton className="h-[10px] w-[100px]" />
            </div>
            <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-3">
              <Tooltip text="Assignee">
                <ImageSkeleton className="max-h-[36px] max-w-[36px] rounded-md" />
              </Tooltip>
              <div className="flex flex-col text-sm">
                <div className="flex items-center space-x-3">
                  <LineSkeleton className="h-[10px] w-[100px]" />
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <LineSkeleton className="h-[10px] w-[100px]" />
                </div>
                <h2 className="leading-tight text-slate-500">
                  <LineSkeleton className="h-[5px] w-[70px]" />
                </h2>
              </div>
            </div>
          </section>
          <section className="flex items-center">
            <div className="w-full max-w-[130px]">
              <LineSkeleton className="h-[10px] w-[100px]" />
            </div>
            <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
              <Tooltip text="Due Date">
                <LineSkeleton className="h-[10px] w-[50px]" />
              </Tooltip>
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              <LineSkeleton className="h-[10px] w-[50px]" />
            </div>
          </section>
          <section className="flex items-center">
            <div className="w-full max-w-[130px]">
              <LineSkeleton className="h-[10px] w-[100px]" />
            </div>
            <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
              <LineSkeleton className="h-[10px] w-[200px]" />
            </div>
          </section>
          <section className="flex items-center">
            <div className="w-full max-w-[130px]">
              <LineSkeleton className="h-[10px] w-[100px]" />
            </div>
            <div className="flex w-full flex-1 flex-shrink-0 items-center space-x-4">
              <LineSkeleton className="h-[10px] w-[200px]" />
            </div>
          </section>
          <section className="pt-8">
            <LineSkeleton className="h-[10px] w-[100px]" />
            <LineSkeleton className=" mt-10 h-[10px] w-96" />
            <LineSkeleton className="h-[10px] w-80" />
            <LineSkeleton className="h-[10px] w-64" />
            <LineSkeleton className=" h-[10px] w-56" />
          </section>
        </div>
      </main>
    </section>
  )
  let completeTask = !permissions?.setTaskAsCompleted || !canComplete(updateAssignee?.id as number)
  return (
    <>
      {task_id && (
        <section
          className="absolute inset-0 z-10 bg-slate-900/10"
          onClick={() => router.push(`/team/${router.query.id}/board`)}
        ></section>
      )}
      {isTaskLoading ? (
        loadingTask
      ) : (
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
                disabled={deleteTask || completeTask}
                className={`
                ${completeTask && 'cursor-not-allowed '}
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
              {permissions?.deleteTask && (
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
                              onClick={handleRemoveTask}
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
              )}
              <button
                onClick={() => router.push(`/team/${router.query.id}/board`)}
                className="rounded-md p-1.5 text-slate-500 outline-none transition duration-75 ease-in-out focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900 active:scale-95"
              >
                <LogIn className="h-4 w-4" />
              </button>
            </div>
          </header>
          {deleteTask && (
            <div className="flex items-center justify-between bg-rose-50 py-2.5 px-4 text-sm text-rose-600">
              <p className="flex items-center">
                <Trash className="mr-2 h-4 w-4" />
                This task is deleted.
              </p>
            </div>
          )}
          <main className="flex h-full flex-col space-y-3 px-5 py-6">
            <div className="-mx-3">
              <ReactTextareaAutosize
                value={updateTaskName}
                disabled={deleteTask || !permissions?.renameTask}
                onKeyDown={handleSetName}
                onBlur={handleTaskNameOnBlur}
                onChange={(e) => setUpdateTaskName(e.target.value)}
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
                    {updateAssignee?.user ? (
                      <button
                        disabled={deleteTask || !permissions?.assignTask}
                        onClick={handleUpdateAssigneeToggle}
                        className="flex flex-shrink-0 cursor-pointer items-center overflow-hidden active:scale-95"
                      >
                        <img
                          className="h-8 w-8 rounded-lg"
                          src={updateAssignee?.user?.avatar?.url}
                          onError={(e) => handleImageError(e, '/images/avatar.png')}
                        />
                      </button>
                    ) : (
                      <button
                        disabled={deleteTask || !permissions?.assignTask}
                        className={`
                      hover:border-slate rounded-full border-[1.5px] border-dashed border-slate-400 p-0.5
                    text-slate-400 transition duration-75 ease-in-out focus:border-slate-500
                    focus:text-slate-500 focus:outline-none hover:border-slate-500 hover:bg-white hover:text-slate-500
                    `}
                        onClick={handleUpdateAssigneeToggle}
                      >
                        <User className="h-4 w-4" />
                      </button>
                    )}
                  </Tooltip>
                  {updateAssigneeModal && addAssigneeComponent}
                  {updateAssignee?.user && (
                    <div className="flex flex-col text-sm">
                      <div className="flex items-center space-x-3">
                        <Tooltip text={updateAssignee?.user?.name}>
                          <h1 className="max-w-[120px] font-medium line-clamp-1">
                            {updateAssignee?.user?.name}
                          </h1>
                        </Tooltip>
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></span>
                        <p className="text-slate-500 line-clamp-1">{updateAssignee?.role?.name}</p>
                      </div>
                      <h2 className="leading-tight text-slate-500">
                        {updateAssignee?.teams
                          ?.map((team: any) => {
                            return team?.name
                          })
                          .join(' | ')}
                      </h2>
                    </div>
                  )}
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
                  <Tooltip
                    text={
                      !updateTaskDueDate
                        ? `Due Date`
                        : moment(updateTaskDueDate).format('MMMM D, YYYY')
                    }
                  >
                    <ReactDatePicker
                      disabled={deleteTask || !permissions?.assignDueDates}
                      selected={updateTaskDueDate}
                      onChange={handleSetDueDate}
                      calendarClassName="!shadow-lg"
                      customInput={<CustomCalendarButton />}
                    />
                  </Tooltip>
                  {updateTaskDueDate && (
                    <button
                      disabled={deleteTask || !permissions?.assignDueDates}
                      onClick={handleClearDueDate}
                      className="outline-none active:scale-95"
                    >
                      <Trash className="h-4 w-4 text-slate-900" />
                    </button>
                  )}
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
                    disabled={deleteTask || !permissions?.renameTask}
                    value={updateEstimatedTime}
                    onBlur={handleEstimatedTimeOnBlur}
                    onChange={(e) => setUpdateEstimatedTime(e.target.value)}
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
                    disabled={deleteTask || !permissions?.renameTask}
                    value={updateActualTime}
                    onBlur={handleActualTimeOnBlur}
                    onChange={(e) => setUpdateActualTime(e.target.value)}
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
                  value={updateDescription}
                  disabled={deleteTask || !permissions?.renameTask}
                  onBlur={handleDescriptionOnBlur}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  className={`
                mt-3 min-h-[110px] w-full resize-none overflow-hidden rounded-lg border border-slate-300
                transition duration-75 ease-in-out placeholder:text-slate-400 hover:border-slate-400
              `}
                  placeholder="Descriptions"
                />
              </section>
            </div>
          </main>
        </section>
      )}
    </>
  )
}

const MemberList = ({ id, user, actions: { handleSetAssignee } }: any) => {
  return (
    <button
      onClick={() => handleSetAssignee(id)}
      className="block w-full transform px-4 py-2 transition duration-75 ease-in-out hover:bg-slate-200 active:scale-95"
    >
      <div className="flex min-w-[150px] flex-row items-center justify-start gap-3 truncate text-ellipsis mobile:w-[75%]">
        <div className="flex items-center justify-center mobile:min-w-[36px]">
          <img
            src={user?.avatar.url}
            onError={(e) => handleImageError(e, '/images/team/qa.png')}
            className="h-8 w-8 rounded-md"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="flex flex-row items-center gap-3">
            <p className="text-[16px] font-medium tracking-tighter text-slate-900">{user?.name}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default TaskSlider
