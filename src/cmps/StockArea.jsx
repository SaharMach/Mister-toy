import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {DoughnutChart} from '../cmps/DoughnutChart'


export function StockArea(){
    const labels = useSelector(storeState => storeState.toyModule.labels)
    const toys = useSelector(storeState => storeState.toyModule.toys)


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



    const labelCounts = countLabelOccurrences(toys)
    const outOfStock = labels.filter(label => !labelCounts[label]);
    console.log('labelCounts from stockarea', outOfStock);

    return (
        <section className='stock-area-layout'>
            <h1>Overview:</h1>
            <DoughnutChart labels={labels} toys={toys}/>
            <ul className='stock-area-list clean-list'>
                <th>
                    Out of stock
                </th>
                {outOfStock.map(label => (
                    <li className='label' key={label}>No toys in <span>{label}</span> label, need to buy</li>
                    )
                )}
            </ul>
        </section>
    )
}