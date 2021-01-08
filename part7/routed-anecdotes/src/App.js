import React, { useState } from 'react'
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link to='/' style={padding}>Anecdotes</Link>
      <Link to='/new' style={padding}>Create new</Link>
      <Link to='/about' style={padding}>About</Link>
    </div>
  )
}

const Anecdote = ({ content, votes }) => (
  <>
    <h2>{content}</h2>
    <p>Has {votes} votes</p>
  </>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(({ id, content }) => (
        <li key={id}>
          <Link to={`/anecdotes/${id}`}>
            {content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification, notificationTimeoutId, setNotificationTimeoutId }) => {
  const history = useHistory()
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = event => {
    event.preventDefault()
    addNew({ content, author, info, votes: 0 })
    setNotification(`You created ${content}`)

    if (notificationTimeoutId) {
      window.clearTimeout(notificationTimeoutId)
    }

    setNotificationTimeoutId(
      window.setTimeout(() => {
        setNotification('')
      }, 10000)
    )
    history.push('/')
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          Author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          Url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>Create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(null)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')

  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <>
      <h1>Software anecdotes</h1>
        <Menu />
        {notification && <div>{notification}</div>}
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote {...anecdote} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/new">
            <CreateNew
              addNew={addNew}
              setNotification={setNotification}
              notificationTimeoutId={notificationTimeoutId}
              setNotificationTimeoutId={setNotificationTimeoutId}
            />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      <Footer />
    </>
  )
}

export default App;