import "./style/Card.css";

export const Card = ({
  id,
  name,
  discount,
  summa,
  openModal,
  price,
  primaryKey,
  tableName,
}) => {
  return (
    <div
      className="card"
      id={id}
      onClick={() => {
        openModal(name, discount, summa, id, price, primaryKey, tableName);
      }}
    >
      <div className="card__sale">-{Math.round(discount)}%</div>
      <div className="card__content">
        <h2>
          Подарочный <br></br> сертификат
        </h2>
        <span>{`${Math.round(price)} руб.`}</span>
      </div>
    </div>
  );
};
