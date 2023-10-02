import  { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GetContactListQuery } from '../__generated__/graphql';
import { GetContactList } from '../gql/queries';
import { initialName } from '../utils/initial-name';
import styled from '@emotion/styled';
import {MdOutlineDeleteOutline, MdFavoriteBorder} from 'react-icons/md'
import { DeleteContactFromList } from '../gql/mutation';
import Button from '../component/Button';
import Pagination from '../component/Pagination';
import Loader from '../component/Loader';
import toast from 'react-hot-toast'

const InitialNameStyle = styled.div`
background: #2e9b39;
border-radius: 10px;
height: 53px;
width: 53px;
margin-right: 5px;
color: white;
text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.6);
font-weight: 400;
font-size: 20px;
display: flex;
align-items: center;
justify-content: center;
`
const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  background-color: #ededed;
  border-radius: 10px;
  margin-bottom: 10px;

  @media (min-width: 768px){
    padding-left: 2rem;
    padding-right: 2rem;
  }
`
const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: #ededed;
  border-radius: 10px;
  margin-bottom: 10px;

  @media (min-width: 768px){
    padding-left: 2rem;
    padding-right: 2rem;
  }
`
const NameAndNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

`
const ButtonContainer = styled.div`
  display: flex;
  flex-directopm: row;
  gap: 5px;
  margin-left: 20px;
`

type Favorite = {
  first_name: string
  last_name: string
  id: number
  phones: [{
    number: string[]
  }]
}

const ContactListPages = () => {
  const { data, loading, error} = useQuery<GetContactListQuery>(GetContactList, {
    variables: {
      limit: 30,
      offset: 5
    }
  })
  const [favorites, setFavorites] = useState<Array<Favorite>>(
    JSON.parse(localStorage.getItem('favorite') ?? '[]')
  )

  const handleAddFavorites = async (id: number) => {
    const favoriteContact = data?.contact.find((contact) => contact.id === id);

    if (favoriteContact) {
      const alreadyInFavorite = favorites.some((favorite) => favorite.id === id)
      if (!alreadyInFavorite) {
        const newFavoriteData: Favorite = {
          first_name: favoriteContact.first_name,
          last_name: favoriteContact.last_name,
          id: favoriteContact.id,
          phones: [{ number: favoriteContact.phones.map((item) => item.number) }]
        }
        setFavorites((prevData) => [...prevData, newFavoriteData])
        localStorage.setItem('favorite', JSON.stringify([...favorites, newFavoriteData]))
        toast.success('Success Adding Number to Favorite List!')
      } else {
        toast.error('Contact is already in favorites!')
      }
    }
  }

  useEffect(() => {
    if (!loading && !error && data) {
      localStorage.setItem('Contact', JSON.stringify(data.contact))
    }
  })

  const [deleteContact] = useMutation(DeleteContactFromList, {
    refetchQueries: [GetContactList]
  })




  const length = data?.contact.length ?? 0

  const [contactOffset, setContactOffset] = useState(0)
  const contactPerPage = 10
  const endOffset = contactOffset + contactPerPage
  const currentContact = data?.contact.slice(contactOffset, endOffset)
  const pageCount = Math.ceil(length / contactPerPage)
  
  const handlePageClick = (e: { selected: number }) => {
    console.log(e.selected)
    const newOffset = (e.selected * contactPerPage) % length
    setContactOffset(newOffset)
  }

  if (error) return <p>{error.message}</p>

  return (
    <div style={{font: 'Josefin Sans'}}>
      <h2 style={{textAlign: 'center'}}>Phone Book</h2>
      {loading ? (
        <Loader/>
      ) : (
          <>
            <h4>Favorite</h4>
            {
              favorites.length === 0 ? (
                <p>You dont have favorite contact</p>
              ) : (
                favorites && favorites.map((favorite) => (
                  <FavoriteContainer key={favorite.id}>
                    <InitialNameStyle className='initial-name'>{initialName(favorite.first_name)}</InitialNameStyle>
                    <NameAndNumberContainer>
                    <div>
                    <p style={{margin: '12px', fontSize: '24px', paddingTop: '12px', fontWeight: 'bolder'}}>{favorite.first_name} - {favorite.last_name}</p>
                    </div>
                    {/* {favorite.phones.map(({ number }) => (
                      <div>
                        {number}
                      </div>
                    )
                      )} */}
                    </NameAndNumberContainer>
                  </FavoriteContainer>
                )) 
              )
            }
            <hr />
            <h4>Contacts</h4>
            {data && data.contact ? (
              currentContact?.map((contacts) => (
                <ContactContainer key={contacts.id}>
                  <InitialNameStyle className='initial-name'>{initialName(contacts.first_name)}</InitialNameStyle>
                  <NameAndNumberContainer>
                    <div>
                      <p style={{ marginBottom: '0', fontSize:'18px', fontWeight:'bold' }}>{`${contacts.first_name} ${contacts.last_name}`}</p>
                    </div>
                    {contacts.phones.map(({ number }) => (
                      <div>
                        <span style={{fontWeight: 'inherit'}}>
                        {number}
                        </span>
                      </div>
                    ))}
                  </NameAndNumberContainer>
                  <ButtonContainer>
                    <Button onClick={() => {
                      deleteContact({
                        variables: {
                          id: contacts.id
                        }
                      })
                      toast.success('Success Delete Contact!')
                    }}
                      icon={MdOutlineDeleteOutline}
                      color={'red'}
                      hoverColor={'pink'}
                      
                    />
                    <Button onClick={() => handleAddFavorites(contacts.id)} icon={MdFavoriteBorder} color={'pink'} hoverColor={'red'} />
                  </ButtonContainer>
                </ContactContainer>
              ))) : (
                <p>Empty!</p>
            )}
            <Pagination pageCount={pageCount} onChange={handlePageClick} initialPage={0} marginPagesDisplayed={1} pageRangeDisplayed={1}/>
          </>
      )}
    </div>
  )
}

export default ContactListPages