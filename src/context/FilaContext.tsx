import { createContext, useState, ReactNode, useContext } from "react";

export interface ClienteFila {
  id: string;
  nome: string;
  pessoas: number;
  whatsapp: string;
  observacoes: string;
  posicao: number;
  horaChegada: number;
}

interface FilaContextType {
  fila: ClienteFila[];
  atendidosHoje: number;
  adicionarCliente: (cliente: ClienteFila) => void;
  removerCliente: (id: string) => void;
}

const FilaContext = createContext<FilaContextType | undefined>(undefined);

export function FilaProvider({ children }: { children: ReactNode }) {
  const [atendidosHoje, setAtendidosHoje] = useState(0);
  const [fila, setFila] = useState<ClienteFila[]>([
    {
      id: "1",
      nome: "João Silva",
      pessoas: 2,
      whatsapp: "11999999999",
      observacoes: "Mesa externa",
      posicao: 1,
      horaChegada: Date.now() - 600000,
    },
    {
      id: "2",
      nome: "Maria Souza",
      pessoas: 4,
      whatsapp: "11888888888",
      observacoes: "Cadeira de bebê",
      posicao: 2,
      horaChegada: Date.now() - 300000,
    },
  ]);

  const adicionarCliente = (cliente: ClienteFila) => {
    setFila((atual) => [...atual, cliente]);
  };

  // Remover = cliente foi sentado (atendido)
  const removerCliente = (id: string) => {
    if (!fila.some((c) => c.id === id)) return;
    setAtendidosHoje((n) => n + 1);
    setFila((atual) =>
      atual
        .filter((c) => c.id !== id)
        .map((c, index) => ({ ...c, posicao: index + 1 })),
    );
  };

  return (
    <FilaContext.Provider
      value={{ fila, atendidosHoje, adicionarCliente, removerCliente }}
    >
      {children}
    </FilaContext.Provider>
  );
}

export function useFila() {
  const context = useContext(FilaContext);
  if (!context) {
    throw new Error("useFila deve ser usado dentro de FilaProvider");
  }
  return context;
}
