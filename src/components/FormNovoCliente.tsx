import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import MaskedPhoneInput from "./MaskedPhoneInput";

interface FormNovoClienteProps {
  onSubmit: (data: {
    nome: string;
    pessoas: number;
    whatsapp: string;
    observacoes: string;
  }) => void;
  onCancel: () => void;
}

const FormNovoCliente: React.FC<FormNovoClienteProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [nome, setNome] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const handleAdd = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome é obrigatório.");
      return;
    }
    const numPessoas = parseInt(pessoas);
    if (isNaN(numPessoas) || numPessoas <= 0) {
      Alert.alert("Erro", "Informe um número válido de pessoas.");
      return;
    }
    if (!whatsapp.trim()) {
      Alert.alert("Erro", "O WhatsApp é obrigatório.");
      return;
    }

    onSubmit({ nome, pessoas: numPessoas, whatsapp, observacoes });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do cliente"
      />

      <Text style={styles.label}>Quantidade de Pessoas</Text>
      <TextInput
        style={styles.input}
        value={pessoas}
        onChangeText={setPessoas}
        keyboardType="numeric"
        placeholder="0"
      />

      <Text style={styles.label}>WhatsApp</Text>
      <MaskedPhoneInput value={whatsapp} onChangeText={setWhatsapp} />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FAF6EE",
  },
  label: {
    fontSize: 16,
    color: "#0d0d0d",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 0.48,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  addButton: {
    backgroundColor: "#4CD964",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default FormNovoCliente;
