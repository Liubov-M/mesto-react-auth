import { useContext } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import Card from './Card.js'
import Header from './Header.js'


export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, userData }) {
  const currentUser = useContext(CurrentUserContext)
  const cardsElements = cards.map(
    (data) => {
      return (<Card
        key={data._id}
        card={data}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}/>)
    }
  )

  return (
    <>
    <Header login={userData}/>
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt="фото профиля" className="profile__avatar" />
          <button type="button" className="profile__avatar-editbutton" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{currentUser.name}</h1>
          <p className="profile__info-job">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}/>
      </section>
      <section className="photo-galery">
        <div className="elements">
          {cardsElements}
        </div>
      </section>
    </main>
    </>
  )
}