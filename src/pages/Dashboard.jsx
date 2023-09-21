import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {DoughnutChart} from '../cmps/DoughnutChart'


export function Dashboard() {
    const labels = useSelector(storeState => storeState.toyModule.labels)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log(toys ,'from dashboard');
    // const data = getData(labels,toys)
  return(
      <DoughnutChart labels={labels} toys={toys}/>

      )
      
  
}
