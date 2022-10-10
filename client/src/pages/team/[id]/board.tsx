import React, { FC } from 'react'
import { Plus, MoreHorizontal } from 'react-feather'
import { useRouter } from 'next/router'

import { globals } from '~/shared/twin/globals.styles'
import SubmitButton from '~/components/atoms/SubmitButton'
import ProjectLayout from '~/components/templates/ProjectLayout'

const Board: FC = (): JSX.Element => {
  const router = useRouter()

  const { id } = router.query

  return (
    <ProjectLayout metaTitle="Board">
      <main className="flex min-h-screen w-full max-w-full flex-1 space-x-4  overflow-x-scroll bg-slate-50 px-4 py-5">
        <section className="group-board w-full max-w-[18rem] flex-shrink-0">
          <header className="flex items-center justify-between px-3 py-1">
            <h1 className="text-base font-semibold">📝 Backlog</h1>
            <div className="flex items-center space-x-1">
              <button className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200">
                <Plus className="h-5 w-5" />
              </button>
              <button className="rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </header>
          <main className="default-scrollbar h-[75vh] min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi odio
            temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure perspiciatis
            molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi
            odio temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure
            perspiciatis molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi
            odio temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure
            perspiciatis molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi
            odio temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure
            perspiciatis molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi
            odio temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure
            perspiciatis molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem vero quasi
            odio temporibus, consectetur alias ipsa consequuntur nam, in nulla placeat iure
            perspiciatis molestias fuga cumque facere iste iusto aut.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorem vero quasi odio temporibus, consectetur alias ipsa
            consequuntur nam, in nulla placeat iure perspiciatis molestias fuga cumque facere iste
            iusto aut.
          </main>
        </section>
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="flex items-center justify-between px-3 py-1">
            <h1 className="text-base font-semibold">🕞 In Progress</h1>
            <div className="flex items-center space-x-1">
              <button className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200">
                <Plus className="h-5 w-5" />
              </button>
              <button className="rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </header>
          <main className="min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
            <p className="text-center text-sm text-slate-600">No current task</p>
          </main>
        </section>
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="flex items-center justify-between px-3 py-1">
            <h1 className="text-base font-semibold">✅ Completed</h1>
            <div className="flex items-center space-x-1">
              <button className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200">
                <Plus className="h-5 w-5" />
              </button>
              <button className="rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </header>
          <main className="min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
            <p className="text-center text-sm text-slate-600">No current task</p>
          </main>
        </section>
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="flex items-center justify-between px-3 py-1">
            <h1 className="text-base font-semibold">🕞 In Progress</h1>
            <div className="flex items-center space-x-1">
              <button className="rounded p-0.5 text-blue-600 transition duration-75 ease-in-out hover:bg-slate-200">
                <Plus className="h-5 w-5" />
              </button>
              <button className="rounded p-0.5 text-slate-900 transition duration-75 ease-in-out hover:bg-slate-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </header>
          <main className="min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
            <p className="text-center text-sm text-slate-600">No current task</p>
          </main>
        </section>
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="-mt-5 flex items-center justify-between py-2">
            <input
              type="text"
              css={globals.form_control}
              className="py-0.5"
              placeholder="New section"
            />
          </header>
          <main className="min-h-[75vh] overflow-y-auto rounded-lg border bg-white px-4 py-5 group-board-hover:shadow-sm">
            <p className="text-center text-sm text-slate-600">No current task</p>
          </main>
        </section>
        <section className="w-full max-w-[18rem] flex-shrink-0">
          <header className="-mt-5 flex items-center justify-between py-2">
            <button className="flex items-center space-x-2 rounded-md bg-blue-600 px-10 py-2 text-sm font-normal text-white hover:bg-blue-700 active:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Add section
            </button>
          </header>
        </section>
      </main>
    </ProjectLayout>
  )
}

export { authCheck as getServerSideProps } from '~/utils/getServerSideProps'
export default Board
