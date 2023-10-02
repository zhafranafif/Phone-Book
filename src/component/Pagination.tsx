import ReactPaginate from "react-paginate"
import {GrFormNextLink, GrFormPreviousLink} from 'react-icons/gr'

interface IPagination {
    initialPage: number
    marginPagesDisplayed: number
    pageCount: number
    pageRangeDisplayed: number
    onChange: ({ selected }: { selected: number }) => void
}


const Pagination: React.FC<IPagination> = ({
    initialPage,
    marginPagesDisplayed,
    pageCount,
    pageRangeDisplayed,
    onChange,
}) => {
  return (
    <div style={{
       display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
    }}>
          <ReactPaginate
              initialPage={initialPage}
              marginPagesDisplayed={marginPagesDisplayed}
              pageCount={pageCount}
              pageRangeDisplayed={pageRangeDisplayed}
              onPageChange={onChange}
              breakLabel={'...'}
              nextLabel={<GrFormNextLink style={{width: '30px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor: 'pointer'}}/>}
              previousLabel={<GrFormPreviousLink style={{width: '30px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', cursor:'pointer'}}/>}
              containerClassName="pagination"
              activeClassName="pagination active"
              pageLinkClassName="pagination-page-link"
              breakLinkClassName="pagination-break-link"
              nextLinkClassName="pagintion-next-link"
              previousLinkClassName="pagination-prev-link"
              pageClassName="pagination page-item"
              breakClassName="pagination break"
              nextClassName="pagination next"
              previousClassName="pagination prev"
          />
    </div>
  )
}

export default Pagination