import { Link } from "react-router-dom";

export default function (){
    return (
        <>
            <h3>This is AboutPage</h3>
            <p>
              what you searching cannot be found...
            </p>
            <button>
                <Link to={'/'}>
                    HomePage
                </Link>
            </button>
        </>
    )
}