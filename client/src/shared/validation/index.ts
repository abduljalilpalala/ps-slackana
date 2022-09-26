import * as Yup from 'yup'

export const SignUpFormSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Should have atleast 2 characters')
    .max(30, 'Should have max length of 30 characters'),
  email: Yup.string().email('Email must be valid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password length should be at least 4 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .max(12, 'Password cannot exceed more than 12 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
})
