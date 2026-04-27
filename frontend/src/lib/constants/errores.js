export const ERRORS = {
  email: {
    unique: 'Este correo electrónico ya está registrado.',
    required: 'El correo es obligatorio.',
    format: 'Formato de correo no válido.',
  },
  password: {
    min: 'La contraseña debe tener al menos 8 caracteres.',
    confirmed: 'Las contraseñas no coinciden.',
    required: 'La contraseña es obligatoria.',
  },
  nombre: {
    required: 'El nombre es obligatorio.',
    max: 'El nombre es demasiado largo.',
  },
  general: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
};

export const getErrorMessage = (field, rule) => {
  return ERRORS[field]?.[rule] || ERRORS.general;
};
