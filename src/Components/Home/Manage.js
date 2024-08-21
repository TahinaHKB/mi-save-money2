import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./home.module.css";
import Navbar from "../navbars/Navbar";
import ModuleManage from "../Droite/ModuleManage";

const Manage = () => {
    return (
        <Fragment>
            <main className={`${s.parents} `}>
                <div className={`${s.gauche}  `}>
                  <Navbar />
                </div>
                <div className={`${s.droite} `}>
                  <ModuleManage />
                </div>
            </main>

        </Fragment>
    );
}

export default Manage;