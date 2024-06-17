import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponents({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity </h2>
      <ResponsiveContainer width={'80%'} height={300}>
      <BarChart
        data={budgetList}
        margin={{
          top:7
        }}
  
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        <Legend/>
        <Bar dataKey="totalSpend" fill="#000000"  />
        <Bar dataKey="amount" fill="#c0c0c0" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponents
