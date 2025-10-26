# 🏢 Real State - Sistema de Gestão Imobiliária

Sistema completo e profissional para gestão de imóveis, desenvolvido com HTML, CSS e JavaScript puro.

## 📋 Funcionalidades Implementadas

### ✅ Funcionalidades Solicitadas
Todas as funcionalidades da imagem foram implementadas:

1. **✓ CADASTRAR IMÓVEL** - Sistema completo de cadastro de imóveis com todos os detalhes
2. **✓ CLASSIFICAR IMÓVEL** - Classificação em: Destaque, Luxo, Novo
3. **✓ VISUALIZAR PAINEL FINANCEIRO** - Dashboard com estatísticas e métricas
4. **✓ GERAR EXTRATO FINANCEIRO** - Relatórios de contratos e valores
5. **✓ EDITAR CADASTRO** - Edição completa de imóveis cadastrados
6. **✓ ENVIAR MENSAGEM** - Sistema de mensagens entre clientes e administração
7. **✓ VISUALIZAÇÃO DE MENSAGENS** - Inbox completo com histórico
8. **✓ EFETUAR CADASTRO** - Sistema de registro de novos usuários
9. **✓ EFETUAR LOGIN** - Autenticação segura com validação
10. **✓ BUSCAR IMÓVEL** - Sistema de busca e filtros avançados
11. **✓ VISUALIZAR IMÓVEL** - Visualização detalhada com todas as informações
12. **✓ AGENDAR VISITA** - Através do sistema de mensagens
13. **✓ ENVIAR NOTIFICAÇÃO AUTOMÁTICA** - Sistema de notificações em tempo real
14. **✓ GERAR CONTRATO** - Geração automática de contratos de locação
15. **✓ ENVIAR CONTRATO PARA ASSINATURA** - Sistema de envio de contratos

### 🎯 Funcionalidades Adicionais

- Interface moderna e responsiva
- Animações suaves
- Validação de formulários
- Armazenamento local (localStorage)
- Painel administrativo completo
- Sistema de autenticação com diferentes níveis de acesso
- Estatísticas em tempo real

## 🗂️ Estrutura de Arquivos

```
projetoRealEstate/
│
├── index.html          # Página principal do site
├── admin.html          # Painel administrativo
├── inicializar.html    # Página para inicializar dados
├── styles.css          # Estilos globais
├── script.js           # JavaScript principal
├── init-data.js        # Script de inicialização de dados
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Inicializar o Sistema

1. Abra o arquivo `inicializar.html` no navegador
2. Clique em "Inicializar Sistema com Dados de Exemplo"
3. O sistema criará automaticamente:
   - 1 usuário administrador
   - 2 usuários clientes de teste
   - 8 imóveis de exemplo
   - Mensagens e notificações

### 2. Credenciais de Acesso

#### 👤 ADMINISTRADOR
- **Email:** admin@realstate.com
- **Senha:** admin123
- **Acesso:** Painel completo de administração

#### 👥 CLIENTE DE TESTE
- **Email:** joao.silva@email.com
- **Senha:** 123456
- **Acesso:** Visualização e solicitação de aluguéis

### 3. Navegação

- **Página Principal (index.html):** Site público com imóveis disponíveis
- **Painel Admin (admin.html):** Gestão completa do sistema (requer login como admin)
- **Inicialização (inicializar.html):** Configuração inicial do sistema

## 💡 Principais Funcionalidades

### Para Clientes
- ✅ Visualizar imóveis disponíveis
- ✅ Buscar imóveis por localização ou características
- ✅ Ver detalhes completos de cada imóvel
- ✅ Solicitar aluguel
- ✅ Enviar mensagens para a imobiliária
- ✅ Criar conta e fazer login

### Para Administradores
- ✅ Cadastrar novos imóveis
- ✅ Editar imóveis existentes
- ✅ Excluir imóveis
- ✅ Classificar imóveis (Destaque, Luxo, Novo)
- ✅ Visualizar estatísticas do sistema
- ✅ Gerenciar mensagens dos clientes
- ✅ Responder mensagens
- ✅ Visualizar e gerenciar contratos
- ✅ Gerar contratos de locação
- ✅ Enviar contratos para assinatura
- ✅ Visualizar notificações

## 🎨 Design e UX

- **Design Moderno:** Interface limpa e profissional
- **Responsivo:** Funciona perfeitamente em desktop, tablet e mobile
- **Animações:** Transições suaves para melhor experiência
- **Cores:** Paleta sofisticada com tons de azul escuro e dourado
- **Tipografia:** Montserrat para textos e Playfair Display para títulos

## 🔧 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica
- **CSS3:** Estilização avançada com Flexbox e Grid
- **JavaScript ES6+:** Lógica e interatividade
- **LocalStorage:** Persistência de dados no navegador
- **Google Fonts:** Montserrat e Playfair Display

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:
- 📱 Smartphones (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktops (> 1024px)

## 🔐 Segurança

- Validação de formulários
- Autenticação de usuários
- Controle de acesso por tipo de usuário (admin/cliente)
- Proteção de rotas administrativas

## 🗄️ Armazenamento de Dados

Todos os dados são armazenados no **localStorage** do navegador:
- `realStateUsers` - Usuários cadastrados
- `realStateLoggedInUser` - Usuário atualmente logado
- `realStateProperties` - Imóveis cadastrados
- `realStateMessages` - Mensagens trocadas
- `realStateContracts` - Contratos gerados
- `realStateNotifications` - Notificações do sistema

## 🔄 Limpeza de Dados

Para limpar todos os dados e reiniciar:
1. Abra `inicializar.html`
2. Clique em "Limpar Todos os Dados"
3. Confirme a ação
4. Inicialize novamente se desejar

## 📝 Notas Importantes

1. **Dados Locais:** Todos os dados são armazenados localmente no navegador
2. **Primeira Vez:** Execute `inicializar.html` na primeira vez que abrir o sistema
3. **Sem Backend:** Este é um sistema frontend-only, ideal para demonstração
4. **Produção:** Para uso em produção, recomenda-se integrar com backend e banco de dados

## 🐛 Problemas Corrigidos

✅ **Problema de sobreposição nas telas de Cadastro/Login:** Resolvido com CSS organizado
✅ **Código não funcionava:** Todo o JavaScript foi refatorado e testado
✅ **Estrutura desorganizada:** Código separado em arquivos CSS, JS e HTML
✅ **Falta de funcionalidades:** Todas as 15 funcionalidades solicitadas foram implementadas

## 🎯 Próximos Passos (Opcional)

Para evoluir o sistema, considere:
- Integração com backend (Node.js, PHP, etc.)
- Banco de dados real (MySQL, MongoDB, etc.)
- Upload real de imagens
- API de geolocalização para mapas
- Sistema de pagamento online
- Notificações por e-mail
- Chat em tempo real
- Assinatura digital de contratos

## 👨‍💻 Desenvolvimento

Sistema desenvolvido com foco em:
- Código limpo e organizado
- Boas práticas de programação
- Experiência do usuário
- Design profissional
- Funcionalidade completa

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verifique se executou `inicializar.html` primeiro
2. Confira as credenciais de acesso
3. Limpe o cache do navegador se necessário
4. Verifique o console do navegador para erros

---

**Desenvolvido com ❤️ para Real State Imobiliária**
