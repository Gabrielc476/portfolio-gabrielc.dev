# Portfólio — Gabriel Castro Cavalcante

Site comercial leve, direto e com visual neobrutalista, criado em **HTML, CSS e JavaScript puro**.

## Como abrir no computador

Basta dar um clique duplo no arquivo `index.html` para abrir direto no navegador (não precisa instalar nada nem rodar servidor).

## Como personalizar em menos de 2 minutos

Abra o arquivo [`js/data.js`](js/data.js) e edite o bloco `window.PORTFOLIO_CONFIG`:

1. **Seu WhatsApp real**: troque `whatsappNumber` para `"55"` + DDD + número (somente números, ex: `"5511987654321"`).
2. **E-mail e redes**: atualize `email`, `instagram`, `instagramHandle`, `linkedin` e `github`.
3. **Sua foto (opcional)**: coloque sua imagem na pasta `assets/` (ex: `assets/gabriel.jpg`) e preencha `photoUrl: "assets/gabriel.jpg"`. Enquanto estiver vazio `""`, o site mostra o emblema `GC`.
4. **Seus sites reais na vitrine**: dentro da lista `projects`, basta preencher `isRealSite: true`, `liveUrl: "https://..."`, `domain` e `sections` (os links `#...` das seções do site) para o novo projeto rodar ao vivo e navegável dentro da vitrine.
