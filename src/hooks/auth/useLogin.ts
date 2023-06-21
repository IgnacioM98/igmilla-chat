import { useFormik } from "formik";
import * as Yup from "yup";
import { validateUser } from "../../redux/features/auth/authActions";
import { authSelector } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

export interface Props {}

export const useLogin = ({}: Props) => {
  const { loginState } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const { values, handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: (values) => dispatch(validateUser(values)),
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Ingrese email inválido")
        .max(255)
        .required("Email es requerido"),
      pass: Yup.string()
        .min(6, "Muy corta")
        .max(255, "Muy larga")
        .required("Contraseña es requerida"),
    }),
  });

  return {
    values,
    onSubmit: handleSubmit,
    setValue: setFieldValue,
    errors,
    touched,
    state: loginState,
  };
};
