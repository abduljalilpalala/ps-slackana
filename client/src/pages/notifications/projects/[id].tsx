import Link from 'next/link'
import { NextPage } from 'next'
import { FC, useEffect, useState } from 'react'
import { Hash } from 'react-feather'
import { NextRouter, useRouter } from 'next/router'

import { globals } from '~/shared/twin/globals.styles'
import Pagination from '~/components/atoms/Pagination'
import NotificationList from '~/components/molecules/NotificationList'
import NotificationLayout from '~/components/templates/NotificationLayout'
import { useNotificationMethods } from '~/hooks/notificationMethods'
import LineSkeleton from '~/components/atoms/Skeletons/LineSkeleton'
import { SidebarProject } from '~/shared/interfaces'

const Notifications: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter()
  const [pageNumber, setPageNumber] = useState<number>(0)
  const {
    sidebarProject,
    isSidebarLoading,
    notificationsTable,
    isTableLoading,
    setCurrentProjectID,
    useGetNotificationsTable
  } = useNotificationMethods()
  const { id, type } = router.query

  useEffect(() => {
    setCurrentProjectID(parseInt(id as string))
    useGetNotificationsTable(parseInt(id as string), type as string)
  }, [id, type])

  /*
   * This is the logic for creating a custom pagination
   */
  const filesPerPage = 14
  const pagesVisited = pageNumber * filesPerPage
  const displayNotifications = notificationsTable.slice(pagesVisited, pagesVisited + filesPerPage)
  const pageCount = Math.ceil(notificationsTable.length / filesPerPage)
  const changePage = ({ selected }: { selected: number }): void => setPageNumber(selected)
  const SidebarLoading: FC = (): JSX.Element => (
    <div
      className="flex w-full items-center space-x-2 rounded-md border bg-slate-100 py-2 px-4 text-sm font-semibold
  outline-none"
    >
      <Hash className="h-4 w-4 shrink-0" />
      <LineSkeleton className=" mt-2 h-[10px] w-[100px]" />
    </div>
  )
  const handleSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/notifications/projects/${e.target.value}?type=all`)
  }
  return (
    <NotificationLayout metaTitle="Notifications">
      <article className="flex h-full min-h-full w-full overflow-hidden text-slate-700">
        {/*
         * List of Projects
         */}
        <section className="flex max-w-[300px] flex-col py-8">
          <h1 className="mb-4 hidden px-4 text-sm font-bold md:block">List of Projects</h1>
          <nav className="hidden h-screen overflow-y-auto px-4 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md md:block">
            <ul className="flex flex-col space-y-1 text-sm">
              {!isSidebarLoading
                ? sidebarProject?.map(({ id, title }: SidebarProject) => (
                    <li key={id}>
                      <Link href={`/notifications/projects/${id}?type=all`}>
                        <a
                          href="#"
                          className={`
                        flex w-full items-center space-x-2 rounded-md border border-transparent py-2 px-4 text-sm font-semibold
                         text-slate-700 outline-none transition duration-75 ease-in-out hover:border-slate-200 hover:bg-slate-100 active:scale-95
                        ${
                          router.query.id == id.toString() &&
                          `/notifications/projects/${id}` &&
                          'bg-blue-600 !text-white hover:bg-blue-700'
                        }
                      `}
                        >
                          <Hash className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">{title}</span>
                        </a>
                      </Link>
                    </li>
                  ))
                : [...Array(5)].map((e, i) => <SidebarLoading key={i} />)}
            </ul>
          </nav>
        </section>

        {/*
         * Notification Table List
         */}
        <section className="mx-auto flex w-full max-w-7xl flex-col space-y-2 py-6 px-2 md:px-4">
          <article className="flex items-center justify-between space-x-2 overflow-x-auto px-4 md:justify-end">
            <div className="block w-full md:hidden">
              <select
                onChange={handleSelectProject}
                css={globals.form_control}
                className="w-full font-semibold"
              >
                {sidebarProject?.map(({ id, title }: SidebarProject) => (
                  <option value={id} key={id} className="line-clamp-1">
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="shrink-0 divide-x divide-slate-300 overflow-hidden rounded-md border border-slate-300 text-sm text-slate-900">
              <button
                onClick={() => router.push(`/notifications/projects/${id}?type=all`)}
                className={`${router.query.type === 'all' && 'bg-slate-200'}
                  w-16 overflow-hidden  py-2 outline-none md:py-1.5
                `}
              >
                All
              </button>
              <button
                onClick={() => router.push(`/notifications/projects/${id}?type=unread`)}
                className={` ${router.query.type === 'unread' && 'bg-slate-200'}
                  w-16 overflow-hidden py-2 outline-none md:py-1.5
                `}
              >
                Unread
              </button>
            </div>
          </article>
          <article className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between overflow-hidden bg-white px-4 pb-4">
            <header className="rounded-t-md border-x border-t border-slate-300 bg-slate-100 px-6 py-3">
              <h1 className="text-sm font-semibold">Notifications</h1>
            </header>
            <main
              className={`
                h-full w-full max-w-full flex-1 overflow-auto rounded-b-md border-x border-b border-slate-300 bg-white 
                scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md
              `}
            >
              <NotificationList isLoading={isTableLoading} notifications={displayNotifications} />
            </main>
            <footer className="mt-3 flex items-center justify-center ">
              <Pagination
                length={notificationsTable?.length}
                pageNumber={pageNumber}
                pageCount={pageCount}
                actions={{ changePage }}
              />
            </footer>
          </article>
        </section>
      </article>
    </NotificationLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Notifications
