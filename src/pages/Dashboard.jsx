import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StockArea } from '../cmps/StockArea';
import { LineChartsArea } from '../cmps/LineChartsArea';
import { DashboardSideBar } from '../cmps/SideBar';
export function Dashboard() {
  return(
      
      <section className='dashboard-layout'>
          <DashboardSideBar />
          <StockArea />
          <LineChartsArea />
      </section>

      )
      
  
}
