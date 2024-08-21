import React, { Fragment, useEffect, useState } from "react";
import s from "./droite.module.css"
import { Historique } from "../Historique/Historique";
import DatePicker from "react-datepicker";
import {v1 as uuidv1} from 'uuid';
import { useCart } from "react-use-cart";

const ModuleManage = (props) =>
{
    const [goal, setGoal] = useState({
        money : 0,
        date : new Date(),
        dateInit : new Date(),
        dateString : "",
        title : ""
    })

    const [realGoal, setRealGoal] = useState({
        money : 0,
        date : new Date(),
        dateInit : new Date(),
        dateString : "",
        title : "",
    })

    useEffect(()=>{
        updateGoal();
    }, []);

    const updateGoal = ()=>
    {
        const dataGoals = JSON.parse(localStorage.getItem('Goal'));
        if(dataGoals)
        {
            setRealGoal({...dataGoals, date:new Date(dataGoals.date)});
        }
    }

    const today = new Date();
    const showGoal = realGoal.title!==""?  
        <div>
            <h1>{realGoal.title}</h1>
            <p>{realGoal.money} Ar, avant le {realGoal.date.getDate()}-{realGoal.date.getMonth()+1}-{realGoal.date.getFullYear()}</p>

        </div>
        : <p>Aucun but n'est défini, vous devez en définir</p> ;

        const buttonGoal = goal.money > 0 && goal.date>today && goal.title!==""?
            <button>Sauvegarder</button> : <button disabled>Sauvegarder</button>

        const {title, date, money} = goal;

        const handleChangeGoal = (e) =>
        {
            setGoal({...goal, [e.target.id]:e.target.value});
        }

        const handleSubmitGoal = (e)=>
        {
            e.preventDefault();
            localStorage.setItem("Money", "0");
            localStorage.setItem('Goal', JSON.stringify(goal));
            updateGoal();
        }

        const { addItem, items, removeItem, setItems} = useCart();

        const [newAction, setNewAction] = useState({
            id:uuidv1(),
            title:"",
            date:new Date(),
            money:0,
            frequence:0,
            type:"Depense",
            price:0,
        })

        const handleChangeTypeAction = (e) =>
        {
            setNewAction({...newAction, type:e.target.value})
        }
        const handleChangeAction = (e)=>
        {
            setNewAction({...newAction, [e.target.id]:e.target.value});
        }
        const handleSubmitAction = (e)=>
        {
            e.preventDefault();
           setNewAction({...newAction, id:uuidv1()});
           addItem(newAction);

             if(newAction.type==="Depense")
                newAction.money = -newAction.money;

            let m = newAction.money+parseInt(userMoney);
             setUserMoney(m);
             localStorage.setItem('Money', userMoney);
        }

        const buttonAction = newAction.title !== "" && newAction.money > 0 ?
            <button>Ajouter</button> : 
            <button disabled>Ajouter</button>

        useEffect(()=>{
            localStorage.setItem("Action", JSON.stringify(items));
        }, [items]);

        useEffect(()=>{
            const savedCart = JSON.parse(localStorage.getItem("Action"));
            if(savedCart)
            {
                setItems(savedCart);
            }
        }, []);

        const [msg, setMsg] = useState();
        const [success, setSuccess] = useState(false);

        const [userMoney, setUserMoney] = useState(localStorage.getItem("Money"));

        const verificationGoal = () =>
        {
            let diffDay = Math.round((new Date(realGoal.date).getTime()-new Date(realGoal.dateInit).getTime())/(1000*60*60*24));
            let beneficeTotal = 0;
            for (let i =0; i<=diffDay ; i++)
            {
                items.forEach((action)=>{
                let diff = Math.round((new Date(action.date).getTime()-new Date(realGoal.dateInit).getTime())/(1000*60*60*24));
                if(diff===i)
                {
                    if(action.type==="Depense")
                    beneficeTotal -= parseInt(action.money);
                    else 
                    beneficeTotal += parseInt(action.money);
                }
            else 
            {
                let goalDateInit = new Date(realGoal.dateInit);
                let day = 60*60*24*1000;
                diff = Math.round((new Date(goalDateInit.getTime()+day*i).getTime()-new Date(action.date).getTime())/(1000*60*60*24));
                if(action.frequence !== 0 && diff % action.frequence === 0 )
                {
                    if(action.type==="Depense")
                    beneficeTotal -= parseInt(action.money);
                else 
                beneficeTotal += parseInt(action.money);
                }
            }
                })
            }

            if(beneficeTotal>=0)
            {
                setMsg("Avec vos revenues et vos depenses, le "+realGoal.date.getDate()+"-"+(realGoal.date.getMonth()+1)+"-"+realGoal.date.getFullYear()+", vous aurez "+beneficeTotal+" Ar");
            }
            else 
            {
                setMsg("Avec vos revenues et vos depenses, le "+realGoal.date.getDate()+"-"+(realGoal.date.getMonth()+1)+"-"+realGoal.date.getFullYear()+", vous aurez une dette de "+(-1*beneficeTotal)+" Ar");
            }

            if(beneficeTotal >= parseInt(realGoal.money))
            {
                setSuccess(true);
            }
            else 
            {
                setSuccess(false);
            }
        }

        useEffect(()=>{
            verificationGoal();
            localStorage.setItem('Money', userMoney);
        })

        return(
        <Fragment>
            <div className={`${s.header} d-flex`}>
                <h2>Mi-savemoney</h2>
            </div>
            <div className={`${s.basheader} p-4 `}>
                {showGoal}
                <form onSubmit={handleSubmitGoal}>
                    <input type="text" placeholder="title" id="title" value={title} onChange={handleChangeGoal}/>
                    <input type="number" placeholder="money" id="money" value={money} onChange={handleChangeGoal}/>
                    <DatePicker selected={date} onChange={(d)=> {
                        setGoal({...goal, date:d, dateString:date.getDay()+"-"+date.getMonth()+"-"+date.getFullYear()});
                    }} />
                    {buttonGoal}
                </form>
                {msg}
                {realGoal.title !== "" && success && <p>Vous atteindrez votre objectif "{realGoal.title}" en suivant votre plan</p>}
                {realGoal.title !== "" && !success && <p>Vous n'atteindriez pas votre objectif "{realGoal.title}", augmenter vos revenues ou diminuer vos dépenses</p>}
                <form onSubmit={handleSubmitAction}>
                    <input type="radio" value="Depense" checked={newAction.type==="Depense"} onChange={handleChangeTypeAction} /> Dépense
                    <input type="radio" value="Revenue" checked={newAction.type==="Revenue"} onChange={handleChangeTypeAction} /> Revenue
                    <input type="text" value={newAction.title} placeholder="Titre" id="title" onChange={handleChangeAction} />
                    <input type="number" value={newAction.money} placeholder="Valeur" id="money" onChange={handleChangeAction} />
                    <input type="number" value={newAction.frequence} placeholder="Frequence (jour)" id="frequence" onChange={handleChangeAction} />
                    <DatePicker selected={newAction.date} onChange={(d)=> {
                        setNewAction({...newAction, date:d});
                    }} />
                    {buttonAction}
                </form>
                <Historique removeAction={removeItem} actions={items}/>
            </div>
        </Fragment>
    )
}

export default React.memo(ModuleManage);