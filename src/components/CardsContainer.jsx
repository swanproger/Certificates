import "./style/CardsContainer.css";
import { Skeleton } from "./Skeleton";
import { Card } from "./Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCert } from "../store/certificatesSlice";
import BuyPage from "../BuyPage";
import Plug from "./Plug";

export const CardsContainer = ({ isLoading }) => {
  const [buyForm, setBuyForm] = useState(false);
  const [plugFlag, setPlugFlag] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.certificates);

  function createForm(name, discount, summa, id, price, primaryKey, tableName) {
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
    setBuyForm(true);
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
            <Card {...cert} key={cert.id} openForm={createForm}></Card>
          ))
        )}
      </div>
    </div>
  );
};
