import { useEffect, useState, useCallback } from "react";
import { CardsContainer } from "./components/CardsContainer";
import { useDispatch } from "react-redux";
import { setCerts } from "./store/certificatesSlice";

function App() {
  const dispatch = useDispatch();
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
      .then(async (res) => {
        const certs = await res.json();
        if (certs.result !== 0) {
          alert("Ошибка сервера");

          return null;
        }

        return certs.data;
      })

      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении сертификатов");
        return null;
      })

      .finally(() => setIsLoading(false));

    if (!response) {
      return;
    }

    dispatch(setCerts(response));
  }, []);

  useEffect(() => {
    fetchCards();
  }, []);

  return <CardsContainer isLoading={isLoading}></CardsContainer>;
}

export default App;
