import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import { useEffect, useState } from 'react'
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js'
import ProtectedRoute from './ProtectedRoute.js'
import * as mestoAuth from '../utils/mestoAuth.js';
import Header from './Header.js';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  //авторизация
  const [userEmail, setUserEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const history = useHistory()

  const auth = (token) => {
    return mestoAuth.getData(token)
    .then((res) => {
      if (res) {
        setLoggedIn(true)
        setUserEmail(res.data.email)
      }
    })
  }
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      auth(jwt)
    }
  }, [])
  useEffect(() => {
    if(loggedIn) history.push("/")
  }, [loggedIn])

  const onLogin = ({ email, password }) => {
    return mestoAuth.login(email, password)
      .then((res) => {
        if(res.token)
          setUserEmail(email)
          setLoggedIn(true)
          localStorage.setItem('jwt', res.token)
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 - не передано одно из полей')
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден')
        }
      })
  }

  const onRegister = ({ email, password }) => {
    return mestoAuth.register(email, password)
      .then((res) => {
        setIsAuth(true);
        openRegistrationStatus();
        return res
      })
      .catch((err) => {
        setIsAuth(false);
        openRegistrationStatus();
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')}
      })
  }

  function openRegistrationStatus() {
    setIsTooltipOpen(true);
    window.addEventListener('click', handleCloseOnOverlay);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsTooltipOpen(false)
    setSelectedCard(null)
  }
  function handleCloseOnOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  function handleCardClick(props) {
    setSelectedCard(props)
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`Ошибка в блоке лайк, ${error}`)
      })
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(item => item._id !== card._id));
      })
      .catch((error) => {
        console.log(`Ошибка при удалении карточки, ${error}`)
      })
  }
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при внесении данных пользователя, ${error}`)
      })
  }
  function handleUpdateAvatar({ avatar }) {
    api.setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при изменении аватара, ${error}`)
      })
  }
  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка при добавлении карточки, ${error}`)
      })
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
      })
      .catch((error) => {
        console.log(`Ошибка, ${error}`)
      })
  }, [])

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <div className="page">
        <Switch>
          <ProtectedRoute exact path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          userData={userEmail}
          />

          <Route path="/sign-up">
            <Header name="signup"/>
            <Register onRegister={onRegister} />
          </Route>

          <Route path="/sign-in">
            <Header name="signin"/>
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/*">
            <Redirect to="/sign-in" />
          </Route>
        </Switch>

        <Footer/>

        <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        />

        <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm
        name="#delete-popup"
        title="Вы уверены?"
        buttonText="Да"
        />
        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isRegSuccess={isAuth}
          regSuccess="Вы успешно зарегестрировались!"
          regFailed="Что-то пошло не так! Попробуйте еще раз."
        />
      </div>
    </div>
  </CurrentUserContext.Provider>
  );
}