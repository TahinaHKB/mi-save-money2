
import { AfficheMoney } from './components/Affiche';
import { Devise } from './components/Devise';
import "./components/style.css";

function ShowMoney() {
    return (
        <div className='body'>

            <AfficheMoney></AfficheMoney>
            <h4  className='h2'>Economiser de l'argent aujourd'hui, c'est investir dans la securité de demain</h4>
            <Devise></Devise>
        </div>
    );

}

export default ShowMoney;
