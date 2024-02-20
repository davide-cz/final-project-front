import axios from "axios";
import { useEffect, useState } from "react"
import MusicianCard from "../components/MusicianCard";
import { useUser } from "../contexts/UserContext";
import { axiosOpts } from "../Ut/axiosOpt";
import SearchBar from "../components/SearchBar";

export default function (){

    const {token}=useUser()
    
    const {VITE_URI}=import.meta.env
    const {VITE_VERCEL_URI}=import.meta.env
    
    const [musiciansArray,setMusiciansArray]=useState([]);
    const [instrumentsArray,setInstrumentsArray]=useState([]);
    const [filteredArray,setFilteredArray]=useState([]);
    
    const [searchValue,setSearchValue] =useState('')

//chiamata di tutti gli annunci, all'inserimento di searchvalue,
//vengono filtrati i risultati per principal_instrument

    useEffect(()=>{
        axios.get(`${VITE_URI}/musicians`, axiosOpts(token))
        .then(res=>{setMusiciansArray(res.data)
            console.log(res.data)
            setFilteredArray(res.data
                .filter(mus=>mus.instrument.principal_instrument.includes(`${searchValue}`)))
        })
        .catch(error=>console.error(error))
    },[searchValue]);

    useEffect(()=>{
        axios.get(`${VITE_URI}/instruments`, axiosOpts(token))
        .then(res=>{
            setInstrumentsArray(res.data)})
        .catch(error=>console.error(error))
    }
    ,[filteredArray])
    //funzione che filtra i risultati per instrument
    const filterByInstrument=(inst)=>{
        setFilteredArray(musiciansArray
            .filter(mus=>mus.instrument.principal_instrument
                .includes(`${inst.principal_instrument}`)))

    }

    return (
        <>
            <h3 className="musicians-title">This is the Musicianspage</h3>
            <p className="subtitle">here you can find the inserction you looking for </p>
            <div className="searchbar">
                <SearchBar
                    onSearch={(searchValue)=>{setSearchValue(searchValue)}}
                    //search value definisce il valore che andrà a definire
                    //queries di ricerca 
                />
            </div>
            <div className="instrument-filter-buttons">
            {instrumentsArray.map((inst=>{
                //filtro i musicisti con i buttons che indicano lo strumento
                return(
                    <button className="filter-button"
                            key={`${inst.principal_instrument} ${inst.role}`}
                            onClick={()=>{
                                filterByInstrument(inst)}}
                            >
                            {`${inst.principal_instrument}-${inst.role}`}
                    </button>
                )
            }))}

            </div>
            <div className="musician-reel" >
                {filteredArray == [] ? musiciansArray.map(mus=>{
                    //se non c'è ancora un filtro mostro tutti gli annunci
                    //altrimenti i risultati filtrati
                    return(
                        <MusicianCard
                            key={mus._id}
                            id={mus._id}
                            name={mus.user?.user_name}
                            instrument={mus.instrument.principal_instrument}
                            genre={mus.genre}
                        />
                    )
                }):filteredArray.map(mus=>{
                    return(
                        <MusicianCard
                            key={mus._id}
                            id={mus._id}
                            name={mus.user?.user_name}
                            instrument={mus.instrument.principal_instrument}
                            genre={mus.genre}
                        />
                    )
                })
                }
            </div>
                <button onClick={()=>{
                    setFilteredArray(musiciansArray)
                }}
                >remove filter</button>
        </>
    )
}