import React, {useState} from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name || newUser.login){
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length > 0){
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className="conteudo">
        <img src={background} className="background" alt="background app"/>
        <div className="info">
          <div>
            <input name="usuario" value={user} placeholder="@username" onChange={event => setUser(event.target.value)}/>
            <button onClick={handleGetData}>Buscas</button>
          </div>
          {currentUser?.name || currentUser?.login ? (
            <>
              <div className="perfil">
                <img 
                  src={currentUser.avatar_url} 
                  className="profile" 
                  alt="imagem de perfil" 
                />
                <div>
                  <h3>{currentUser.name || currentUser.login}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) :null}

          {repos?.length > 0 ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map(item => (
                <ItemList title={item.name} description={item.description} key={item.id} />
              ))}
            </div>
          ) :null}

        </div>
      </div>
    </div>
  );
}

export default App;
