import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { MoreHorizontal } from 'react-feather'

import {
  createProject,
  filterProjects,
  setProjectTitle,
  setProjectDescription
} from '~/redux/project/projectSlice'
import getDate from '~/utils/getDate'
import { Add } from '~/shared/icons/AddIcon'
import getGreetings from '~/utils/getGreetings'
import SeeMore from '~/components/atoms/SeeMore'
import { globals } from '~/shared/twin/globals.styles'
import Layout from '~/components/templates/HomeLayout'
import InputTags from '~/components/molecules/InputTags'
import DialogBox from '~/components/templates/DialogBox'
import SubmitButton from '~/components/atoms/SubmitButton'
import DropDown from '~/components/organisms/DropDownFilter'
import ProjectTemplate from '~/components/templates/ProjectTemplate'
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxSelector'

const Index: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [limit, setLimit] = useState<boolean>(false)
  const [isTitleDisabled, setIsTitleDisabled] = useState<boolean>(true)
  const [newProjectModal, setNewProjectModal] = useState<boolean>(false)
  const [preventStateReload, setPreventStateReload] = useState<boolean>(false)

  const {
    auth: { user },
    project: { filter, project, isLoading, newProject }
  } = useAppSelector((state) => state)

  const { name } = user || {}
  const { title, description } = newProject || {}

  useEffect(() => {
    if (isLoading) {
      setLimit(false)
    }
  }, [filter, isLoading])

  const onCreateProject = (): void => {
    setPreventStateReload(true)
    setIsTitleDisabled(true)
    setNewProjectModal(false)

    toast.promise(
      dispatch(createProject(newProject)).then((_) => {
        dispatch(filterProjects()).then((_) => {
          setPreventStateReload(false)
        })
      }),
      {
        loading: 'Creating new project...',
        success: `New Project created successfully!`,
        error: 'Error on creating project!'
      }
    )
  }

  const onChange = (e: any): void => {
    const value = e.target.value
    const name = e.target.name
    const isDisable = value.length <= 0

    if (name === 'title') {
      dispatch(setProjectTitle(value))
      setIsTitleDisabled(isDisable)
    } else {
      dispatch(setProjectDescription(value))
    }
  }

  const projectList = preventStateReload ? (
    <ProjectTemplate data={null} isLoading={preventStateReload} />
  ) : project?.length === 0 ? (
    <h1 className="col-span-3 text-center text-slate-600">No available project.</h1>
  ) : (
    project?.slice(0, limit ? project?.length : 12).map((data: any, index: number) => {
      return <ProjectTemplate data={data} key={index} isLoading={preventStateReload} />
    })
  )

  const addNewProject = (
    <DialogBox isOpen={true} closeModal={() => setNewProjectModal(false)} headerTitle="New project">
      <div className="flex flex-col gap-9">
        <div>
          <label htmlFor="title" css={globals.form_label} className="float-left">
            Title <span>*</span>
          </label>
          <input
            type="text"
            name="title"
            css={globals.form_control}
            disabled={isLoading}
            placeholder="Project name"
            value={title}
            onChange={onChange}
          />
        </div>

        <div css={homeStyle.tags}>
          <p css={globals.form_label} className="">
            Team <span>*</span>
          </p>
          <InputTags isSubmitting={isLoading} type="create" />
        </div>

        <div>
          <label htmlFor="description" css={globals.form_label} className="float-left">
            Description
          </label>
          <textarea
            name="description"
            css={globals.form_control}
            disabled={isLoading}
            placeholder="Lorem ipsum dolor sit amet, consectetur."
            rows={6}
            value={description}
            onChange={onChange}
          />
        </div>
        <SubmitButton
          text="Save"
          submitted={onCreateProject}
          isSubmitting={isLoading}
          isDisabled={isTitleDisabled}
          className={`!bg-blue-600 !text-slate-50 opacity-60 hover:!bg-blue-600 hover:!opacity-100 ${
            isTitleDisabled && '!cursor-not-allowed hover:!opacity-60'
          }`}
        />
      </div>
    </DialogBox>
  )

  return (
    <Layout metaTitle="Home">
      {newProjectModal && addNewProject}
      <div className="default-scrollbar mx-auto flex h-screen min-h-screen flex-col space-y-6 overflow-y-auto">
        <article className="flex flex-1 flex-shrink-0 flex-col items-center justify-center space-y-8 bg-slate-50 px-6 py-8">
          <header className="flex flex-col items-center justify-center space-y-2">
            <p className="text-base text-slate-600">{getDate('today')}</p>
            <h1 className="text-3xl font-normal text-slate-800">
              {getGreetings()},{' '}
              <span className="font-medium underline decoration-pink-500/40">{name}</span>
            </h1>
          </header>
          <main className="w-full max-w-[900px] pb-12">
            <section className="rounded-t-md border-x border-t border-slate-200 bg-white px-6 py-3 shadow-sm">
              <div className="items-between flex flex-row justify-between ">
                <div className="flex flex-row items-center justify-center gap-3">
                  <div
                    onClick={() => setNewProjectModal(true)}
                    className="flex cursor-pointer items-center justify-center rounded border border-slate-200 p-2.5 hover:bg-slate-100 active:scale-95"
                  >
                    <Add className="h-3 w-3" />
                  </div>
                  <h1 className="text-xl font-medium text-slate-600">Projects</h1>
                </div>
                <DropDown>
                  <div className="z-0 flex cursor-pointer items-center justify-center rounded border border-slate-200 p-2.5 hover:bg-slate-100 active:scale-95">
                    <MoreHorizontal className="h-3 w-3 text-slate-600" />
                  </div>
                </DropDown>
              </div>
            </section>
            <section
              className={`
                col-span-1 grid h-px-400 grid-cols-3 gap-6 overflow-y-scroll rounded-b-md border-x border-b border-t border-slate-200 bg-white px-7 py-10 shadow-sm scrollbar-thin
                scrollbar-track-white scrollbar-thumb-slate-300 scrollbar-thumb-rounded-md tablet:grid-cols-2 mobile:grid-cols-1
            `}
            >
              {projectList}
              {project?.slice(0, 13).length === 13
                ? preventStateReload || <SeeMore set={setLimit} what={limit} />
                : null}

              {project?.length <= 12 &&
                [...Array(12 - project?.length)].map((_) => {
                  return <div data-name="spacer" key={Math.random()}></div>
                })}
            </section>
          </main>
        </article>
      </div>
    </Layout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Index
