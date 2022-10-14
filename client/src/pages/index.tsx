import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import {
  createProject,
  filterProjects,
  setProjectTitle,
  setProjectDescription,
} from '~/redux/project/projectSlice'
import getDate from '~/utils/getDate'
import { Add } from '~/shared/icons/AddIcon'
import getGreetings from '~/utils/getGreetings'
import SeeMore from '~/components/atoms/SeeMore'
import { darkToaster } from '~/utils/darkToaster'
import { globals } from '~/shared/twin/globals.styles'
import { ThreeDot } from '~/shared/icons/ThreeDotIcon'
import Layout from '~/components/templates/HomeLayout'
import InputTags from '~/components/molecules/InputTags'
import DialogBox from '~/components/templates/DialogBox'
import SubmitButton from '~/components/atoms/SubmitButton'
import DropDown from '~/components/organisms/DropDownFilter'
import ProjectTemplate from '~/components/templates/ProjectTemplate'
import { styles as homeStyle } from '~/shared/twin/home-content.style'
import { useAppSelector, useAppDispatch } from '~/hooks/reduxSelector'

const Index: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState<boolean>(false)
  const [newProjectModal, setNewProjectModal] = useState<boolean>(false)
  const [preventStateReload, setPreventStateReload] = useState<boolean>(false); // Implement later

  const {
    auth: { user },
    project: { filter, project, isLoading, newProject, } } = useAppSelector((state) => state);

  const { name } = user || {};
  const { title, description } = newProject || {};

  useEffect(() => {
    if (isLoading) {
      setLimit(false);
      dispatch(filterProjects());
    }
  }, [filter, isLoading])

  const onCreateProject = (): void => {
    setNewProjectModal(false);
    dispatch(createProject(newProject))
      .then(({ payload }) => {
        darkToaster('✅', payload);
      });
  }

  const [isTitleDisabled, setIsTitleDisabled] = useState<boolean>(true);
  const onChange = (e: any): void => {
    const value = e.target.value;
    const name = e.target.name;
    const isDisable = value.length === 0;

    if (name === "title") {
      dispatch(setProjectTitle(value));
      setIsTitleDisabled(isDisable);
    } else {
      dispatch(setProjectDescription(value));
    }
  }

  const projectList = isLoading
    ? <ProjectTemplate data={null} isLoading={isLoading} />
    : project?.length === 0
      ? <h1 className="col-span-3 text-center text-slate-600">No available project.</h1>
      : project?.slice(0, limit ? project?.length : 12)
        .map((data: any, index: number) => {
          return <ProjectTemplate data={data} key={index} isLoading={isLoading} />
        });

  const addNewProject = (
    <DialogBox isOpen={true} closeModal={() => setNewProjectModal(false)} headerTitle="New project">

      <div className='flex flex-col gap-9'>
        <div >
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
          className={`!text-slate-50 !bg-blue-600 hover:!bg-blue-600 opacity-60 hover:!opacity-100 ${(isTitleDisabled) && "hover:!opacity-60 !cursor-not-allowed"}`} />

      </div>
    </DialogBox>
  )

  return (
    <Layout metaTitle="Home">
      {newProjectModal && addNewProject}
      <div className="default-scrollbar grid w-full h-screen overflow-y-scroll p-10">
        <div className="!max-w-[900px] flex flex-col items-center justify-center gap-16 md:container mobile:!pb-20 mobile:!gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-sm">{getDate('today')}</p>
            <h1 className="text-center text-3xl">{getGreetings()}, {name}</h1>
          </div>

          <div className="w-full">
            <div className="header rounded-t-lg border border-slate-300 px-6 py-3">
              <div className="items-between flex flex-row justify-between ">
                <div className="flex flex-row items-center justify-center gap-3">
                  <div
                    onClick={() => setNewProjectModal(true)}
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-dotted border-slate-400 hover:bg-slate-100"
                  >
                    <Add />
                  </div>
                  <h1 className="text-2xl">Projects</h1>
                </div>
                <DropDown>
                  <div className='hover:bg-slate-100 z-0 cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg border border-slate-500'>
                    <ThreeDot />
                  </div>
                </DropDown>
              </div>
            </div>

            <div className="grid h-px-400 grid-cols-3 col-span-1	gap-6 overflow-y-scroll rounded-b-lg border-x border-b border-slate-300 px-7 py-10 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md tablet:grid-cols-2 mobile:grid-cols-1">
              {projectList}

              {project?.length <= 12 && [...Array(12 - project?.length)].map(_ => {
                return <div data-name="spacer" key={Math.random()}></div>;
              })}

              {project?.slice(0, 13).length === 13 && (
                isLoading || <SeeMore set={setLimit} what={limit} />
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
