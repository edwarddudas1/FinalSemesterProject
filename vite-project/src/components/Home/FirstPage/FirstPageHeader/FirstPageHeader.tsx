import "./style/FirstPageHeaderStyle.css"
import Logo from "./img/logo.png"

export default function FirstPageHeader() {
    return(
        <>
        <header>
            <img src={Logo} alt="logo" />
            <p className="title">InvestIQ</p>
        </header>
        </>
    )
}