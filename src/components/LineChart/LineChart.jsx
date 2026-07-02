import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

const [data, setData] = useState([["Date","Prices"]])

useEffect(()=>{
let dataCopy = [["Date","Prices"]];
if(historicalData.prices){
    historicalData.prices.map((item)=>{
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().
            slice(0,-5)}`,item[1]])
    })
    setData(dataCopy);
}
},[historicalData])

  return (
   <div style={{ width: '100%', height: '100%' }}>
     <Chart
       chartType='LineChart'
       data={data}
       width='100%'
       height='100%'
       legendToggle
       options={{
         chartArea: { width: '85%', height: '75%' },
         hAxis: { textStyle: { color: '#dce4ff' } },
         vAxis: { textStyle: { color: '#dce4ff' } },
         legend: { textStyle: { color: '#dce4ff' } },
         backgroundColor: 'transparent',
         colors: ['#4c54ff'],
         lineWidth: 3,
         pointSize: 4,
       }}
     />
   </div>
  )
}

export default LineChart
