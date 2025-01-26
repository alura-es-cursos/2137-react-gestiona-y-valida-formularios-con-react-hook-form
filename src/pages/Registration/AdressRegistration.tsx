import { useForm } from 'react-hook-form'
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Title,
} from '../../components'

const API_KEY = '693d6d60-dc0b-11ef-aab3-5f9d4144b3ca'
interface FormAdressInput {
  'zip-code': string
  street: string
  number: string
  neighborhood: string
  city: string
}

const AddressRegistration = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormAdressInput>({
    mode: 'all',
    defaultValues: {
      'zip-code': '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
    },
  })

  const onSubmited = (data: FormAdressInput) => {
    console.log(data)
  }

  const zipCodeInput = watch('zip-code')

  const fetchZipCode = async (zipCode: string) => {
    if (!zipCode) {
      setError('zip-code', {
        type: 'manual',
        message: 'Por favor, ingrese un Código Postal',
      })
      return
    }

    const ENDPOINT = `https://app.zipcodebase.com/api/v1/search?apikey=${API_KEY}&codes=${zipCode}&country=ar`

    try {
      const response = await fetch(ENDPOINT)
      const data = await response.json()

      if (data.results.length === 0) {
        setError('zip-code', {
          type: 'manual',
          message: 'Código Postal no encontrado',
        })
        throw new Error('Código Postal no encontrado')
      }

      const zipCodeData = data.results[zipCode][0]
      setValue('neighborhood', zipCodeData.city)
      setValue('city', `${zipCodeData.state}, ${zipCodeData['country_code']}`)

      console.log(data.results[zipCode][0])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Title>Ahora, algunos datos más sobre ti:</Title>
      <Form onSubmit={handleSubmit(onSubmited)}>
        <Fieldset>
          <Label htmlFor="field-zip-code">Código Postal</Label>
          <Input
            id="field-zip-code"
            placeholder="Ingresa tu Código Postal"
            type="text"
            $error={!!errors['zip-code']}
            {...register('zip-code', {
              required: 'El campo Código Postal es obligatorio',
            })}
            onBlur={() => fetchZipCode(zipCodeInput)}
          />
          {errors['zip-code'] && (
            <ErrorMessage>{errors['zip-code']?.message}</ErrorMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-street">Calle</Label>
          <Input
            id="field-street"
            placeholder="Av Triunvirato"
            type="text"
            $error={!!errors.street}
            {...register('street', {
              required: 'El campo calle es obligatorio',
            })}
          />
          {errors.street && (
            <ErrorMessage>{errors.street?.message}</ErrorMessage>
          )}
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="field-street-number">Número</Label>
            <Input
              id="field-street-number"
              placeholder="Ej: 1440"
              type="text"
              $error={!!errors.number}
              {...register('number', {
                required: 'El campo número es obligatorio',
              })}
            />
            {errors.number && (
              <ErrorMessage>{errors.number?.message}</ErrorMessage>
            )}
          </Fieldset>
          <Fieldset>
            <Label htmlFor="field-neighborhood">Barrio</Label>
            <Input
              id="field-neighborhood"
              placeholder="Villa Urquiza"
              type="text"
              $error={!!errors.neighborhood}
              {...register('neighborhood', {
                required: 'El campo barrio es obligatorio',
              })}
            />
            {errors.neighborhood && (
              <ErrorMessage>{errors.neighborhood?.message}</ErrorMessage>
            )}
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="field-city">Ciudad</Label>
          <Input
            id="field-city"
            placeholder="Ciudad Autónoma de Buenos Aires, CABA"
            type="text"
            $error={!!errors.city}
            {...register('city', {
              required: 'El campo ciudad es obligatorio',
            })}
          />
          {errors.city && <ErrorMessage>{errors.city?.message}</ErrorMessage>}
        </Fieldset>
        <Button type="submit">Registrar</Button>
      </Form>
    </>
  )
}

export default AddressRegistration
