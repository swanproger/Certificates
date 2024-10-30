import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { Cards } from "./components";

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    const response = await fetch(
      "https://sycret.ru/service/api/api?ApiKey=011ba11bdcad4fa396660c2ec447ef14&MethodName=OSGetGoodList",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении сертификатов");
        return { error: "Ошибка", result: null };
      })
      .finally(() => setIsLoading(false));
    const users = await response.json();
    setCards(users.data);
  }, []);

  useEffect(() => {
    fetchCards();
  }, []);
  console.log(cards);
  return (
    <div className="App">
      <Cards items={cards} isLoading={isLoading}></Cards>
    </div>
  );
}

export default App;
