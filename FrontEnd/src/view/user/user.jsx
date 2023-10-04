import './user.scss';
import EditName from '../../components/editName/editName';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import transactions from '../../data/transaction.json';
import Account from '../../components/account/account';

function User(){
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.isAuth);
    useEffect(() => {
        if(!token){
            navigate('/*')
        }
    })
        return (
            <main className="main bg-dark">
                <div className="header">
                    <EditName/>    
                </div>
                <h2 className="sr-only">Accounts</h2>
                { (transactions) ? transactions.transaction.map((transaction) => (
                    <Account key={transaction.id} title={transaction.title} amount={transaction.amount} description={transaction.description}/>
                )) : ""}                
            </main>
        )
            
}

export default User;