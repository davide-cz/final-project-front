import { Link, NavLink } from "react-router-dom";
import SingleMusician from "../pages/SingleMusician";

export default function ({id, genre, description, name, instrument }){
    return(
        <>  
            <div className='musician-card'>
                <figure className="thumbnail">
                    <img src="https://source.unsplash.com/random/350x200?musician" alt="rndm img" />
                </figure>
                <div className="profile-part">
                    <figure className="prof-pic">
                        <img src="https://source.unsplash.com/random/50x50?portrait" alt="" />
                    </figure>
                    <div className="info-profile">
                        <h4 className="name-card">
                            <Link to={`/musicians/${id}`}>
                                {name}
                            </Link>
                        </h4>
                        <p>{instrument} - {genre}</p>
                       
                    </div>
                </div>
            </div>

        </>
    )
}