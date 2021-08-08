import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom'

function App(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('')
  const [erro, setErro] = useState(false)

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        const repositories = response.data;
        const repositotiesName = [];

        repositories.map((repository) => {
          repositotiesName.push(repository.name)
        })

        localStorage.setItem('repositoriesName', JSON.stringify(repositotiesName))
        setErro(false)
        history.push('/repositories')
      })
      .catch(err => {
        setErro(true);
      })
  }
  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="usuarioInput" placeholder="usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      {erro ? <S.ErrorMsg>Ocurreu um erro. Tente novamente</S.ErrorMsg> : ''}

    </S.HomeContainer>

  );
}


export default App;