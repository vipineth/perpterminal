import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

let activeClass = `z-10 bg-green-100 border-green-600 text-green-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium`;
let normalClass = `bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium`;

function range(from, to, step = 1) {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
}
const LEFT_PAGE = "left";
const RIGHT_PAGE = "right";

function fetchPageNumbers(totalPages, pageIndex, pageNeighbours = 2) {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    let pages = [];

    const leftBound = pageIndex - pageNeighbours;
    const rightBound = pageIndex + pageNeighbours;
    const beforeLastPage = totalPages - 1;

    const startPage = leftBound > 2 ? leftBound : 2;
    const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

    pages = range(startPage, endPage);

    const pagesCount = pages.length;
    const singleSpillOffset = totalNumbers - pagesCount - 1;

    const leftSpill = startPage > 2;
    const rightSpill = endPage < beforeLastPage;

    const leftSpillPage = LEFT_PAGE;
    const rightSpillPage = RIGHT_PAGE;

    if (leftSpill && !rightSpill) {
      const extraPages = range(startPage - singleSpillOffset, startPage - 1);
      pages = [leftSpillPage, ...extraPages, ...pages];
    } else if (!leftSpill && rightSpill) {
      const extraPages = range(endPage + 1, endPage + singleSpillOffset);
      pages = [...pages, ...extraPages, rightSpillPage];
    } else if (leftSpill && rightSpill) {
      pages = [leftSpillPage, ...pages, rightSpillPage];
    }

    return [1, ...pages, totalPages];
  }

  return range(1, totalPages);
}

export default function Pagination(props) {
  let pageNumbers = fetchPageNumbers(props.pageCount - 1, props.pageIndex);
  return (
    <div className="bg-white px-4 py-5 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => props.gotoPage(props.pageIndex - 1)}
          disabled={props.canPreviousPage}
          className="relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-green-700 text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          disabled={props.canNextPage}
          onClick={() => props.gotoPage(props.pageIndex + 1)}
          className="ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-green-700 text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page{" "}
            <span className="font-medium">{props.pageIndex} of </span>
            <span className="font-medium">{props.pageOptions.length}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* <button
              onClick={() => props.previousPage()}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span> */}
            {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            {/* </button> */}

            {pageNumbers.map((page, index) => (
              <button
                key={index}
                onClick={() => {
                  if (page === "left") {
                    props.gotoPage(props.pageIndex - 3);
                  }
                  if (page === "right") {
                    props.gotoPage(props.pageIndex + 3);
                  }
                  props.gotoPage(page);
                }}
                aria-current="page"
                className={props.pageIndex === page ? activeClass : normalClass}
              >
                {page === "left" ? (
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                ) : page === "right" ? (
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  page
                )}
              </button>
            ))}

            {/* <button
              onClick={() => props.nextPage()}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
