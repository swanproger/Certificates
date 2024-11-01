import "./style/CardsContainer.css";
import { Skeleton } from "./Skeleton";
import { Card } from "./Card";
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCert } from "../store/certificatesSlice";
import BuyPage from "../BuyPage";
import Plug from "./Plug";

export const CardsContainer = ({ isLoading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [buyForm, setBuyForm] = useState(false);
  const [plugFlag, setPlugFlag] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.certificates);

  function createModal(
    name,
    discount,
    summa,
    id,
    price,
    primaryKey,
    tableName
  ) {
    dispatch(
      setSelectedCert({
        name,
        discount,
        summa,
        id,
        price,
        primaryKey,
        tableName,
      })
    );
    setOpenModal(true);
  }

  return plugFlag ? (
    <Plug></Plug>
  ) : buyForm ? (
    <BuyPage setBuyForm={setBuyForm} setPlugFlag={setPlugFlag}></BuyPage>
  ) : (
    <div className="content" id="content">
      <h1>Покупка сертификата</h1>
      <p>Выберите сертификат:</p>
      <div className="cards-container">
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          store.certs.map((cert) => (
            <Card {...cert} key={cert.id} openModal={createModal}></Card>
          ))
        )}
      </div>
      {openModal ? (
        <Modal setOpen={setOpenModal} setBuyForm={setBuyForm}></Modal>
      ) : null}
    </div>
  );
};
