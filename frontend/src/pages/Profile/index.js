import React, {useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import {FiLogOut, FiTrash2, FiEdit, FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
import Notifications, {notify} from 'react-notify-toast';
import Modal from 'react-modal';

import "./styles.css"
export default function Profile(){
    const creatorName = localStorage.getItem('creatorName');
    const token = localStorage.getItem('token');
    const [arts, setArts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const [idSelected, setIdSelected ] = useState();
    const [titleSelected, setTitleSelected] = useState();
    const [descriptionSelected, setDescriptionSelected] = useState();
    const [valueSelected, setValueSelected] = useState();
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    useEffect(()=> {
        api.get('profile', {
            headers: {
                'x-access-token': token,
            }
        }).then(res => {
            setArts(res.data);
        });
    }, [token]);

    async function handleEdit(e){
        e.preventDefault();
        console.log(idSelected);
        console.log(titleSelected);
        let data = {
            "title": titleSelected,
            "description": descriptionSelected,
            "value": valueSelected
        }
        try{
            await api.put(`arts/${idSelected}`, data, {
                headers:{
                    'x-access-token': token,
                }
            })
            setArts(arts.map(function(art){
                if(art.id === idSelected){
                    data["imgpath"] = art.imgpath;
                    return data;
                }else{
                    return art;
                }
            }));
            setShowModal(false);           
            notify.show("Success: Artwork updated!", "custom", 3000, 
            { background:   '#5cb85c'  , text: "#FFFFFF" }
            );  

        } catch(err){
            notify.show("Error: Couldn't update artwork!", "custom", 3000, 
                { background:  '#d9534f' , text: "#FFFFFF" }
            );
        }
    }

    async function handleDeleteArt(id){
        try{
            await api.delete(`arts/${id}`,{
                headers:{
                    'x-access-token': token,
                }
            });

            setArts(arts.filter(art => art.id !== id));
        }catch{
            notify.show("Error: Coudn't delete the art! Try again", "custom", 3000, 
            { background:   '#d9534f'  , text: "#FFFFFF" }
        );  
        }
    }
    function handleCloseModal(){
        setShowModal(false);
    }
    function handleShowModal(art){
        setIdSelected(art.id);
        setTitleSelected(art.title);
        setDescriptionSelected(art.description);
        setValueSelected(art.value);
        setShowModal(true);
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <div className="profile-container">
            <Notifications />
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Welcome, {creatorName}</span>
                <Link className="button" to='/arts/new'> Register new art</Link>
                <button onClick ={handleLogout} type="button">
                    <FiLogOut size={18} color="#E02041" />
                </button>
            </header>

            <h1> Your Profile:</h1>
            <ul>
                {arts.map(art => (
                <li key={art.id}>
                <strong>Artwork:</strong>
                <p>{art.title}</p>
                <a target="_blank" rel="noopener noreferrer" href={'http://localhost:3333/img/'+art.imgpath}><img className="photo" src={'http://localhost:3333/img/'+art.imgpath} alt={art.id} /></a>
                <strong>Description:</strong>
                <p>{art.description}</p>
                <strong>Value:</strong>
                <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'USD'}).format(art.value)}</p>
                <button onClick={() => handleDeleteArt(art.id)}type="button">
                    <FiTrash2 size={20} color="#a8a8b3" />
                </button>
                <button onClick={() => handleShowModal(art)}type="button" style={{right: "60px"}}>
                    <FiEdit size={20} color="#a8a8b3" />
                </button>
            </li>
            
                ))}
            </ul>
            <Modal
                    style={customStyles} 
                    isOpen={showModal}
                    contentLabel="Edit Artwork Guideline"
                    onRequestClose={handleCloseModal}
                >               
                <button style={{ border:"none", backgroundColor:"transparent"}} onClick={handleCloseModal}type="button"><FiArrowLeft size={20} color="#a8a8b3" /></button>
                <h2 style={{marginTop:"5px"}}> Edit Artwork Guideline:</h2>
                <form onSubmit={handleEdit}>
                <input style={{marginTop:"20px"}}
                placeholder="Title"
                value={titleSelected}
                onChange={e => setTitleSelected(e.target.value)}
                 />
                <textarea style={{resize: "none", marginTop:"20px"}} placeholder="Description"
                value={descriptionSelected}
                onChange={e => setDescriptionSelected(e.target.value)}
                 />
                <input placeholder="Value"
                style={{marginTop:"20px"}}
                value={valueSelected}
                onChange={e => setValueSelected(e.target.value)}
                 />
                <button className="button" type="submit">Edit</button>
                </form>
                </Modal>
        </div>
    );
}