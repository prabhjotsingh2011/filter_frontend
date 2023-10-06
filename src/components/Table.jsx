import React, { useState } from 'react';

function Table({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data?.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage > 1 && currentPage <= nPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < nPage && currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto  h-96">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr >
                  <th scope="col" className="px-6 py-4">
                    No.
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Country Code
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Population
                  </th>
                </tr>
              </thead>
              <tbody className='overflow-y-scroll'>
                {data &&
                  records.map((item, index) => (
                    <tr key={item._id} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{item.country}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.countryiso3code}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">{item.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-row m-auto">
        <button
          onClick={prePage}
          className="px-4 py-2 mx-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="justify-center items-center mr-3 mt-2">{currentPage}</span>
        <button
          onClick={next}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
