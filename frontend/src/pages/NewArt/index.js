import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api'
import "./styles.css"
import Notifications, {notify} from 'react-notify-toast';

export default function NewArt(){
    const [title, setTitle] = useState('');
    const [image, setImage] = useState({preview: '', raw: ''});
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const token = localStorage.getItem('token');
    const history = useHistory();

    async function handleNewArt(e){
        e.preventDefault();
        if(image.raw === ''){

            notify.show("Error: no Image Found", "custom", 5000, 
                { background:  '#d9534f' , text: "#FFFFFF" }
            );
            return;
        }
        let fd = new FormData();
        fd.append('image', image.raw);
        fd.append('title', title);
        fd.append('description', description);
        fd.append('value', value);

        try{
            await api.post('arts', fd, {
                headers:{
                    'x-access-token': token,
                    'Content-Type': `multipart/form-data; boundary=${fd._boundary}`
                }
            })
            history.push('/profile');
        } catch(err){
            notify.show("Error: Couldn't register new art!", "custom", 3000, 
                { background:  '#d9534f' , text: "#FFFFFF" }
            );
        }
    }
    return(

        <div className="new-art-container">
            <Notifications />
            <div className="content">
                <section>
                    <img src={logoImg} alt="connect" />
                    <h1>Register a New Art</h1>
                    <p>Share your Collection with the public via the Art Connector</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E0241" />
                        Back to Profile
                        </Link>
                </section>
            <form onSubmit={handleNewArt}>
                <input 
                    placeholder="Artwork Name"
                    value={title}
                    onChange={e => setTitle(e.target.value)}

                />
                <input
                    type="file"
                    placeholder="Image"
                    className="custom-file-input"
                    accept="image/png, image/jpeg"
                    onChange={e => setImage({
                        preview: URL.createObjectURL(e.target.files[0]),
                        raw: e.target.files[0]
                      })}
                />
                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input  
                    placeholder="Value in U.S. Dollars"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            <button className="button" type="submit">Register</button>
            </form>
            </div>
        </div>
        
    );
}