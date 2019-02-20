import * as yup from 'yup'

export const emailNotLongEnough = "email debe tener al menos tres caracteres"
export const passwordNotLongEnough = "la contraseña debe tener al menos 8 caracteres"
export const invalidEmail = "debe introducir un email válido"

export const validPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, passwordNotLongEnough)
        .max(255)
        .required()    
})

export const validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, emailNotLongEnough)
        .max(255)
        .email(invalidEmail)
        .required(),
    password: yup
        .string()
        .min(8, passwordNotLongEnough)
        .max(255)
        .required(),
    name: yup
        .string()
        .required('Nombre es un campo obligatorio'),
    lastname: yup
        .string()
        .required('Apellidos es un campo obligatorio')
})

const invalidLogin = 'invalid login'

export const loginSchema = yup.object().shape({
    email: yup.string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)    
        .email(invalidLogin).required(),
    password: yup.string()
        .min(3, invalidLogin)
        .max(255, invalidLogin)
        .required()

})