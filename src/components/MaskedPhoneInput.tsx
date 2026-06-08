import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, Alert } from "react-native";
import { validarTelefone } from "./PhoneValidator";

interface MaskedPhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  pais?: string;
  style?: object;
}

const MaskedPhoneInput: React.FC<MaskedPhoneInputProps> = ({
  value,
  onChangeText,
  placeholder = "Digite o telefone",
  pais = "BR",
  style,
}) => {
  const [numeroFormatado, setNumeroFormatado] = useState("");
  const [validacao, setValidacao] = useState<{
    valido: boolean;
    tipo?: string;
    ddd?: string;
  } | null>(null);

  // Função local para formatar o telefone como (XX) 9XXXX-XXXX
  const formatarTelefoneLocal = (input: string): string => {
    const apenasNumeros = input.replace(/\D/g, "").slice(0, 11);
    let formatado = apenasNumeros;

    if (apenasNumeros.length > 2) {
      formatado = `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2)}`;
    }
    if (apenasNumeros.length > 7) {
      formatado = `(${apenasNumeros.substring(0, 2)}) ${apenasNumeros.substring(2, 7)}-${apenasNumeros.substring(7)}`;
    }
    return formatado;
  };

  const handleChangeText = (text: string) => {
    const formatado = formatarTelefoneLocal(text);
    const apenasNumeros = text.replace(/\D/g, "");

    const resultadoValidacao = validarTelefone(apenasNumeros, pais);

    setNumeroFormatado(formatado);
    setValidacao(resultadoValidacao);
    onChangeText(apenasNumeros);
  };

  const handleBlur = () => {
    if (validacao && !validacao.valido) {
      Alert.alert("Erro", "Número de telefone inválido.");
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        value={numeroFormatado}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        placeholder={placeholder}
        keyboardType="phone-pad"
      />
      {validacao && (
        <Text
          style={validacao.valido ? styles.textoValido : styles.textoInvalido}
        >
          {validacao.valido
            ? `✓ Válido - País: ${pais} | Tipo: ${validacao.tipo} | DDD: ${validacao.ddd}`
            : "✗ Inválido"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#0d0d0d",
    padding: 12,
    borderRadius: 8,
    color: "#0d0d0d",
  },
  textoValido: {
    color: "#4CD964",
    marginTop: 5,
    fontSize: 12,
  },
  textoInvalido: {
    color: "#FF3B30",
    marginTop: 5,
    fontSize: 12,
  },
});

export default MaskedPhoneInput;
