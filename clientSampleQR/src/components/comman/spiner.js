import React from 'react'
import spinner from './91.gif';
import '../css/spiner.css';
export default function spiner() {
    return (
        <div className="spinner-main pl-0 pr-0">
            <img  className="imgspiner"
             src = {spinner}
             alt = "loading..."
             />
        </div>
    )
}
