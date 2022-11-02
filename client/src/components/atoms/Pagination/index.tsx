import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  length: number
  pageNumber: number
  pageCount: number
  actions: {
    changePage: any
  }
}

const Pagination: React.FC<Props> = (props): JSX.Element => {
  const { pageNumber, pageCount, actions, length } = props
  const { changePage } = actions

  return (
    <section className="paginate-section text-gray-500">
      <ReactPaginate
        previousLabel="Prev"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={5}
        containerClassName="inline-flex -space-x-px text-sm"
        previousLinkClassName="paginate-link rounded-l-md"
        pageLinkClassName="paginate-link"
        activeClassName="paginate-link-active"
        nextLinkClassName="paginate-link rounded-r-md"
      />
    </section>
  )
}

export default Pagination
