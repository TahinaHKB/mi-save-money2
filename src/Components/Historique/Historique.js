import React from 'react';
import './Historique.css';
export function Historique({actions, removeAction}) {
    const data = actions.map((d)=>{
        const date = new Date(d.date);
        console.log(date.toString());
        return(
            <tr key={d.id}>
                <td>{d.title}</td>
                <td>{d.money}</td>
                <td>{d.type}</td>
                <td>{d.frequence}</td>
                <td>{date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()}</td>
                <td><button onClick={()=> removeAction(d.id)}>X</button></td>
            </tr>
        )
    })

    const show = data.length > 0 ? 
        data : <p>Vous n'avez aucun Action</p>

    return (
        <div id='Liste'>
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Money (Ar) </th>
                        <th>Type</th>
                        <th>Frequence (j) </th>
                        <th>Date</th>
                        <th>Supprimer</th>
                    </tr>
                    {show}
                </table>
        </div>
    );
}