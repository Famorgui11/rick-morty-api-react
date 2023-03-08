import { useEffect, useState } from 'react'
import axios from 'axios'

import { CardCharacter } from '../CardCharacter'

import IconLoader from '../../assets/loader.gif'

import { ContainerApp, ContentCharacters, HeaderApp, Loader } from './styles'

export function Application() {
  const [characters, setcharacters] = useState([])

  const [page, setpage] = useState(1)

  const [countPages, setCountPages] = useState('')

  const [qtdCharacters, setQtdCharacters] = useState('')

  const [isLoader, setIsLoader] = useState(true)

  // Async/Await e Try/Catch
  const getCharacter = async () => {
    try {
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      )
      const updatedCharacters = [...characters, ...data.results]
      setcharacters(updatedCharacters)
      setCountPages(data?.info?.pages)
      setQtdCharacters(data?.info?.count)
      setIsLoader(false)
    } catch (err) {
      setIsLoader(false)
      alert('Algo deu errado, tente novamente mais tarde!')
    }
  }

  useEffect(() => {
    getCharacter()
  }, [page])

  // Promise e fetch
  // useEffect(() => {
  //     axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
  //     .then((response) => {
  //         const array = [ ...characters, ...response.data.results]
  //         setcharacters(array);
  //         setCountPages(response.data.info.pages);
  //         setQtdCharacters(response.data.info.count);
  //         setIsLoader(false);
  //     })
  // }, [page])

  return (
    <>
      {isLoader && (
        <Loader>
          <img src={IconLoader} alt="" />
        </Loader>
      )}
      <ContainerApp>
        <HeaderApp>
          <h1>Rick and Morty</h1>
          <span>Nº de Personagens: {qtdCharacters}</span>
        </HeaderApp>
        <ContentCharacters>
          <div>
            {characters &&
              characters.map(({ image, name, gender, species }, index) => {
                return (
                  <CardCharacter
                    image={image}
                    name={name}
                    genre={gender}
                    specie={species}
                  />
                )
              })}
          </div>
          {!(page === countPages) && (
            <button onClick={() => setpage(page + 1)}>Carregar mais</button>
          )}
        </ContentCharacters>
      </ContainerApp>
    </>
  )
}
