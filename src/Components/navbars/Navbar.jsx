import React, { Fragment } from 'react'
import s from "./navbar.module.css"
import { AiFillAccountBook } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { LuBadgeHelp } from "react-icons/lu";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { TbPigMoney } from "react-icons/tb";

export default function Navbar() {
    return (
        <Fragment>
            <div className={`${s.Parentsbar}  `}>

                <TbPigMoney className={`${s.logo}`} size={100} />
                <div className={`${s.liens} d-flex`}>
                    <NavLink to="/manage" className={(nav) => (nav.isActive ? s.active : s.Non_active) + ` ${s.linkhover} `} >
                        <AiOutlineHome size={40} />
                    </NavLink>
                    <NavLink to="/" className={(nav) => (nav.isActive ? s.active : s.Non_active) + ` ${s.linkhover} `} >
                        <FaMoneyBillTrendUp size={40} />
                    </NavLink>
                    <NavLink to="/manage" className={(nav) => (nav.isActive ? s.active : s.Non_active) + ` ${s.linkhover} `} >
                        <AiFillAccountBook size={40} />
                    </NavLink>
                    <NavLink to="/manage" className={(nav) => (nav.isActive ? s.active : s.Non_active) + ` ${s.linkhover} `} >
                        <LuBadgeHelp size={40} />
                    </NavLink>
                </div>



            </div>

        </Fragment>
    )
}
