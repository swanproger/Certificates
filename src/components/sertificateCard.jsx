export const Card = ({ ID, NAME, DISCOUNT, SUMMA, openModal, PRICE }) => {
  return (
    <div
      className="card"
      id={ID}
      onClick={() => {
        openModal(NAME, DISCOUNT, SUMMA);
      }}
    >
      <div className="card__sale">-{Math.round(DISCOUNT)}%</div>
      <div className="card__content">
        <h2>
          Подарочный <br></br> сертификат
        </h2>
        <span>{`${Math.round(PRICE)} руб.`}</span>
      </div>
    </div>
  );
};
