import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Product name is required'),
  brand: yup.string().required('Product brand is required'),
  type: yup.string().required('Product type is required'),
  price: yup
    .number()
    .label('Price')
    .required('Product price is required')
    .typeError('Price must be a number')
    .moreThan(100),
  quantityInStock: yup
    .number()
    .label('Quantity')
    .required()
    .typeError('Quantity must be a number')
    .min(0)
    .max(200),
  description: yup.string().required('Product description is required'),
  file: yup.mixed().when('pictureUrl', {
    is: (value: string) => !value,
    then: (schema) => schema.required('Please provide an image'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
