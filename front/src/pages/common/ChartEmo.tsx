import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { PostType } from '../../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
import { Card } from 'react-onsenui';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

let width:number, height:number, gradient:any;

const ChartEmo = () =>{

  const posts:PostType[] = useSelector((root:RootState)=>root.postSlice.postStore.posts.filter(p=>p.feelLike>0));

  const labels = useMemo(()=>{
    const labels = [];
    for (let i=0; i<=7*24*1; i+=12){
      labels.push(new Date(new Date().getTime()-(60*60*1000)*(i-2)));
    }
    return labels;
  },[])

  const options = useMemo(()=>{return{
    type: "line",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
          anchor: 'end',
          align: 'right',
          // formatter: (value, context:any)=>{
          //   return labels[context.dataIndex] + "nm"
          // },
          font: {
              weight: 'bold'
          }
      }
    },
    scales: {
        x: {
          type: 'linear',
          title: {
            display: false,
            text: 'Wavelengths [nm]'
          },
          ticks:{
            beginAtZero: true,
            maxTicksLimit: 10,
            max: 2000,
            callback: function(dataLabel, index) {
                return moment(dataLabel).format("YYYY-MM-DD HH")
            }
          }
        },
        y:{
          ticks: {
            display: false
          }
        }
      }
  }},[]);

  const data = useMemo(()=>{

    return{
      labels,
      datasets: [
        {
          label: 'Spektrum',
          data: labels.map((x,i) =>{
            let value = 0 as number | null;
            posts.forEach(p=>{
              value = Math.abs(moment(p.createdAt).diff(x)) < 30*60*1000 ? p.feelLike: null;
            })
            // return value;
            // return i%12 === 0 ? Math.floor(Math.random()*5+1): null;
            return Math.floor(Math.random()*5+1);
          }),
          borderColor: 'rgb(132, 99, 255)',
          backgroundColor: 'rgba(132, 99, 255, 0.5)',
          fill: true,
          pointRadius: 5,
          datalabels: {
          }
        }
      ],
    }
  },[]);


  return(
    <section>
      <Card modifier="post">
        <div style={{height:"400px"}}>
          <Line options={options} data={data} />
        </div>
      </Card>
    </section>
  )
}

export default ChartEmo;
