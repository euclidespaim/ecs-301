const sistemaLab = {
    nome: "Laboratório de Informática 01",
    escola: "EEM Elfrida Cristino",
    responsavel: "Prof. Euclides Paim",
    setor: "Tecnologia",
    
    equipamentos: [
        { id: 101, tipo: "Desktop", marca: "Dell", horasUso: 450, status: "ativo" },
        { id: 102, tipo: "Notebook", marca: "Lenovo", horasUso: 120, status: "ativo" },
        { id: 103, tipo: "Impressora 3D", marca: "Creality", horasUso: 600, status: "manutencao" },
        { id: 104, tipo: "Monitor", marca: "LG", horasUso: 850, status: "ativo" },
        { id: 105, tipo: "Desktop", marca: "HP", horasUso: 300, status: "ativo" }
    ],

    // Método sem parâmetros: Usa o 'this' para acessar seus próprios dados
    contarEquipamentos() {
        return this.equipamentos.length;
    },

    // Método com parâmetros: Lógica de negócio baseada em uso
    verificarSaude(horas) {
        if (horas > 500) return "⚠️ Manutenção Urgente";
        if (horas > 300) return "🟡 Revisão Necessária";
        return "✅ Equipamento OK";
    }
};