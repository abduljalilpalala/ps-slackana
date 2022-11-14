import * as Yup from 'yup'

export const SignInFormSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required('Password is required')
})

export const SignUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})

export const SecurityFormSchema = Yup.object().shape({
  current_password: Yup.string().required('Current password is required'),
  new_password: Yup.string()
    .required('Password is required')
    .min(9, 'Password length should be at least 9 characters')
    .max(15, 'Password cannot exceed more than 15 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .max(15, 'Password cannot exceed more than 15 characters')
    .oneOf([Yup.ref('new_password')], 'Passwords do not match')
})
