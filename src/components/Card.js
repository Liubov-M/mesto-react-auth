import CurrentUserContext from '../contexts/CurrentUserContext.js'
import { useContext } from 'react'

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked && 'element__button-like_active'}`
  )

  function handleCardLike() {
    onCardLike(card)
  }
  function handleCardDelete() {
    onCardDelete(card)
  }
  function handleCardClick() {
    onCardClick(card)
  }

  return (
    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      {isOwn && <button className="element__delete-button" onClick={handleCardDelete}/>}
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}/>
        <span className="element__counter-like" />
      </div>
    </div>
  )
}