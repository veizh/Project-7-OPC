import { useState } from "react";
import api from "../../api"
import { Deroulant,DeroulantBis} from "../About/About";

const Tag = (props)=>{
    return (
        <div className="tag">
            {props.tagName}
        </div>
    )
}
const Logement = (props)=>{
    let [image,setImage]=useState(0)
    const urlParams = new URLSearchParams(window.location.search)
    const itemId = urlParams.get('id');
    const item = api.find((e)=>e.id===itemId)
    
    function nextPhoto(i){
        const sizeArray = item.pictures.length
        if(image + i<0){
            setImage(sizeArray-1)
        
        }
        else if(image + i> sizeArray - 1){
            setImage(0)
        }
        else{
            setImage(image+i)
        }
    }
    const rate = parseInt(item.rating)
    return (
        <div className="containerLogemente">
            <div className="containerImg">
                <img src={item.pictures[image]} alt="chambre" />
                <div className="nav">
                    <img className="gauche" src="../fleche.svg" onClick={()=> nextPhoto(-1)} alt="fleche pointant à gauche" />
                    <img className="droite" src="../fleche.svg" onClick={()=> nextPhoto(1)} alt="fleche pointant à droite" />

                </div>
            </div>
            <div className="spaced">
            <div className="col">
                <div>
                    <div className="title">{item.title}</div>
                    <div className="location">{item.location}</div>
                
                    <div className="containerTag">
                        {item.tags.map((e)=><Tag key={e} tagName={e} />)}
                    </div>
                </div>
            </div>
            <div className="rateProfile">

                <div className="rating">
                    <img className="star" src={rate!==0?"../starFilled.svg":"../star.svg"} alt="etoile"/>
                    <img className="star" src={rate>1?"starFilled.svg":"../star.svg"}   alt="etoile"/>
                    <img className="star" src={rate>2?"starFilled.svg":"../star.svg"}   alt="etoile"/>
                    <img className="star" src={rate>3?"starFilled.svg":"../star.svg"}   alt="etoile"/>
                    <img className="star" src={rate===5?"starFilled.svg":"../star.svg"} alt="etoile"/>


                </div>
                <div className="profile">
                    <p>{item.host.name}</p>
                    <img src={item.host.picture} alt="photo de profil" />

                </div>
            </div>
            </div>
           <div className="containerInfo">
                <Deroulant key="desc" title="Description" content={item.description}/>
                <DeroulantBis key="equipement" title="Equipements" content={item.equipments} />

           </div>

        </div>
    )
}
export default Logement