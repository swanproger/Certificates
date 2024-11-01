import "./style/Modal.css";
import { useSelector } from "react-redux";

export default function Modal({ setOpen, setBuyForm }) {
  const store = useSelector((store) => store.certificates);

  function onChoose() {
    setOpen(false);
    setBuyForm(true);
  }

  return (
    <div className="modal-window">
      <img
        src="close.png"
        alt="кнопка закрыть"
        className="modal-window__btn__close"
        onClick={() => {
          setOpen(false);
        }}
      ></img>
      <p className="modal-window__text">Выбранный сертификат:</p>
      {store.selectedCert.name}
      <p className="modal-window__text">Скидка:</p>
      {Math.round(store.selectedCert.discount)}%
      <p className="modal-window__text">Итого:</p>
      {Math.round(store.selectedCert.summa)} руб
      <br></br>
      <button className="modal-window__btn" onClick={onChoose}>
        Перейти к оформлению
      </button>
    </div>
  );
}
