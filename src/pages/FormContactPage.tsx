import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import {  AddContactWithPhonesMutationVariables } from '../__generated__/graphql'
import { AddContactWithPhone } from '../gql/mutation'
import styled from '@emotion/styled'
import Containers from '../component/Container'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import Loader from '../component/Loader'

const FormContainer = styled.form(`
padding: 8px;
border: 1px solid black;
border-radius: 10px;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 10px;

@media (min-width: 769px){
  width: 50%;
}
@media (max-width: 768px){
  width: 100%;
}
`)
const InputStyled = styled.input(`
padding: 4px;
`)

const ErrorStyled = styled.span(`
color: #ff0000;

&::before {
  display: inline;
  content: "⚠ ";
}

@media (min-width: 768px){
  font-size: 16px;
}
@media (min-width: 389px){
  font-size: 12px;
}
`)



const FormContactPage = () => {
  const [contactMutation, { loading, error }] = useMutation(AddContactWithPhone)
  const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
      getValues,
  } = useForm<AddContactWithPhonesMutationVariables>()

  const onsubmit = () => {
    contactMutation({
      variables: {
        first_name: getValues('first_name'),
        last_name: getValues('last_name'),
        phones: [{
          number: getValues('phones.number')
        }]
          }
      }
    )
    toast.success('Success Adding Number to Contact!')
    reset()
    navigate('/')
  }
  
  if (error) return <p>{error.message}</p>

  return (
    <>{
      loading ? (
        <Loader/>
      ) : (
          <Containers>
          <h2 style={{textAlign: 'center'}}>Add Contact</h2>
        <FormContainer onSubmit={handleSubmit(onsubmit)}>
        <label>First Name</label>
        <InputStyled {...register("first_name", {
          pattern: {
            value: /^[A-Za-z0-9 ]+$/,
            message: 'First Name cannot contain special character!',
          },
          minLength: 4
        })} type='firstName' placeholder='First Name' />
        {errors.first_name && <ErrorStyled>{`${errors.first_name.message}`}</ErrorStyled>}
            
        <label>Last Name</label>
        <InputStyled {...register("last_name", {
          pattern: {
            value: /^[A-Za-z0-9 ]+$/,
            message: 'Last Name cannot contain special character!',
          },
          minLength: 4
        })} type='lastName' placeholder='Last Name' />
        {errors.last_name && <ErrorStyled>{`${errors.last_name.message}`}</ErrorStyled>}
            <label>Phone Number</label>
        <InputStyled {...register('phones.number', {
          pattern: {
            value: /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/,
            message: 'Please input a valid number!'
          },
          maxLength: 13
        })} type="number" placeholder='Phone Number' />
            <button
              disabled={isSubmitting}
                type="submit"
                style={{ margin: '0 auto', padding: '8px', backgroundColor: '#03AC0E', color: 'white', borderRadius: '10px', width: '50%', border: 'none', cursor: 'pointer'}}
        >
          Submit
        </button>
            </FormContainer> 
          </Containers>
      )
    }
    </>
      
  )
}

export default FormContactPage