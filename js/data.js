/**
 * CONFIGURAÇÃO CENTRAL DO PORTFÓLIO — GABRIEL CASTRO CAVALCANTE
 * ---------------------------------------------------------------------------
 * Edite apenas este arquivo para atualizar seus contatos, foto e projetos.
 * Não usa "export/import" de propósito para funcionar até abrindo o index.html
 * direto no navegador (file://).
 */

window.PORTFOLIO_CONFIG = {
  // 1. DADOS PESSOAIS E CONTATO
  name: "Gabriel Castro Cavalcante",
  shortName: "Gabriel Castro",
  role: "Criador de Sites",
  location: "Brasil",

  // IMPORTANTE: Troque pelo seu DDD + número real (somente dígitos, com 55 na frente).
  // Exemplo: "5511987654321"
  whatsappNumber: "5583987514931",
  defaultWhatsappMessage:
    "Olá Gabriel! Vi seu portfólio e gostaria de fazer um orçamento de site.",

  email: "gabriel.ccavalcante@gmail.com",
  instagram: "https://instagram.com/gabrielc.dev476",
  instagramHandle: "@gabrielc.dev476",
  linkedin: "https://www.linkedin.com/in/gabriel-castro-298154209/",
  github: "https://github.com/Gabrielc476",

  // Opcional: coloque o caminho da sua foto, ex: "assets/gabriel.jpg".
  // Enquanto estiver vazio (""), aparece o emblema ilustrado "GC".
  photoUrl: "assets/prof g op 2.png",

  // 2. VITRINE DE PROJETOS (carrossel interativo em largura total)
  // Sempre que tiver um novo site no ar, basta preencher `liveUrl`
  // para ele aparecer navegável ao vivo dentro da vitrine.
  projects: [
    {
      id: "psi-lais-souza",
      title: "Psi. Laís Souza",
      category: "Psicologia & Saúde",
      tagColor: "green",
      domain: "psicologa-lais-souza.vercel.app",
      liveUrl: "https://psicologa-lais-souza.vercel.app/",
      screenshot: "assets/psi-lais-souza.jpg",
      summary:
        "Site completo e acolhedor com áreas de atendimento, apresentação profissional, dúvidas frequentes e mensagem pronta para o WhatsApp.",
      highlights: [
        "Mensagem pronta pro WhatsApp",
        "Seção tira-dúvidas interativa",
        "Perfeito no celular e PC",
      ],
    },
    {
      id: "eixo-23-arquitetura",
      title: "EIXO 23 Arquitetura (Modelo de exemplo)",
      category: "Arquitetura · Exemplo demonstrativo",
      tagColor: "blue",
      domain: "arquitetura-template-five.vercel.app",
      liveUrl: "https://arquitetura-template-five.vercel.app/",
      screenshot: "",
      summary:
        "Site demonstrativo criado como exemplo para arquitetos e escritórios — inclui comparador de foto e planta baixa, modo Blueprint e simulador interativo de projeto.",
      highlights: [
        "Comparador foto × planta",
        "Simulador de projeto",
        "Exemplo pronto para adaptar",
      ],
    },
  ],
};
