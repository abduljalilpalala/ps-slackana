import { NextPage } from 'next'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { Plus } from 'react-feather'
import React, { useState } from 'react'

import { boardData } from '~/shared/jsons/boardData'
import BoardSection from '~/components/organisms/BoardSection'
import BoardWrapper from '~/components/templates/BoardWrapper'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Board: NextPage = (): JSX.Element => {
  const [showAddSection, setShowAddSection] = useState(true)
  const [boards, setBoards] = useState(boardData)

  const handleShowAddSection = (): void => setShowAddSection(!showAddSection)

  const onChangeSection = (e: any) => e.target.value

  const onClickOutSection = (e: any) => {
    const value = e.target.value

    if (value.length === 0) {
      handleShowAddSection()
    } else {
      handleSaveSection(value)
    }
  }

  const onClickEnterSection = (e: any) => {
    const value = e.target.value
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (value.length === 0) {
        handleShowAddSection()
      } else {
        handleSaveSection(value)
      }
    }
  }

  /**
   * Implement Save Board Section
   * (note): Please remove after integration
   */
  const handleSaveSection = async (name: string): Promise<void> => {
    setBoards([
      ...boards,
      {
        id: uuidv4(),
        name
      }
    ])
    setShowAddSection(!showAddSection)
    toast.success('Successfully Added!')
  }

  /**
   * Implement Remove Board Section
   * (note): Please remove after integration
   */
  const handleRemoveSection = async (id: string): Promise<void> => {
    const message = confirm('Do you want to delete section?')
    if (message) {
      setBoards(boards.filter((item) => item.id !== id))
      toast.success('Successfully Removed!')
    }
  }

  /**
   * Implement Update Board Section
   * (note): Please remove after integration
   */
  const handleUpdateSection = (e: any) => {
    const value = e.target.value
    if (e.key === 'Enter' || e.keyCode === 13) {
      console.log(value)
      toast.success('Successfully Updated!')
    }
  }

  return (
    <ProjectLayout metaTitle="Board">
      <BoardWrapper>
        {boards.map((board) => (
          <BoardSection
            key={board.id}
            {...board}
            actions={{ handleRemoveSection, handleUpdateSection }}
          >
            <p className="text-center text-sm text-slate-600">No current task</p>
          </BoardSection>
        ))}
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="-mt-2 flex items-center justify-between py-2">
            {showAddSection && (
              <button
                onClick={handleShowAddSection}
                className="flex items-center space-x-2 rounded-md bg-blue-600 px-10 py-2 text-sm font-normal text-white hover:bg-blue-700 active:bg-blue-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add section
              </button>
            )}
            {!showAddSection && (
              <input
                type="text"
                autoFocus
                onKeyDown={onClickEnterSection}
                onChange={onChangeSection}
                onBlur={onClickOutSection}
                placeholder="New Section"
                className="w-full rounded-lg border-2 py-1 px-1 font-semibold text-slate-900 focus:outline focus:outline-4 focus:outline-offset-2"
              />
            )}
          </header>
        </section>
      </BoardWrapper>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Board
