import React, { useEffect, useState } from "react";
import "./App.css";
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { getAllData } from "./service-http";
import "./style.css";

export default function Search() {
    const [state, setState] = useState({ animeList: [], searchVal: "", totalCount: 0 });
    async function pullAllData() {
        let data = await getAllData("", "", state.searchVal);
        console.log(data);
        setState((st) => ({ ...st, animeList: data.data.data || [], totalCount: data.data.pagination.items.total }));
    }

    useEffect(() => {
        pullAllData();
    }, []);

    const inputChangeHandle = (e) => {
        setState((st) => ({ ...st, searchVal: e.target.value }));
    };

    const handleSubmit = () => {
        pullAllData();
    };
    return (
        <>
            <div>
                <div className='App-header'>
                    <h1> search anime characters</h1>
                </div>
                <div className='input-group '>
                    <div>
                        <form>
                            <AiOutlineSearch fontSize={40} className='searchimg' />
                            <input
                                type='text'
                                className=' search-bar form-control '
                                placeholder='Search your anime'
                                aria-label=''
                                aria-describedby='basic-addon1'
                                name='searchVal'
                                onChange={inputChangeHandle}
                            />
                        </form>
                    </div>
                    <div>
                        <button className='btn btn-primary' type='button' onClick={handleSubmit}>
                            Search
                        </button>
                    </div>
                </div>
                <p className='totalsearch'>Total {state.totalCount} matching anime found</p>
                <hr />
                <table>
                    <tr></tr>
                </table>
            </div>
            {state.animeList.map((p) => {
                return (
                    <div className='maindiv'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img className='img-thumbnail' src={`${p.images.webp.image_url}`} />
                                    </td>
                                    <td>
                                        {p.name} <br />
                                        {p.nicknames}
                                    </td>
                                    <td className='likes'>
                                        <AiFillHeart className='Heart' /> {p.favorites}
                                    </td>
                                       <td className='enter' style={{textAlign:"center"}}>
                                       <a href={`${p.url}`} target="_blank" style={{textDecoration:"none", color:"black" , cursor:"pointer" , }}>
                                        <FaArrowRight  style={{fontSize:40}}/>
                                       </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );
}
