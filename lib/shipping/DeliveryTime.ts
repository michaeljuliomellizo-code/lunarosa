export interface DeliveryEstimate {

  minDays: number;

  maxDays: number;

  label: string;

}

const MAIN_CITIES = [

  "medellín",
  "medellin",

  "cali",

  "barranquilla",

  "cartagena",

  "bucaramanga",

  "pereira",

  "manizales",

  "armenia",

  "ibagué",
  "ibague",

  "villavicencio",

  "cúcuta",
  "cucuta",

  "pasto",

  "montería",
  "monteria"

];

export function getDeliveryEstimate(

  department: string,

  municipality: string

): DeliveryEstimate {

  const city =
    municipality
      .trim()
      .toLowerCase();

  const dep =
    department
      .trim()
      .toLowerCase();

  //------------------------------------------------
  // Bogotá
  //------------------------------------------------

  if (

    dep.includes("bogotá") ||

    dep.includes("bogota") ||

    city === "bogotá" ||

    city === "bogota"

  ) {

    return {

      minDays: 2,

      maxDays: 2,

      label: "2 días hábiles",

    };

  }

  //------------------------------------------------
  // Ciudades principales
  //------------------------------------------------

  if (
    MAIN_CITIES.includes(city)
  ) {

    return {

      minDays: 2,

      maxDays: 3,

      label: "2 a 3 días hábiles",

    };

  }

  //------------------------------------------------
  // Resto del país
  //------------------------------------------------

  return {

    minDays: 3,

    maxDays: 5,

    label: "3 a 5 días hábiles",

  };

}