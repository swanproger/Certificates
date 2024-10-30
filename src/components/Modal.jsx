import "./Modal.css";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

export default function Modal({ open, setOpen, setBuyForm }) {
  const dialog = useRef();
  const store = useSelector((store) => store.sertificate);
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function onChoose() {
    setOpen(false);
    setBuyForm(true);
  }

  return (
    <dialog ref={dialog}>
      <img
        src="close.png"
        alt="кнопка закрыть"
        className="closeBtn"
        onClick={() => {
          setOpen(false);
        }}
      ></img>
      <p className="dialogText">Выбранный сертификат:</p>
      {store.params.name}
      <p className="dialogText">Скидка:</p>
      {Math.round(store.params.discount)}%<p className="dialogText">Итого:</p>
      {store.params.summa}
      <br></br>
      <button className="dialogBtn" onClick={onChoose}>
        Перейти к оформлению
      </button>
    </dialog>
  );
}
