export const validate = (formValues) => {
  const { name, difficulty, duration, season } = formValues;
  const nameResult = validateName(name);
  if (!nameResult.success) return nameResult;

  const difficultyResult = validateDifficulty(difficulty);
  if (!difficultyResult.success) return difficultyResult;

  const durationResult = validateDuration(duration);
  if (!durationResult.success) return durationResult;

  const seasonResult = validateSeason(season);
  if (!seasonResult.success) return seasonResult;

  return {
    success: true,
    msg: "",
  };
};

const validateName = (name) => {
  name = name.trim();
  if (name === "") return { success: false, msg: "Ingrese el nombre" };
  if (name.length < 3)
    return {
      success: false,
      msg: "La actividad debe tener minimo 3 caracteres",
    };
  return {
    success: true,
    msg: "",
  };
};

const validateDifficulty = (difficult) => {
  if (difficult === "")
    return { success: false, msg: "Ingrese una dificultad" };
  return {
    success: true,
    msg: "",
  };
};

const validateDuration = (duration) => {
  if (duration === "") return { success: false, msg: "Ingrese una duracion" };
  return {
    success: true,
    msg: "",
  };
};

const validateSeason = (season) => {
  if (season === "") return { success: false, msg: "Ingrese una temporada" };
  return {
    success: true,
    msg: "",
  };
};
