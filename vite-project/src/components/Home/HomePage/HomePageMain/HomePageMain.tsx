
import Graphic from "./img/graphic.png"
import Calendar from "./img/calendar.png"
import Calculator from "./img/calculator.png"
import Arrow from "./img/arrow.png"
import { Link } from "react-router-dom";


import "./style/HomePageMainStyle.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function HomeMain() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({
    desc: "",
    category: "",
    amount: ""
  })
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")

  const categories = [
    "Транспорт",
    "Продукти",
    "Здоров’я",
    "Алкоголь",
    "Розваги",
    "Все для дому",
    "Техніка",
    "Комуналка, зв’язок",
    "Спорт, хобі",
    "Навчання",
    "Інше"
  ]
  const [transactionType, setTransactionType] = useState("expense")

    const addRow = () => {
    if (!form.desc || !form.category || !form.amount) return;

    const newRow = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        ...form,
        amount: parseFloat(form.amount),
        type: transactionType
    }

    setRows([...rows, newRow])
    setForm({ desc: "", category: "", amount: "" })
    setSelectedCategory("")
    }

    const totalBalance = rows.reduce((sum, row) => {
      if (row.type === "expense") {
        return sum - row.amount
      } else {
        return sum + row.amount
      }
    }, 50000)

  useEffect(() => {
    const handleClick = () => setIsOpen(false)
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])


  return (
    <main className="main">
      <div className="balance">
        <div className="left"></div>

        <div className="balanceSection">
          <p>Баланс: </p>
          <div className="balanceValue">{totalBalance.toFixed(2)}  UAH</div>
          <button>ПІДТВЕРДИТИ</button>
        </div>

        <div className="reportSection">
          <Link to="/waste">Перейти до розрахунків</Link>
          <img src={Graphic} alt="graphic" />
        </div>
      </div>

      <div className="transactions">
        <div className="transactions-mainLine">
          <div className="transactions-buttons">
            <button
                onClick={() => setTransactionType("expense")}
                style={{
                backgroundColor: transactionType === "expense" ? "#FEFEFE" : "#FAFBFD",
                color: transactionType === "expense" ? "#FF751D" : "#000"
                }}
            >
                Витрати
            </button>
            <button
                onClick={() => setTransactionType("income")}
                style={{
                backgroundColor: transactionType === "income" ? "#FEFEFE" : "#FAFBFD",
                color: transactionType === "income" ? "#FF751D" : "#000"
                }}
            >
                Дохід
            </button>
            </div>

          <div className="transactions-form">
            <div className="transactions-form-calendar">
              <img src={Calendar} alt="calendar" />
              <p>{new Date().toLocaleDateString()}</p>
            </div>

            <div className="transactions-form-input">
              {/* Опис товару */}
              <input
                type="text"
                placeholder="Опис товару"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />

              {/* Dropdown для категорії */}
              <div
                className="transactions-form-input-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="transactions-form-input-dropdown-header"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedCategory || "Категорія товару"}
                  <img src={Arrow} alt="arrow" />
                </div>

                {isOpen && (
                  <div className="dropdown-list">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCategory(cat)
                          setForm({ ...form, category: cat })
                          setIsOpen(false)
                        }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Сума */}
              <div className="transactions-form-input-calculator">
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                />
                <img src={Calculator} alt="calculator" />
              </div>
            </div>

            <div className="transactions-writeAndclear">
              <button type="button" onClick={addRow}>
                ввести
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ desc: "", category: "", amount: "" })
                  setSelectedCategory("")
                }}
              >
                Очистити
              </button>
            </div>
          </div>

          <div className="transactions-graphicsSummary">
            <div className="transactions-graphic">
              <div className="transactions-graphic-header">
                <div>ДАТА</div>
                <div>ОПИС</div>
                <div>КАТЕГОРІЯ</div>
                <div>СУМА</div>
                <div></div>
              </div>

              <div className="transactions-graphic-body">
                {rows.map((row) => (
                  <div
                    className="transactions-graphic-body-row"
                    key={row.id}
                  >
                    <div>{row.date}</div>
                    <div>{row.desc}</div>
                    <div>{row.category}</div>
                    <div className="transactions-graphic-body-row-minus" 
                        style={{ color: row.type === "expense" ? "red" : "green" }}>
                        {row.type === "expense" ? "-" : "+"} {row.amount} грн.
                    </div>
                    <div
                      className="transactions-graphic-body-row-delete"
                      onClick={() =>
                        setRows(rows.filter((r) => r.id !== row.id))
                      }
                    >
                      🗑️
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="transactions-summary">
              <div className="transactions-summary-header">
                <div>ЗВЕДЕННЯ</div>
              </div>
              <div className="transactions-summary-body">
                <div className="transactions-summary-body-row">
                  {["листопад","жовтень","вересень","серпень","липень","червень"].map(
                    (month, idx) => (
                      <div key={month}>
                        <p>{month}</p>
                        <p>0.00</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}