import { useEffect, useRef, useState } from "react";
import "./App.css";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import bear from "./assets/bear.gif";
import music from "./assets/happy-happy-happpy-peter-griphin.mp3";
import CustomParticles from "./components/customParticles.jsx";
import { motion } from "framer-motion";
import { AnimatedText } from "./components/animatedText.jsx";

function App() {
  const [activeGif, setActiveGif] = useState(bear);
  const [activeYes, setActiveYes] = useState(false);
  const [answer, setAnswer] = useState("❤️ Хапи Хапи Хапи ❤️");
  const [countNo, setCountNo] = useState(0);
  const [statistic, setStatistic] = useState(false);
  const [timeDifference, setTimeDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startDate = useRef(new Date("2024-08-09T00:00:00")).current;
  const audioRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const differenceInMs = now - startDate;

      const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((differenceInMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((differenceInMs / (1000 * 60)) % 60);
      const seconds = Math.floor((differenceInMs / 1000) % 60);

      setTimeDifference({ days, hours, minutes, seconds });
    };

    calculateTimeDifference();

    const interval = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const handleYesPress = async () => {
    audioRef.current.play();
    setActiveYes(true);
    setActiveGif(
      "https://www.anekdot.ru/i/caricatures/normal/24/3/15/1710505272.gif",
    );
    setTimeout(() => {
      setActiveGif(
        "https://99px.ru/sstorage/86/2019/07/image_861007190943094997610.gif",
      );
      setAnswer("Это Мыы ❤️");
    }, 5000);
  };

  const question = [
    "Ты Будешь моей валентинкой ?",
    "А может подумаешь ?",
    "Ты не пожалеешь",
  ];
  const handleReject = () => {
    if (countNo + 1 >= question.length) {
      setCountNo(0);
    } else {
      setCountNo((count) => count + 1);
    }
  };

  const handleLovePress = () => {
    if (!statistic) {
      setStatistic(true);
    } else {
      audioRef.current.play();
    }
  };

  return (
    <>
      <div className={"main"}>
        <div className={"content"}>
          {statistic ? (
            <div className={"dateContainer"}>
              <p className={"description"}>
                С момента нашей первой встречи прошло уже
              </p>
              <p className={"date"}>
                {timeDifference.days} дней, {timeDifference.hours} часов,{" "}
                {timeDifference.minutes} минут, {timeDifference.seconds} секунд
              </p>
              <img
                src={
                  "https://giffun.ru/wp-content/uploads/2022/12/108c2257683620292f4687262f26e872.gif"
                }
                alt=""
                width={350}
                height={300}
              />
              <AnimatedText text={"Я люблю тебя"} className={"loveText"} />
            </div>
          ) : (
            <>
              <p className={"title"}>
                {activeYes ? answer : question[countNo]}
              </p>
              <img src={activeGif} alt="" width={350} height={300} />
              <div
                className={"btnContainer"}
                style={{
                  opacity: activeYes ? 0 : 1,
                  justifyContent: countNo === 2 ? "center" : "space-between",
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className={"button"}
                  onClick={handleYesPress}
                  style={{ marginLeft: countNo === 2 && 60 }}
                >
                  {countNo === 2 ? "Ну ладно ❤️" : "Даа ❤️"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className={"button"}
                  onClick={handleReject}
                  style={{ scale: countNo === 2 ? 0 : countNo === 1 ? 0.5 : 1 }}
                  disabled={countNo === 2}
                >
                  Нет
                </motion.button>
              </div>
            </>
          )}
          {activeYes && (
            <div
              className={"btnActiveContainer"}
              style={{ opacity: activeYes ? 1 : 0 }}
            >
              <motion.button
                whileTap={{ scale: 0.85 }}
                className={"button"}
                onClick={handleLovePress}
              >
                {statistic ? "И я люблю тебя ❤️" : "Сюрприз"}
              </motion.button>
            </div>
          )}
        </div>
      </div>
      <div>
        <audio src={music} ref={audioRef} />
      </div>
      <CustomParticles />
    </>
  );
}

export default App;
