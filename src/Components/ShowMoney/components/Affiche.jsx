import React, {useState, useEffect} from "react";
import './style.css';
import { NavLink } from 'react-router-dom';
import { useCart } from "react-use-cart";
export const AfficheMoney = () => {
  const { items, setItems} = useCart();
  const [goal] = useState(JSON.parse(localStorage.getItem('Goal')))
  useEffect(()=>{
    const savedCart = JSON.parse(localStorage.getItem("Action"));
    if(savedCart)
    {
        setItems(savedCart);
    }
}, []);
let diffDay = Math.round((new Date().getTime()-new Date(goal.dateInit).getTime())/(1000*60*60*24));
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
      console.log(diff);
      if(action.frequence !== 0 && diff % action.frequence === 0 )
      {
        if(action.type==="Depense")
          money -= parseInt(action.money);
        else 
          money += parseInt(action.money);
      }
    }
  })
}
  return (
    <div className="affiche">
      <h2>Total Balalance</h2>
      <h1>Jour {diffDay} : {money} Ar</h1>
      <div className="a">
        <ul>
          <li className="li1 a1"> <NavLink to="/">Save Money</NavLink></li>
          <li className="li2 a1"> <NavLink to="/">Reinitialiser</NavLink></li>
        </ul>
      </div>
    </div>
  );
};
