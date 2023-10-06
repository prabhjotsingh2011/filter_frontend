import React from 'react'
// import { Chart } from 'react-charts'
 
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip, Legend} from 'chart.js';

  import { Bar } from 'react-chartjs-2';
import Table from './Table';

  ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  );

function ChartDisplay({data}) {
  // console.log(data);
  // const data =  {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'Sales 1',
  //       data: [12, 19, 3, 5, 2, 3, 15],
  //       backgroundColor: 'rgba(255, 99, 132, 0.2)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //     }
  //   ]
  // } 
  
 
  return (
    <div
      className='mx-auto w-full mt-10'
    >
        {/* {data && <Bar data={data} />} */}
      {
        data.map((curr)=>(
          <>
          
          <Bar data={curr} />
          <h4 className='mb-16'>Bar Graph of {curr.country}</h4>
          </>
        ))
      }
     
    </div>
  )
}

export default ChartDisplay