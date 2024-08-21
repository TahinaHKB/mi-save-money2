import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
// import {Data} from "./Data";
import LineChart from "./LineChart";
import { useCart } from "react-use-cart";

Chart.register(CategoryScale);

export default function Graphe() {
  const { items, setItems} = useCart();
  let Data = [];
  const [goal] = useState(JSON.parse(localStorage.getItem('Goal')))
  useEffect(()=>{
    const savedCart = JSON.parse(localStorage.getItem("Action"));
    if(savedCart)
    {
        setItems(savedCart);
    }
}, []);
let diffDay = Math.round((new Date(goal.date).getTime()-new Date(goal.dateInit).getTime())/(1000*60*60*24));
let money = 0;
for (let i =0; i<=diffDay ; i++)
{
  items.forEach((action)=>{
    let diff = Math.round((new Date(action.date).getTime()-new Date(goal.dateInit).getTime())/(1000*60*60*24));
    if(diff===i)
    {
      if(action.type==="Depense")
        money -= parseInt(action.money);
      else 
        money += parseInt(action.money);
    }
    else 
    {
      let goalDateInit = new Date(goal.dateInit);
      let day = 60*60*24*1000;
      diff = Math.round((new Date(goalDateInit.getTime()+day*i).getTime()-new Date(action.date).getTime())/(1000*60*60*24));
      if(action.frequence !== 0 && diff % action.frequence === 0 )
      {
        if(action.type==="Depense")
          money -= parseInt(action.money);
        else 
          money += parseInt(action.money);
      }
    }
  })
  Data.push({
    money : money,
    day : i
  });
}

  const [chartData] = useState({
    labels: Data.map((data) => data.day), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.money),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "blue",
        borderWidth: 2
      }
    ]
  });

  return (
    <div className="App">
      <LineChart chartData={chartData} />
    </div>
  );
}