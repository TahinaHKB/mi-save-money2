import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./home.module.css";
import Navbar from "../navbars/Navbar";
import Droite from "../Droite/Droite";

const Home = () =>
{
    return (
        <Fragment>
            <main className={`${s.parents} `}>
                <div className={`${s.gauche}  `}>
                  <Navbar />
                </div>
                <div className={`${s.droite} `}>
                   <Droite/>
                </div>
            </main>

        </Fragment>
    );
}

export default Home;