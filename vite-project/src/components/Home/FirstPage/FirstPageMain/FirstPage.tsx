import { useState } from "react"
import Google from "./img/google-symbol 1.png"
import  "./style/FirstPageStyle.css"
import { useNavigate } from "react-router-dom";

export default function FirstPageMain() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");


    const navigate = useNavigate();


    function saveUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ email, password });

    localStorage.setItem("users", JSON.stringify(users));
    }


    function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Успішний вхід!");
        localStorage.setItem("isAuth", "true"); // для перевірки авторизації
        return true;
    } else {
        alert("Невірний логін або пароль");
        return false;
    }
    }

    function handleRegisterAndLogin() {
    if (!email) {
        setEmailError("Введіть email");
        return;
    } else {
        setEmailError("");
    }

    if (!password) {
        setPasswordError("Введіть пароль");
        return;
    } else {
        setPasswordError("");
    }

    saveUser(email, password); // зберегли

    const success = loginUser(email, password); // пробуємо зайти

    if (success) {
        navigate("/home");
    }
}

    function handleLogin() {
    if (!email || !password) {
        alert("Введіть дані");
        return;
    }

    const success = loginUser(email, password);

    if (success) {
        navigate("/home");
    }
}


    return(
        <>
        <main>
            <div className="container-title">
                <h1>InvestIQ</h1>
                <p>Smart Finance</p>
            </div>
            <div className="register-modal">
                <div className="register-by-google">
                    <p>Ви можете авторизуватися за допомогою акаунта Google</p>
                    <button><img src={Google} alt="google" /> Google</button>
                    <p>Або увійти за допомогою ел. пошти та праолю після реєстрації</p>
                </div>
                <div>
                    <div className="register-mail">
                        <p>Електронна пошта:</p>
                        <input type="text" 
                            placeholder="your@email.com" value={email}
                            onChange={(e)=>setEmail(e.target.value)}/>
                            {emailError && <span className="error">{emailError}</span>}
                    </div>

                    <div className="register-password">
                        <p>Пароль:</p>
                        <input type="text" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>
                        {passwordError && <span className="error">{passwordError}</span>}
                    </div>

                    <div className="register-buttons">
                        <button onClick={handleLogin}>Увійти</button>
                        <button onClick={handleRegisterAndLogin}>
                            Реєстрація + Вхід
                        </button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}