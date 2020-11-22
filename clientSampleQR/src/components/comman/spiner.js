import React from 'react'
import spinner from './91.gif';
import '../css/spiner.css';
export default function spiner() {
    return (
        <div className="spinner-main">
            <img  className="imgspiner"
             src = {spinner}
             alt = "loading..."
             />
        </div>
    )
}
