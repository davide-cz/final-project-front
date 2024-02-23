import { Link, NavLink, useNavigate } from "react-router-dom";
import SingleMusician from "../pages/SingleMusician";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { axiosOpts } from "../Ut/axiosOpt";

export default function ({id, genre, pricing, name, instrument }){



   


    return(
        <>
            <div className='musician-card'>
                <Link to={`/musicians/${id}`}>  
                        <figure className="thumbnail">
                            <img src="https://source.unsplash.com/random/350x200?musician" alt="rndm img" />
                            
                        </figure>
                        <div className="profile-part">
                            <figure className="prof-pic">
                                <img src="https://source.unsplash.com/random/50x50?portrait" alt="" />
                            </figure>
                            <div className="info-profile">
                                <h4 className="name-card">
                                        {name}
                                </h4>
                                <p>{instrument} - {pricing} €/h</p>
                                <p className="genre">{genre}</p>
                                
                            
                            </div>
                        </div>
                </Link>
                
            </div>

        </>
    )
}