# 🏢 Real State - Sistema Imobiliário

Sistema completo de gestão imobiliária com funcionalidades de aluguel, chat e administração.

## 📋 Funcionalidades

- ✅ **10 Imóveis** cadastrados com preços variados (R$ 1.800 a R$ 12.000)
- ✅ **Sistema de Login/Cadastro** em páginas separadas
- ✅ **Chat em tempo real** entre cliente e proprietário
- ✅ **Painel do Proprietário** com acesso a todos os imóveis
- ✅ **Status de Imóveis** (Disponível/Indisponível)
- ✅ **Integração com MySQL** via PHP
- ✅ **Design Responsivo** e moderno

## 🚀 Como Executar o Projeto

### 1) Instalar e iniciar o XAMPP
- Baixe: https://www.apachefriends.org/pt_br/index.html
- Instale com componentes padrão (Apache e MySQL).
- Abra o XAMPP Control Panel e clique em:
  - Start no Apache
  - Start no MySQL
- Este guia usa MySQL na porta padrão 3306.

### 2) Preparar a pasta do projeto
- Copie a pasta `projetoRealEstate/` para `C:\xampp\htdocs\projetoRealEstate`.
- Teste no navegador: http://localhost/projetoRealEstate/index.html

### 3) Criar e popular o banco de dados (MySQL)
- Acesse o phpMyAdmin: http://localhost/phpmyadmin
- Clique em Importar → selecione `database_setup.sql` → Executar.
- O script cria o banco `real_state_tcc`, tabelas e dados de exemplo.

### 4) Configurar a conexão no PHP
- Edite `config/database.php` e confirme:
```php
private $host = "localhost";
private $port = "3306";
private $db_name = "real_state_tcc";
private $username = "root";
private $password = ""; // defina se seu MySQL tiver senha
```
- Se o usuário root tiver senha, preencha `private $password`.

### 5) Confirmar URLs da API no frontend
- As páginas usam `API_URL = 'http://localhost/projetoRealEstate/api'`.
- Se renomear a pasta do projeto, ajuste a constante `API_URL` em:
  - `login.html`, `cadastro.html`, `chat.html`, `proprietario.html`.

### 6) Ordem de testes recomendada
1. Acesse `index.html` e verifique os imóveis.
2. Acesse `login.html`:
   - Entre como proprietário (admin) para ver o painel.
   - Entre como cliente para solicitar aluguel.
3. Acesse `cadastro.html` e crie um cliente (opcional).
4. Como cliente, clique em “Solicitar Aluguel” → redireciona para `chat.html`.
5. Como proprietário, abra `proprietario.html` para ver mensagens e alternar status dos imóveis.

### 7) Dicas de diagnóstico
- API com erro: revise `config/database.php` e se o banco existe no phpMyAdmin.
- Erro 404 na API: confirme pasta `api/` dentro de `C:\xampp\htdocs\projetoRealEstate\api` e `API_URL` correta.
- Login falhando: verifique registros na tabela `usuario`.

### 8) Acesso rápido às páginas
- Site: http://localhost/projetoRealEstate/index.html
- Login: http://localhost/projetoRealEstate/login.html
- Cadastro: http://localhost/projetoRealEstate/cadastro.html
- Chat: http://localhost/projetoRealEstate/chat.html
- Proprietário: http://localhost/projetoRealEstate/proprietario.html

### 9) Segurança básica (opcional para TCC)
- Não use senha vazia em produção; configure senha do MySQL e atualize `database.php`.
- Use hashing de senha (`password_hash`/`password_verify`) nas APIs de cadastro e login.

## 👤 Credenciais de Acesso

### Proprietário (Admin)
- **Email**: admin@realstate.com
- **Senha**: admin123
- **Acesso**: Painel do proprietário com todos os imóveis

### Cliente de Teste
- **Email**: joao.silva@email.com
- **Senha**: 123456
- **Acesso**: Visualização e solicitação de aluguel

## 📁 Estrutura do Projeto

```
projetoRealEstate/
├── index.html              # Página principal
├── login.html              # Página de login
├── cadastro.html           # Página de cadastro
├── chat.html               # Sistema de chat
├── proprietario.html       # Painel do proprietário
├── app.js                  # JavaScript principal
├── styles.css              # Estilos
├── database_setup.sql      # Script de criação do BD
├── config/
│   └── database.php        # Configuração do banco
└── api/
    ├── login.php           # API de login
    ├── cadastro.php        # API de cadastro
    ├── imoveis.php         # API de imóveis
    ├── mensagens.php       # API de mensagens
    ├── solicitar_aluguel.php
    └── atualizar_status_imovel.php
```

## 🏠 Imóveis Disponíveis

| ID | Endereço | Preço | Status |
|----|----------|-------|--------|
| 1 | Rua das Flores, 123 - Jardim Paulista | R$ 2.500 | Disponível |
| 2 | Av. Paulista, 1500 - Bela Vista | R$ 3.800 | Disponível |
| 3 | Rua Augusta, 789 - Consolação | R$ 5.200 | **Alugado** |
| 4 | Rua Vergueiro, 456 - Vila Mariana | R$ 1.800 | Disponível |
| 5 | Rua Haddock Lobo, 250 - Cerqueira César | R$ 7.500 | Disponível |
| 6 | Rua dos Pinheiros, 890 - Pinheiros | R$ 4.200 | Disponível |
| 7 | Av. Faria Lima, 3000 - Itaim Bibi | R$ 9.800 | Disponível |
| 8 | Rua Oscar Freire, 567 - Jardins | R$ 3.200 | **Alugado** |
| 9 | Rua Bela Cintra, 1234 - Consolação | R$ 6.500 | Disponível |
| 10 | Av. Europa, 500 - Jardim Europa | R$ 12.000 | Disponível |

## 💬 Fluxo de Uso

1. **Cliente** acessa o site e visualiza os imóveis
2. Cliente faz **cadastro** ou **login**
3. Cliente clica em "Solicitar Aluguel"
4. Cliente é redirecionado para o **chat**
5. Cliente conversa com o **proprietário**
6. **Proprietário** (admin@realstate.com) acessa o painel
7. Proprietário visualiza todas as **mensagens**
8. Proprietário gerencia **status dos imóveis** (disponível/alugado)

## 🔧 Configurações Importantes

### Alterar URL da API
Se o projeto estiver em outra pasta, edite em todos os arquivos HTML:
```javascript
const API_URL = 'http://localhost/NOME_DA_PASTA/api';
```

**Desenvolvido para o TCC - Real State Imobiliária** 🏡
