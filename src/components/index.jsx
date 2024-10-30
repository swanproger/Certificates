import { Skeleton } from "./skeleton";
import { Card } from "./sertificateCard";
import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setSertificate } from "../store/SertificateSlice";
import ExecutionSertificate from "../buyPage";

export const Cards = ({ items, isLoading }) => {
  const [open, setOpen] = useState(false);
  const [buyForm, setBuyForm] = useState(false);
  const dispatch = useDispatch();
  function openModal(NAME, DISCOUNT, SUMMA) {
    setOpen(true);
    dispatch(setSertificate({ NAME, DISCOUNT, SUMMA }));
  }
  return (
    <>
      {buyForm ? (
        <ExecutionSertificate setBuyForm={setBuyForm}></ExecutionSertificate>
      ) : (
        <div className="content" id="content">
          <h1>Покупка сертификата</h1>
          <p>Выберите сертификат:</p>
          {isLoading ? (
            <div className="skeleton-list">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            items.map((obj) => (
              <Card {...obj} key={obj.ID} openModal={openModal}></Card>
            ))
          )}
          <Modal open={open} setOpen={setOpen} setBuyForm={setBuyForm}></Modal>
        </div>
      )}
    </>
  );
};
