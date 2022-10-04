import { NextPage } from 'next'
import { useState } from 'react'

import { Add } from '~/shared/icons/AddIcon'
import { styles } from '~/shared/twin/auth.styles'
import { Spinner } from '~/shared/icons/SpinnerIcon'
import { globals } from '~/shared/twin/globals.styles'
import Layout from '~/components/templates/HomeLayout'
import { ThreeDot } from '~/shared/icons/ThreeDotIcon'
import DropDown from '~/components/organisms/DropDownFilter'
import InputTags from '~/components/molecules/InputTags'
import DialogBox from '~/components/templates/DialogBox'
import { projectDataList } from '~/shared/jsons/projectDataList'
import ProjectTemplate from '~/components/templates/ProjectTemplate'
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import { useAppSelector } from '~/hooks/reduxSelector'

const Index: NextPage = (): JSX.Element => {
  const [limit, setLimit] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [newProjectModal, setNewProjectModal] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)
  const { name } = user || {}

  const projectList = projectDataList
    .slice(0, limit ? projectDataList.length : 12)
    .map((data: any, index: number) => {
      return <ProjectTemplate data={data} key={index} />
    })

  const addNewProject = (
    <DialogBox isOpen={true} closeModal={() => setNewProjectModal(false)} headerTitle="New project">

      <div className='flex flex-col gap-9'>
        <div >
          <label htmlFor="tite" css={globals.form_label} className="float-left">
            Title <span>*</span>
          </label>
          <input
            type="text"
            name="tite"
            css={globals.form_control}
            disabled={isSubmitting}
            placeholder="Project name"
          />
        </div>

        <div css={homeStyle.tags}>
          <p css={globals.form_label} className="">
            Team <span>*</span>
          </p>
          <InputTags isSubmitting={isSubmitting} />
        </div>

        <div>
          <label htmlFor="description" css={globals.form_label} className="float-left">
            Description
          </label>
          <textarea
            name="description"
            css={globals.form_control}
            disabled={isSubmitting}
            placeholder="Lorem ipsum dolor sit amet, consectetur."
            rows={6}
          />
        </div>

        <button
          onClick={() => setIsSubmitting(!isSubmitting)}
          type="submit"
          css={styles.form_submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner className="h-5 w-5" /> : 'Save'}
        </button>
      </div>
    </DialogBox>
  )

  const add = () => {
    console.log('add')
    setNewProjectModal(true)
  }

  const filter = (value: string) => {
    console.log(value)
  }

  return (
    <Layout metaTitle="Home">
      {newProjectModal && addNewProject}
      <div className="default-scrollbar grid w-full h-screen overflow-y-scroll p-10">
        <div className="!max-w-[900px] flex flex-col items-center justify-center gap-16 md:container mobile:!pb-20 mobile:!gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-sm">Tuesday, September 20</p>
            <h1 className="text-center text-3xl">Good afternoon, {name}</h1>
          </div>

          <div className="w-full">
            <div className="header rounded-t-lg border border-slate-300 px-6 py-3">
              <div className="items-between flex flex-row justify-between ">
                <div className="flex flex-row items-center justify-center gap-3">
                  <div
                    onClick={() => add()}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-dotted border-slate-400 hover:bg-slate-100"
                  >
                    <Add />
                  </div>
                  <h1 className="text-2xl">Projects</h1>
                </div>
                <DropDown callback={filter}>
                  <div className='hover:bg-slate-100 z-0 cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg border border-slate-500'>
                    <ThreeDot />
                  </div>
                </DropDown>
              </div>
            </div>

            <div className="grid h-px-400 grid-cols-3 gap-6 overflow-y-scroll rounded-b-lg border-x border-b border-slate-300 px-7 py-10 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md tablet:grid-cols-2 mobile:grid-cols-1">
              {projectList}
              {projectDataList.slice(0, 12).length === 12 && (
                <div onClick={() => setLimit(!limit)} css={homeStyle.more}>
                  <span>Show {limit ? 'less' : 'more'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Index
