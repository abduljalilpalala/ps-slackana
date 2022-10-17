import moment from 'moment'
import { forwardRef } from 'react'
import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router'
import ReactDatePicker from 'react-datepicker'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import { Calendar, Search, User, MoreHorizontal, Edit3, Trash, Eye } from 'react-feather'

import { classNames } from '~/helpers/classNames'
import Tooltip from '~/components/templates/Tooltip'
import { assignees } from '~/shared/jsons/assigneeData'
import DialogBox from '~/components/templates/DialogBox'
import MenuTransition from '~/components/templates/MenuTransition'

type Props = {
  task: any
  updateAssignee: any
  updateAssigneeModal: boolean
  updateTaskDueDate: any
  setUpdateTaskDueDate: any
  setUpdateAssignee: any
  actions: {
    handleUpdateAssigneeToggle: () => void
  }
}

const TaskList: React.FC<Props> = (props): JSX.Element => {
  const {
    task,
    updateAssignee,
    updateAssigneeModal,
    updateTaskDueDate,
    setUpdateTaskDueDate,
    setUpdateAssignee,
    actions: { handleUpdateAssigneeToggle }
  } = props

  const router = useRouter()

  const { task_id } = router.query

  const handleSetAssignee = (id: number) => {
    const getMember = assignees.find((member) => member.id === id)
    setUpdateAssignee(getMember)
    handleUpdateAssigneeToggle()
  }

  const CustomCalendarButton = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      onClick={onClick}
      ref={ref}
      className={`
          hover:border-slate hover:text-slate-500, flex items-center rounded-full
           border-slate-400 p-0.5 text-slate-400 transition
          duration-75 ease-in-out focus:border-slate-500 focus:text-slate-500 focus:outline-none hover:border-slate-500 hover:bg-white
          ${!value ? 'border-[1.5px] border-dashed' : 'hover:bg-slate-100 '}
        `}
    >
      {value ? (
        <p className="text-xs">{moment(new Date(value)).format('MMM D')}</p>
      ) : (
        <Calendar className="h-4 w-4" />
      )}
    </button>
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
    <div
      className={`
        group-task relative flex w-full cursor-pointer flex-col justify-between rounded-md
        border bg-white transition duration-75 ease-in-out focus-within:border-slate-400
      focus:border-slate-400 focus:outline-none focus:ring-slate-400 hover:border-slate-400
      `}
    >
      <div className="ml-4 flex items-center">
        <button
          className={`
            absolute top-2.5 bg-white  transition duration-150
            ease-in-out focus:text-green-600 focus:outline-none hover:text-green-600
            ${task.is_completed ? 'text-green-600' : 'text-slate-500'}
          `}
        >
          {task.is_completed ? (
            <BsCheckCircleFill className="h-4 w-4" />
          ) : (
            <BsCheckCircle className="h-4 w-4" />
          )}
        </button>
        <ReactTextareaAutosize
          className={`
            flex-1 cursor-pointer select-none resize-none overflow-hidden
            border-none bg-transparent pl-6 text-sm font-medium focus:ring-0
          `}
          defaultValue={task.name}
          disabled={true}
          placeholder="Write task name"
          autoFocus
        />
        <div className="absolute right-2 top-2 opacity-0 group-task-hover:opacity-100 group-task-focus:opacity-100">
          <Menu as="div" className="relative z-10 inline-block items-center bg-white text-left">
            {({ open }) => (
              <>
                <Menu.Button
                  className={`
                    rounded-lg border p-2 text-slate-600 opacity-0  hover:border-slate-300 hover:bg-slate-100
                    active:scale-95 group-task-hover:opacity-100 group-task-focus:opacity-100
                  ${open ? 'border-slate-300 bg-slate-100' : 'border-slate-200'}
              `}
                  onClick={() => {
                    if (task_id) return
                  }}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Menu.Button>
                <MenuTransition>
                  <Menu.Items
                    className={classNames(
                      'absolute right-0 mt-1 w-44 origin-top-right divide-y divide-gray-200 overflow-hidden',
                      'rounded-md border border-slate-200 bg-white py-1 shadow-xl focus:outline-none'
                    )}
                  >
                    <Menu.Item>
                      <button
                        className={classNames(
                          'flex w-full items-center space-x-3 py-2 px-4 text-sm font-medium text-slate-900',
                          'transition duration-150 ease-in-out hover:bg-slate-100 active:bg-slate-500 active:text-white'
                        )}
                      >
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit task name
                      </button>
                    </Menu.Item>
                    <div>
                      <Menu.Item>
                        <button
                          className={classNames(
                            'flex w-full items-center space-x-3 py-2 px-4 text-sm font-medium text-rose-600',
                            'transition duration-150 ease-in-out hover:bg-rose-100 active:bg-rose-600 active:text-white'
                          )}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete task
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </MenuTransition>
              </>
            )}
          </Menu>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 transition duration-150 ease-in-out">
        <div className="flex items-center space-x-2.5">
          <Tooltip text="Assignee">
            <>
              {task?.member?.user ? (
                <button
                  className="overflow-hidden rounded-full"
                  onClick={handleUpdateAssigneeToggle}
                >
                  <img src={task?.member?.user.avatar.url} className="z-10 h-6 w-6 rounded-full" />
                </button>
              ) : (
                <button
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
              {updateAssigneeModal && addAssigneeComponent}
            </>
          </Tooltip>
          <Tooltip text="Due Date">
            <ReactDatePicker
              selected={updateTaskDueDate}
              onChange={(date: Date) => setUpdateTaskDueDate(date)}
              value={task.due_date}
              customInput={<CustomCalendarButton />}
            />
          </Tooltip>
        </div>
        <div
          className={`
            opacity-0 group-task-hover:opacity-100 group-task-focus:opacity-100
            ${task_id == task.id && 'opacity-100'}
          `}
        >
          <button
            onClick={() => router.push(`/team/${router.query.id}/board?task_id=${task.id}`)}
            className="rounded-full p-1 text-slate-400 focus:bg-slate-200 focus:text-slate-900 hover:bg-slate-200 hover:text-slate-900 active:scale-95"
          >
            <Eye className="h-4 w-4 outline-none" />
          </button>
        </div>
      </div>
    </div>
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
          <img src={avatar_url} className="h-8 w-8 rounded-md" />
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

export default TaskList
