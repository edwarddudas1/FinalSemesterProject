import { useEffect, useRef, useState, useCallback } from "react";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Імпорти зображень
import BigArrow from "./img/bigArrow.png";
import LeftArrow from "./img/leftArrow.png";
import RightArrow from "./img/rightArrow.png";
import Span from "./img/span.png";
import Products from "./img/Products.png";
import Coctail from "./img/Coctail.png";
import Kite from "./img/Kite.png";
import Heart from "./img/Heart.png";
import Car from "./img/Car.png";
import Couch from "./img/Couch.png";
import Instruments from "./img/Instruments.png";
import Invoice from "./img/Invoice.png";
import Clay from "./img/Clay.png";
import Book from "./img/Book.png";
import Ufo from "./img/Ufo.png";

import "./style/WastePageMainStyle.css";

Chart.register(...registerables, ChartDataLabels);

type TransactionType = "expense" | "income";

interface CardData {
  price: string;
  img: string;
  label: string;
}

const expenseCards1: CardData[] = [
  { price: "5 000.00", img: Products, label: "Продукти" },
  { price: "200.00", img: Coctail, label: "Алкоголь" },
  { price: "800.00", img: Kite, label: "Розваги" },
  { price: "900.00", img: Heart, label: "Здоров'я" },
  { price: "2 000.00", img: Car, label: "Транспорт" },
  { price: "1 500.00", img: Couch, label: "Все для дому" },
];

const expenseCards2: CardData[] = [
  { price: "800.00", img: Instruments, label: "Техніка" },
  { price: "2 200.00", img: Invoice, label: "Комуналка" },
  { price: "1 800.00", img: Clay, label: "Спорт" },
  { price: "2 400.00", img: Book, label: "Навчання" },
  { price: "3 000.00", img: Ufo, label: "Інше" },
];

const incomeCards: CardData[] = [
  { price: "10 000.00", img: Products, label: "Зарплата" },
  { price: "3 000.00", img: Ufo, label: "Фріланс" },
];

export default function WastePageMain() {
  const [transactionType, setTransactionType] = useState<TransactionType>("expense");
  const [direction, setDirection] = useState(1);
  const [month, setMonth] = useState(0);
  const [monthIndex, setMonthIndex] = useState(0);

  const months = ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"]

  
  const chartInstanceRef = useRef<Chart | null>(null);

  const changeMonth = (direction) => {
    if (direction === "next") {
      setMonthIndex((prev) => (prev + 1) % 12);
    } else {
      setMonthIndex((prev) => (prev - 1 + 12) % 12);
    }
  };

  // Callback ref для динамічного створення графіка
  const setChartRef = useCallback((node: HTMLCanvasElement | null) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (node) {
      const isExpense = transactionType === "expense";
      
      chartInstanceRef.current = new Chart(node, {
        type: "bar",
        data: {
          labels: isExpense 
            ? ["Свинина", "Гов'ядина", "Курятина", "Риба", "Паніні", "Кава", "Спагетті", "Шоколад", "Маслини", "Зелень"]
            : ["Моя", "Дружини"],
          datasets: [{
            backgroundColor: isExpense 
              ? ["#FF751D", "#FFDAC0", "#FFDAC0", "#FF751D", "#FFDAC0", "#FFDAC0", "#FF751D", "#FFDAC0", "#FFDAC0", "#FF751D"]
              : ["#FF751D", "#FFDAC0"],
            data: isExpense 
              ? [5000, 4500, 3200, 2100, 1800, 1700, 1500, 800, 500, 300]
              : [25000, 20000],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: "end",
              align: "top",
              color: "#000",
              font: { weight: "bold" },
              formatter: (value) => value + " грн",
            },
          },
          scales: {
            x: { grid: { display: false } },
            y: { 
              grid: { color: "#F5F6FB" },
              suggestedMax: isExpense ? 6000 : 30000, 
              grace: "15%" 
            },
          },
        },
      });
    }
  }, [transactionType]);
 return (
    <div className="WastePageMain">
      <div className="WastePageMainLine">
        <div className="WastePageMainLine-backToHome">
          <img src={BigArrow} alt="Back" />
          <Link to="/home2">Повернутись на головну</Link>
        </div>
        <div className="WastePageMainLine-balance">
          <p>Баланс:</p>
          <p>55 000.00 UAH</p>
          <button>підтвердити</button>
        </div>
        <div className="WastePageMainLine-period">
          <p>Поточний період</p>
          <div className="WastePageMainLine-period-sliderData">
            <img src={LeftArrow} onClick={() => changeMonth("prev")} alt="Prev" />
            <p>{months[monthIndex]}</p>
            <img src={RightArrow} onClick={() => changeMonth("next")} alt="Next" />
          </div>
        </div>
      </div>

      <div className="WastePageMainEarnAndWaste">
        <div className="WastePageMainEarnAndWaste-wasteLine">
          <p>Витрати:</p>
          <p>- 18 000.00 грн.</p>
        </div>
        <img src={Span} alt="separator" />
        <div className="WastePageMainEarnAndWaste-earnLine">
          <p>Доходи:</p>
          <p>+ 45 000.00 грн.</p>
        </div>
      </div>

      <div className="WastePageMainWasteContainer">
        <div className="WastePageMainWasteContainer-line">
          <div className="WastePageMainWasteContainer-line-button">
            <button onClick={() => { setDirection(-1); setTransactionType("expense"); }}>
              <img src={LeftArrow} alt="" />
            </button>
            <p className="transactions-title">
              {transactionType === "expense" ? "ВИТРАТИ" : "ДОХОДИ"}
            </p>
            <button onClick={() => { setDirection(1); setTransactionType("income"); }}>
              <img src={RightArrow} alt="" />
            </button>
          </div>
        </div>
 <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={transactionType}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="Slide-Wrapper"
          >
            {transactionType === "expense" ? (
              <div className="Expense-Slide">
                <div className="WastePageMainWasteContainer-Contcards-1">
                  {expenseCards1.map(({ price, img, label }) => (
                    <div key={label} className="WastePageMainWasteContainer-card">
                      <p>{price}</p>
                      <img src={img} alt={label} />
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
                <div className="WastePageMainWasteContainer-Contcards-2">
                  {expenseCards2.map(({ price, img, label }) => (
                    <div key={label} className="WastePageMainWasteContainer-card">
                      <p>{price}</p>
                      <img src={img} alt={label} />
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
                {/* Графік ВИТРАТ */}
                <div className="WastePageMainGraphic" style={{ height: "400px", marginTop: "40px" }}>
                  <canvas ref={setChartRef} />
                </div>
              </div>
            ) : (
              <div className="Income-Slide">
                <div className="WastePageMainWasteContainer-Contcards-1">
                  {incomeCards.map(({ price, img, label }) => (
                    <div key={label} className="WastePageMainWasteContainer-card">
                      <p>{price}</p>
                      <img src={img} alt={label} />
                      <p>{label}</p>
                    </div>
                  ))}
                </div>
                {/* Графік ДОХОДІВ */}
                <div className="SecondWastePageMainGraphic" style={{ height: "400px", marginTop: "40px" }}>
                  <canvas ref={setChartRef} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}