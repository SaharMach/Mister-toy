import React from 'react';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

import {utilService} from '../services/util.service'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Profit',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Incomes',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};



export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Logging',
    },
  },
};


export const data2 = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Users',
      data: labels.map(() => faker.datatype.number({ min: 2000, max: 30000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const demoData = [
  {toy: 'Picakhu', price: faker.datatype.number({min: 30, max: 250})},
  {toy: 'Barbie', price: faker.datatype.number({min: 30, max: 250})},
  {toy: 'Buzz', price: faker.datatype.number({min: 30, max: 250})},
  {toy: 'Teddy Bear', price: faker.datatype.number({min: 30, max: 250})},
]

export function LineChartsArea() {
  console.log(demoData);
  return (
    <section className='line-charts-layout'>
      
        <Line options={options2} data={data2}/>
        <section className='profit-chart'>
          <Line options={options} data={data} />
          <h1>Latest Bills</h1>
          <ul className='bills-list clean-list'>
            
            {demoData.map(bill => {
              return <li key={bill.name}>
                <span>{bill.toy} sold for ${bill.price}</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Qr-1.svg/220px-Qr-1.svg.png" alt="" />
              </li>
            })}
          </ul>
      </section>
    </section>
  )

}
