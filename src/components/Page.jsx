import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Chart from './ChartDisplay';
import { getData, getAllData, downloadCSV } from '../http';
import Table from './Table';
import { ToastContainer, toast } from 'react-toastify';
import exportFromJSON from 'export-from-json'
import 'react-toastify/dist/ReactToastify.css'; 



const Page = () => {
  const [filter, setFilter] = useState({
    countries: [], // Use an array to store selected countries
    fromYear: '',
    toYear: '',
  });

  const [filteredData, setFilteredData] = useState();
  const [countriesOptions, setcountriesOptions] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartclick, setChartclick] = useState(false)
  const [datatoexport, setDatatoexport] = useState({})

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleFilterSubmit = () => {
    
    async function demo() {
      const { data } = await getData(filter);
      // Object.entries(data).map((d)=>console.log(d))
      // console.log(data)
      if(data.message){
        toast.error(`${data.message}`)
      }
      
      // creating chart data
      if(chartData.length!=0){
        setChartData([])
      }    
      
      for (let i = 0; i < data?.separateData?.length; i++) {

        const chartData = {
          labels: data.separateData[i].slice(0, 8).map((d) => d.date),
          datasets: [
            {
              label: 'Population',
              data: data.separateData[i].slice(0, 8).map((d) => d.value),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            }
          ],
          country: data.separateData[i][0]?.country
        }
        setChartData((prev)=> [...prev,chartData]);
        
      }
      setFilteredData(data.data);
      setDatatoexport(data.data)
    }
    demo()
  };

  const handleExport = () => {
    // Implement export logic here (e.g., export to Excel/CSV)
    async function demo(){
      if(!datatoexport){
        toast('No data to export')
        return
      }else{

        const fileName = 'download'
        const exportType =  exportFromJSON.types.xls
        exportFromJSON({ data:datatoexport, fileName, exportType })  
      }
    }
    demo()
  };

  useEffect(() => {
    // Dummy data for demonstration
    async function demo() {
      const { data } = await getAllData()

      const uniqueCountries = [...new Set(data.data.map(item => item.country))];

      const con = uniqueCountries.map((country) => ({
        value: country,
        label: country,
      }))
      setcountriesOptions(con)
      
      // const { data: { data: filterdata } } = await getData(filter);
      // console.log(filterdata)

    }
    demo()
  }, [])





  const handleCountryChange = (selectedCountries) => {
    setFilter({ ...filter, countries: selectedCountries });
  };
  

  return (
    <div className="container mx-auto mt-5">
      <div className="mb-4">
        <h1 className="text-2xl  font-semibold">Data Filter</h1>
      </div>
      <div className="mb-4">
        <label htmlFor="countries" className="block font-medium">
          Country
        </label>
        <Select
          id="countries"
          name="countries"
          options={countriesOptions}
          isMulti // Enable multi-select
          value={filter.countries}
          onChange={handleCountryChange}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="fromYear" className="block font-medium">
          From Year ( from 1960 to 2023 )
        </label>
        <input
          type="number"
          id="fromYear"
          name="fromYear"
          value={filter.fromYear}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="toYear" className="block font-medium">
          To Year ( from 1960 to 2023 )
        </label>
        <input
          type="number"
          id="toYear"
          name="toYear"
          value={filter.toYear}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleFilterSubmit}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Export to Excel/CSV
        </button>
      </div>

      {/* // Display filtered data here */}
      {chartData && <Chart data={chartData} />}
      {filteredData && <Table data={filteredData} />}
      <ToastContainer />
    </div>
  );
};

export default Page;
