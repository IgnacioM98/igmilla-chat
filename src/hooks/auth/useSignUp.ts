import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import {
  createUser,
  validateUser,
} from "../../redux/features/auth/authActions";
import { authSelector } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";

export interface Props {}

export const useSignUp = ({}: Props) => {
  const { signUpState } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const { values, handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      pass: "",
    },
    onSubmit: (values) => dispatch(createUser(values)),
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      nombre: Yup.string().required("Nombre requerido"),
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

  useEffect(() => {
    if (signUpState === "success") {
      dispatch(validateUser(values));
    }
  }, [signUpState]);

  return {
    values,
    onSubmit: handleSubmit,
    setValue: setFieldValue,
    errors,
    touched,
    state: signUpState,
  };
};
