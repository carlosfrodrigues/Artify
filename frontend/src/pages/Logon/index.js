import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css'
import api from '../../services/api';
import ArtImg from '../../assets/art.png'
import logoImg from '../../assets/logo.svg'
import Notifications, {notify} from 'react-notify-toast';


export default function Logon(){
    const [email, setEmail] =useState('');
    const [pwd, setPwd] =useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const res = await api.post('sessions', {email, pwd});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('creatorName', res.data.name);
            history.push('/profile');

        }catch(err){
            notify.show("Error: Couldn't Sign in!", "custom", 3000, 
            { background:   '#d9534f'  , text: "#FFFFFF" }
        );  
        }
    }

    return(
        <div className="logon-container">
            <Notifications />
            <section className="form">
                <img src={logoImg} alt="be the hero" />
                <form onSubmit={handleLogin}>
                    <h1>Sign in </h1>
                    <input placeholder="e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                     />

                    <input placeholder="password" type="password"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                     />

                    <button className = "button" type="submit">Sign in</button>

                    <Link className = "back-link" to="/register">
                        <FiLogIn size={16} color="#E0241" />
                        Create an account
                        </Link>
                </form>
            </section>
            <img src={ArtImg} alt="artify"/>
        </div>
    );
}