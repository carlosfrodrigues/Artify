import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'
import './styles.css'
import Notifications, {notify} from 'react-notify-toast';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        if(pwd.length < 6){
            notify.show("The password needs 6 characters or more!", "custom", 3000, 
                { background:   '#f0ad4e '  , text: "#FFFFFF" }
            );              
            return;
        }
        const data = {
            name,
            email,
            pwd,
            whatsapp,
            city,
            uf
        };
        try{
            await api.post('creators', data);
            notify.show("Success: New account created!", "custom", 3000, 
                { background:   '#5cb85c'  , text: "#FFFFFF" }
            );
            setTimeout(() => {
                history.push('/');
              }, 3000);        
        }catch{
            notify.show("Error: Couldn't create new acount!", "custom", 3000, 
                { background:   '#d9534f'  , text: "#FFFFFF" }
            );  
        }
    }

    return(
        <div className="register-container">
            <Notifications />
            <div className="content">
                <section>
                    <img src={logoImg} alt="connect" />
                    <h1>Sign Up</h1>
                    <p>Sign Up and be part of this great Art Network where you can share your Art Profile </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E0241" />
                        Back to Home
                        </Link>
                </section>
            <form onSubmit={handleRegister}>
                <input placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                 />

                <input type="email" placeholder="E-mail"                
                value={email}
                onChange={e => setEmail(e.target.value)} 
                />
                <input type="password" placeholder="Password"                
                value={pwd}
                onChange={e => setPwd(e.target.value)} 
                />
                <input  placeholder="Telephone Number" 
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)} 
                />
            <div className="input-group">
            <input placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
            />
            <input placeholder="DIST" style={ { width: 90} }
                value={uf}
                onChange={e => setUf(e.target.value)}
            />
            </div>
            <button className="button" type="submit">Sign Up</button>
            </form>
            </div>
        </div>
    );
}