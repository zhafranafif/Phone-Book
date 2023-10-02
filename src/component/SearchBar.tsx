import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

const StyledForm = styled.form`
    transform: translate(-15%,-25%);
    transition: all 1s;
    width: 120px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 25px;
    padding: 1px;
    margin: 30px;
`

const StyledInput = styled.input`
    width: 100%;
    height: 20.5px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 20px;
    padding: 4px;
`
const StyledSearchList = styled.div(`
width: 125px;
background-color: white;
display: flex;
flex-direction: column;
padding: 4px;
`)

type ContactSearch = {
    first_name: string
    last_name: string
  }
const SearchBar = () => {
    const [query, setQuery] = useState<string>('')
    const [queryData, setQueryData] = useState<ContactSearch[]>([])
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('Contact') || '[]')
      setQueryData(storedData)
    }, [])
  
    const handleSearchInput = (event: { target: { value: React.SetStateAction<string> } }) => {
      setQuery(event.target.value)
    }
    
    const filtered = queryData.filter((contact) => {
      return (
        contact.first_name.toLowerCase().includes(query.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(query.toLowerCase())
      )
    })
    return (
        <StyledForm>
            <StyledInput placeholder='Search...' value={query} onChange={handleSearchInput} />
            
        {query ? (filtered.map((contact, index) => (
          <StyledSearchList key={index}>
            <div>{contact.first_name} {contact.last_name}</div>
          </StyledSearchList>
          
            ))) : null}
        </StyledForm>
  )
}

export default SearchBar