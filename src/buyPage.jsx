import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHumanData } from "./store/SertificateSlice";
import "./buyPage.css";
import IMask from "imask";

export default function ExecutionSertificate({ setBuyForm }) {
  const store = useSelector((store) => store.sertificate);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(setHumanData({ name, value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      store.humanData.name === "" ||
      store.humanData.number === "" ||
      store.humanData.mail === ""
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };
  let elements = document.getElementsByClassName("phoneInput");
  for (let i = 0; i < elements.length; i++) {
    new IMask(elements[i], {
      mask: "+{7}(000)000-00-00",
    });
  }
  return (
    <div className="buyPage">
      <div className="buyPage__content">
        <div className="mainSpan">
          <span>{store.params.name}</span>
        </div>
        <form className="buyPage__form" onSubmit={handleSubmit}>
          <span>ФИО*</span>
          <input
            style={{
              border: error && !store.humanData.name ? "1px solid red" : null,
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
              border: error && !store.humanData.number ? "1px solid red" : null,
            }}
            type="tel"
            placeholder="+7(999)-999-99-99"
            inputMode="numeric"
            name="number"
            className="phoneInput"
            value={store.humanData.number}
            onChange={handleChange}
            id="phoneInput"
          ></input>
          <span>Сообщение</span>
          <input
            type="text"
            placeholder="Введите...."
            name="massage"
            className="reginput"
            value={store.humanData.massage}
            onChange={handleChange}
          ></input>
          <span>Почта*</span>
          <input
            style={{
              border: error && !store.humanData.mail ? "1px solid red" : null,
            }}
            type="email"
            placeholder="Введите...."
            name="mail"
            className="reginput"
            value={store.humanData.mail}
            onChange={handleChange}
          ></input>
          <div className="buyPage__btns">
            <button
              onClick={() => setBuyForm(false)}
              className="buyPage__btn back"
            >
              Назад
            </button>
            <button type="submit" className="buyPage__btn buy">
              Перейти к оплате
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
