import { PropsWithoutRef } from "react";
import {Doughnut} from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

  interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  score: number;
}



export default function WellStructuredChart(props: PropsWithoutRef<Props>){
    const {score} = props;
    const filler = 100 - score;
    const options = {
        plugins:{
            tooltip:{
                enabled:false
            },
        },
        events:[],
        maintainAspectRatio:false,
    }
    
    
    
    return <Doughnut data={
        {
            labels:[],
            datasets:[{
                backgroundColor:["rgba(242,135,50,0.75)","rgba(0,0,0,0)"],
                data:[score, filler]
            }]
        }
        
    }
    plugins={[{
        id: 'doughnut-center-text',
        beforeDraw: function(chart) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
        
            ctx.restore();
            var fontSize = (height / 114).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
        
            var text = `${score}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
        
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
      }]}
      options={
          options
      }
    />
}