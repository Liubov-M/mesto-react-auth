import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password })
      .then(() => history.push('/'))
  }

  return (
    <div className="authorization">
      <form className="authorization__form"
        onSubmit={handleSubmit}>
        <h3 className="authorization__heading">Вход</h3>
        <input
          className="authorization__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength={2}
          maxLength={200}
          required
          onChange={({ target: { value } }) => setEmail(value)}
          value={email || ""}
        />
        <input
          className="authorization__input"
          type="password"
          name="password"
          placeholder="Пароль"
          minLength={2}
          maxLength={200}
          required
          onChange={({ target: { value } }) => setPassword(value)}
          value={password || ""}
        />
        <button className="authorization__submit-button"
          type="submit">Войти</button>
      </form>
    </div>
  )
}