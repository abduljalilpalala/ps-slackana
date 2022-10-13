import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { FC, forwardRef } from 'react'
import { BsCheckCircle } from 'react-icons/bs'
import { Calendar, Search, User } from 'react-feather'
import ReactTextareaAutosize from 'react-textarea-autosize'

import Tooltip from '~/components/templates/Tooltip'
import { assignees } from '~/shared/jsons/assigneeData'
import DialogBox from '~/components/templates/DialogBox'

type Props = {
  assignee: any
  assigneeModal: boolean
  newTaskDueDate: any
  setNewTaskDueDate: any
  setAssignee: any
  actions: {
    onClickEnterTask: (e: any) => void
    onClickOutTask: (e: any) => void
    onChangeTask: (e: any) => void
    handleAssigneeToggle: () => void
  }
}

const AddTask: FC<Props> = (props): JSX.Element => {
  const {
    assignee,
    assigneeModal,
    newTaskDueDate,
    setNewTaskDueDate,
    setAssignee,
    actions: { onClickEnterTask, onClickOutTask, onChangeTask, handleAssigneeToggle }
  } = props

  const handleSetAssignee = (id: number) => {
    const getMember = assignees.find((member) => member.id === id)
    setAssignee(getMember)
    handleAssigneeToggle()
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
      closeModal={handleAssigneeToggle}
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
      onMouseDown={(e) => e.preventDefault()}
      onBlur={onClickOutTask}
      className={`
        group-task flex w-full cursor-pointer flex-col justify-between rounded-md
        border bg-slate-50 transition duration-150 ease-in-out focus-within:border-slate-400
      focus:border-slate-400 focus:ring-slate-400 hover:border-slate-400
      `}
    >
      <div className="relative ml-4 flex items-center">
        <button
          className={`
            absolute top-2.5 bg-white text-slate-500  transition duration-150
            ease-in-out focus:text-green-600 focus:outline-none hover:text-green-600
          `}
        >
          <BsCheckCircle className="h-4 w-4" />
        </button>
        <ReactTextareaAutosize
          className={`
            flex-1 resize-none flex-wrap overflow-hidden border-none
            bg-transparent pl-6 text-sm font-medium focus:ring-0
          `}
          onKeyDown={onClickEnterTask}
          onChange={onChangeTask}
          placeholder="Write task name"
          autoFocus
        />
      </div>
      <div className="ml-4 flex items-center space-x-2.5 pb-2 transition duration-150 ease-in-out">
        <Tooltip text="Assignee">
          <>
            {assignee.avatar_url ? (
              <button className="overflow-hidden rounded-full" onClick={handleAssigneeToggle}>
                <img src={assignee.avatar_url} className="z-10 h-6 w-6 rounded-full" />
              </button>
            ) : (
              <button
                className={`
                  hover:border-slate rounded-full border-[1.5px] border-dashed border-slate-400 p-0.5
                text-slate-400 transition duration-75 ease-in-out focus:border-slate-500
                focus:text-slate-500 focus:outline-none hover:border-slate-500 hover:bg-white hover:text-slate-500
                `}
                onClick={handleAssigneeToggle}
              >
                <User className="h-4 w-4" />
              </button>
            )}
          </>
          {assigneeModal && addAssigneeComponent}
        </Tooltip>
        <Tooltip text="Due Date">
          <DatePicker
            selected={newTaskDueDate}
            onChange={(date: Date) => setNewTaskDueDate(date)}
            customInput={<CustomCalendarButton />}
          />
        </Tooltip>
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

export default AddTask
