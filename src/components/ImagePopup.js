export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup  ${card ? 'popup_opened popup_opened_opaque' : ""}`}>
      <div className="popup__card">
        <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name : ""} />
        <h4 className="popup__title">{card ? card.name : ""}</h4>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  )
}