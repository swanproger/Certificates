import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHumanData } from "./store/certificatesSlice";
import "./style/BuyPage.css";
import IMask from "imask";

export default function BuyPage({ setBuyForm, setPlugFlag }) {
  const store = useSelector((store) => store.certificates);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(setHumanData({ name, value }));
  }

  function fomatNumber(num) {
    return num.replace(/\D/g, "").slice(1);
  }

  const submitForm = useCallback(async () => {
    const response = await fetch("https://sycret.ru/service/api/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ApiKey: "011ba11bdcad4fa396660c2ec447ef14",
        MethodName: "OSSale",
        Id: store.selectedCert.id,
        TableName: store.selectedCert.tableName,
        PrimaryKey: store.selectedCert.primaryKey,
        Price: store.selectedCert.price,
        Summa: store.selectedCert.summa,
        ClientName: store.humanData.name,
        Phone: fomatNumber(store.humanData.phone),
        Email: store.humanData.email,
        PaymentTypeId: "2",
        UseDelivery: "0",
        IsGift: "0",
        MsgText: store.humanData.message,
        PName: "",
        PPhone: "",
      },
    })
      .then(async (res) => {
        const restData = await res.json();
        if (restData.result !== 0) {
          alert("Ошибка сервера");

          return null;
        }

        return restData;
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при отправке данных");
        return null;
      });

    if (!response) {
      return;
    }
    setPlugFlag(true);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (
      store.humanData.name === "" ||
      store.humanData.phone === "" ||
      store.humanData.mail === ""
    ) {
      setError(true);

      return;
    }
    submitForm();
  }
  let elements = document.getElementsByClassName("phone-input");
  for (let i = 0; i < elements.length; i++) {
    new IMask(elements[i], {
      mask: "+{7}(000)000-00-00",
    });
  }

  return (
    <div className="buy-page">
      <div className="buy-page__content">
        <div className="main-span">
          <span>{store.selectedCert.name}</span>
        </div>
        <form className="buy-page__form" onSubmit={handleSubmit}>
          <span>ФИО*</span>
          <input
            style={{
              border: error && !store.humanData.name ? "2px solid red" : null,
            }}
            type="name"
            placeholder="Введите...."
            name="name"
            className="reginput"
            value={store.humanData.name}
            onChange={handleChange}
          ></input>
          <span>Телефон*</span>
          <input
            style={{
              border: error && !store.humanData.phone ? "2px solid red" : null,
            }}
            type="tel"
            placeholder="+7(999)-999-99-99"
            inputMode="numeric"
            name="phone"
            className="phone-input"
            value={store.humanData.phone}
            onChange={handleChange}
          ></input>
          <span>Сообщение</span>
          <input
            type="text"
            placeholder="Введите...."
            name="message"
            className="reginput"
            value={store.humanData.massage}
            onChange={handleChange}
          ></input>
          <span>Почта*</span>
          <input
            style={{
              border: error && !store.humanData.mail ? "2px solid red" : null,
            }}
            type="email"
            placeholder="Введите...."
            name="email"
            className="reginput"
            value={store.humanData.mail}
            onChange={handleChange}
          ></input>
          <div className="buy-page__btns">
            <button
              onClick={() => setBuyForm(false)}
              className="buy-page__btn back"
            >
              Назад
            </button>
            <button type="submit" className="buy-page__btn buy">
              Перейти к оплате
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
