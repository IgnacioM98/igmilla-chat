import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { authSelector } from "../../redux/features/auth/authSlice";
import { createUser } from "../../redux/features/auth/authActions";

export interface Props {}

export const useRecover = ({}: Props) => {
  // const { signUpState } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const validate = (credentials: any) => {
    dispatch(createUser());
  };
  const { values, handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => validate(values),
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Ingrese email inválido")
        .max(255)
        .required("Email es requerido"),
    }),
  });

  return {
    values,
    onSubmit: handleSubmit,
    setValue: setFieldValue,
    errors,
    touched,
  };
};
