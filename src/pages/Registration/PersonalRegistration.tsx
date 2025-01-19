import { Button, Label, Fieldset, Input, Form, Title } from '../../components'
import { useForm } from 'react-hook-form'

interface FormInputProps {
  name: string
  email: string
  phone: string
  password: string
  confirmedPassword: string
}

const PersonalRegistration = () => {
  const { register, handleSubmit } = useForm<FormInputProps>()

  const onSubmited = (data: FormInputProps) => {
    console.log(data)
  }

  function emailValidation(value: string) {
    const emailFormat = /^[^\s@]+@alura\.com$/
    if (!emailFormat.test(value)) {
      console.error('Correo electrónico inválido para este dominio')
      return false
    }
    return true
  }

  return (
    <>
      <Title>Ingresa algunos datos básicos:</Title>
      <Form onSubmit={handleSubmit(onSubmited)}>
        <Fieldset>
          <Label htmlFor="field-name">Nombre</Label>
          <Input
            id="field-name"
            placeholder="Escribe tu nombre completo"
            type="text"
            {...register('name', { required: true, minLength: 5 })}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-email">Correo electrónico</Label>
          <Input
            id="field-email"
            placeholder="Ingresa tu dirección de correo electrónico"
            type="email"
            {...register('email', {
              required: true,
              validate: emailValidation
            })}
          />
        </Fieldset>

        <Fieldset>
          <Label>Teléfono</Label>
          <Input
            id="field-phone"
            type="text"
            placeholder="Ej: (DDD)XX XXXX-XXXX"
            {...register('phone')}
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="field-password">Crea una contraseña</Label>
          <Input
            id="field-password"
            placeholder="Crea una contraseña"
            type="password"
            {...register('password')}
          />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-confirm-password">Repite la contraseña</Label>
          <Input
            id="field-confirm-password"
            placeholder="Repite la contraseña anterior"
            type="password"
            {...register('confirmedPassword')}
          />
        </Fieldset>
        <Button type="submit">Avanzar</Button>
      </Form>
    </>
  )
}

export default PersonalRegistration
