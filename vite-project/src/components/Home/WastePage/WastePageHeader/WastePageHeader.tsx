import logo from "./img/logo.png"
import User from "./img/User.png"
import "./style/WastePageHeaderStyle.css"

export default function WastePageHeader(){
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