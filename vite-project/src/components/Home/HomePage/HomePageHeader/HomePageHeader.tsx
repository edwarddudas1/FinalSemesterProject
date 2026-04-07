import logo from "./img/logo.png"
import User from "./img/User.png"
import "./style/HomePageHeaderStyle.css"

export default function HomeHeader(){
    return(
        <>
        <header>
            <div className="logoAndTitle">
                <img src={logo} alt="logo" />
                <h1>InvestIQ</h1>
            </div>

            <div className="interactionsHeader">
                <div className="UserLogo">
                    <img src={User} alt="user" />
                    <p>User Name</p>
                </div>
                <span></span>
                <a>Вийти</a>
            </div>
        </header>
        </>
    )
}