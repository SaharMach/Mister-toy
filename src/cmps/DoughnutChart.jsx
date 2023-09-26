import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export function DoughnutChart({labels,toys}){
  
    console.log('labels and toys from chart',labels,toys);
    function countLabelOccurrences(toys) {
        const counts = {};

        toys.map(toy => {
            toy.labels.forEach(label => {
                if (!counts[label]) {
                    counts[label] = 0
                }
                counts[label]++
            })
        })
        console.log('count',counts)
        return counts;
    }

    function countLabelAvgPrice(toys) {
        const counts = {};

        toys.map(toy => {
            toy.labels.forEach(label => {
                if (!counts[label]) {
                    counts[label] = 0
                }
                counts[label] += toy.price
            })
        })
        console.log('count',counts)
        return counts;
    }

    const labelsAvgPrice = countLabelAvgPrice(toys)
    console.log('labels avg price' , labelsAvgPrice);
    const labelCounts = countLabelOccurrences(toys)


    const dataAvg =  {
        labels,
        datasets: [{
            label: '# of Toys',
            data: labels.map(label => labelsAvgPrice[label] || 0),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    }

    const dataCounts =  {
        labels,
        datasets: [{
            label: '# of Toys',
            data: labels.map(label => labelCounts[label] || 0),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    }
    
    return(
        <section className='doughnut'>
        <span className='doughnut-chart'>By Stock

         <Doughnut data={dataCounts} />  
        </span>
        <span className='doughnut-chart'>
        By Price
         <Doughnut data={dataAvg} />
        </span>
          </section>
        )
    
}


    



