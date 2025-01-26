import { Button, Label, Fieldset, Input, Form, Title } from '../../components'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '../../components'

interface FormInputProps {
  name: string
  email: string
  phone: string
  password: string
  confirmedPassword: string
}

const PersonalRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputProps>()

  const password = watch('password')

  const validatePassword = {
    required: (val: string) =>
      !!val || 'Por favor, ingrese la contraseña nuevamente',
    minLength: (val: string) =>
      val.length >= 6 || 'La contraseña debe tener por lo menos 6 caracteres',
    matchPasswords: (val: string) =>
      val === password || 'Las contraseñas no coinciden',
  }

  const onSubmited = (data: FormInputProps) => {
    console.log(data)
  }

  function emailValidation(value: string) {
    const emailFormat = /^[^\s@]+@alura\.com$/
    if (!emailFormat.test(value)) {
      console.error('Correo electrónico inválido para este dominio')
      return 'Correo electrónico inválido para este dominio'
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
            $error={!!errors.name}
            {...register('name', {
              required: 'El campo nombre es obligatorio',
              minLength: {
                value: 5,
                message: 'El nombre debe tener 5 caracteres como mínimo',
              },
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-email">Correo electrónico</Label>
          <Input
            id="field-email"
            placeholder="Ingresa tu dirección de correo electrónico"
            type="email"
            $error={!!errors.email}
            {...register('email', {
              required: 'El campo email es obligatorio',
              validate: emailValidation,
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label>Teléfono</Label>
          <Input
            id="field-phone"
            type="text"
            placeholder="Ej: (DDD)XX XXXX-XXXX"
            $error={!!errors.phone}
            {...register('phone', {
              required: 'El campo teléfono es obligatorio',
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor="field-password">Crea una contraseña</Label>
          <Input
            id="field-password"
            placeholder="Crea una contraseña"
            type="password"
            $error={!!errors.password}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener 6 caracteres como mínimo',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Fieldset>
        <Fieldset>
          <Label htmlFor="field-confirm-password">Repite la contraseña</Label>
          <Input
            id="field-confirm-password"
            placeholder="Repite la contraseña anterior"
            type="password"
            {...register('confirmedPassword', {
              required: 'Debe repetir la contraseña',
              validate: validatePassword,
            })}
          />
          {errors.confirmedPassword && (
            <ErrorMessage>{errors.confirmedPassword.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type="submit">Avanzar</Button>
      </Form>
    </>
  )
}

export default PersonalRegistration
