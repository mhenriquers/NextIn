import {
  parsePhoneNumber,
  isValidPhoneNumber,
  CountryCode,
} from "libphonenumber-js";

export const validarTelefone = (numero: string, paisPadrao: string = "BR") => {
  if (!numero || numero.trim() === "") {
    return {
      valido: false,
      numero: "",
      pais: "",
      tipo: "",
      ddd: "",
      erro: "Número vazio",
    };
  }
  try {
    const phoneNumber = parsePhoneNumber(numero, paisPadrao as CountryCode);
    const valido = isValidPhoneNumber(numero, paisPadrao as CountryCode);
    return {
      valido,
      numero: phoneNumber.number,
      pais: phoneNumber.country || "",
      tipo: phoneNumber.getType() || "",
      ddd: phoneNumber.nationalNumber.substring(0, 2),
      erro: valido ? "" : "Número inválido",
    };
  } catch (error) {
    return {
      valido: false,
      numero: "",
      pais: "",
      tipo: "",
      ddd: "",
      erro: "Erro ao processar número",
    };
  }
};

export const formatarTelefone = (numero: string, paisPadrao: string = "BR") => {
  if (!numero || numero.trim() === "") {
    return { internacional: "", nacional: "" };
  }
  try {
    const phoneNumber = parsePhoneNumber(numero, paisPadrao as CountryCode);
    return {
      internacional: phoneNumber.formatInternational(),
      nacional: phoneNumber.formatNational(),
    };
  } catch (error) {
    return { internacional: "", nacional: "" };
  }
};

export const extrairDDD = (
  numero: string,
  paisPadrao: string = "BR",
): string => {
  if (!numero || numero.trim() === "") return "";
  try {
    const phoneNumber = parsePhoneNumber(numero, paisPadrao as CountryCode);
    return phoneNumber.nationalNumber.substring(0, 2);
  } catch (error) {
    return "";
  }
};

export const ehCelular = (
  numero: string,
  paisPadrao: string = "BR",
): boolean => {
  if (!numero || numero.trim() === "") return false;
  try {
    const phoneNumber = parsePhoneNumber(numero, paisPadrao as CountryCode);
    return phoneNumber.getType() === "MOBILE";
  } catch (error) {
    return false;
  }
};

export default { validarTelefone, formatarTelefone, extrairDDD, ehCelular };
