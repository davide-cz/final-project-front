import { Link } from "react-router-dom";

export default function (){
    return (
        <>
            <h3>what you searching cannot be found here...</h3>
            <button>
                <Link to={'/'}>
                    HomePage
                </Link>
            </button>
        </>
    )
}