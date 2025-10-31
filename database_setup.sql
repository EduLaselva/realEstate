-- Configuração do Banco de Dados Real State
-- Execute este script para criar as tabelas e inserir dados de exemplo

DROP DATABASE IF EXISTS real_state_tcc;
CREATE DATABASE real_state_tcc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE real_state_tcc;

-- Tabela de Usuários
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('corretor', 'locador', 'locatario') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Imóveis
CREATE TABLE imovel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    quartos INT NOT NULL,
    banheiros INT NOT NULL,
    area DECIMAL(10,2) NOT NULL,
    id_corretor INT,
    id_locador INT NOT NULL,
    status ENUM('disponivel', 'alugado', 'em negociacao') DEFAULT 'disponivel',
    imagem_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_corretor) REFERENCES usuario(id),
    FOREIGN KEY (id_locador) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Mensagens
CREATE TABLE mensagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conteudo TEXT NOT NULL,
    dataEnvio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_remetente INT NOT NULL,
    id_destinatario INT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_remetente) REFERENCES usuario(id),
    FOREIGN KEY (id_destinatario) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Contratos
CREATE TABLE contrato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataInicio DATE NOT NULL,
    dataFim DATE NOT NULL,
    texto_contrato TEXT NOT NULL,
    id_imovel INT NOT NULL,
    id_locador INT NOT NULL,
    id_locatario INT NOT NULL,
    status ENUM('ativo', 'finalizado', 'cancelado') DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_imovel) REFERENCES imovel(id),
    FOREIGN KEY (id_locador) REFERENCES usuario(id),
    FOREIGN KEY (id_locatario) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de Visitas Agendadas
CREATE TABLE visita_agendada (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dataHora DATETIME NOT NULL,
    imovel_id INT NOT NULL,
    id_locatario INT NOT NULL,
    status ENUM('agendada', 'realizada', 'cancelada') DEFAULT 'agendada',
    FOREIGN KEY (imovel_id) REFERENCES imovel(id),
    FOREIGN KEY (id_locatario) REFERENCES usuario(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================
-- INSERÇÃO DE DADOS DE EXEMPLO
-- ========================================

-- Usuário Proprietário (Locador) - Email: admin@realstate.com | Senha: admin123
INSERT INTO usuario (cpf, nome, telefone, email, senha, tipo) VALUES
('12345678900', 'Administrador Real State', '(11) 98765-4321', 'admin@realstate.com', 'admin123', 'locador');

-- Usuários Clientes (Locatários)
INSERT INTO usuario (cpf, nome, telefone, email, senha, tipo) VALUES
('11122233344', 'João da Silva', '(11) 91234-5678', 'joao.silva@email.com', '123456', 'locatario'),
('22233344455', 'Maria Santos', '(11) 92345-6789', 'maria.santos@email.com', '123456', 'locatario'),
('33344455566', 'Pedro Oliveira', '(11) 93456-7890', 'pedro.oliveira@email.com', '123456', 'locatario');

-- Imóveis (10 imóveis com preços variados)
INSERT INTO imovel (rua, numero, complemento, bairro, cidade, estado, cep, valor, descricao, quartos, banheiros, area, id_locador, status, imagem_url) VALUES
('Rua das Flores', '123', 'Apto 45', 'Jardim Paulista', 'São Paulo', 'SP', '01234-567', 2500.00, 'Apartamento aconchegante com 2 quartos, próximo ao metrô', 2, 1, 65.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d'),
('Av. Paulista', '1500', 'Apto 802', 'Bela Vista', 'São Paulo', 'SP', '01310-100', 3800.00, 'Apartamento moderno na Paulista com vista privilegiada', 3, 2, 85.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198'),
('Rua Augusta', '789', 'Apto 1203', 'Consolação', 'São Paulo', 'SP', '01305-100', 5200.00, 'Apartamento de alto padrão, totalmente mobiliado', 3, 2, 95.00, 1, 'alugado', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea'),
('Rua Vergueiro', '456', 'Apto 23', 'Vila Mariana', 'São Paulo', 'SP', '04101-000', 1800.00, 'Kitnet perfeita para quem busca praticidade', 1, 1, 45.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'),
('Rua Haddock Lobo', '250', 'Apto 1501', 'Cerqueira César', 'São Paulo', 'SP', '01414-001', 7500.00, 'Apartamento luxuoso com 4 suítes e varanda gourmet', 4, 3, 150.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68'),
('Rua dos Pinheiros', '890', 'Apto 704', 'Pinheiros', 'São Paulo', 'SP', '05422-001', 4200.00, 'Apartamento moderno em localização privilegiada', 2, 2, 78.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'),
('Av. Faria Lima', '3000', 'Apto 2001', 'Itaim Bibi', 'São Paulo', 'SP', '01452-000', 9800.00, 'Cobertura duplex com piscina privativa', 4, 4, 180.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115'),
('Rua Oscar Freire', '567', 'Apto 301', 'Jardins', 'São Paulo', 'SP', '01426-001', 3200.00, 'Apartamento charmoso nos Jardins', 2, 1, 70.00, 1, 'alugado', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea'),
('Rua Bela Cintra', '1234', 'Apto 905', 'Consolação', 'São Paulo', 'SP', '01415-002', 6500.00, 'Apartamento espaçoso com 3 suítes', 3, 3, 120.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4'),
('Av. Europa', '500', 'Cobertura', 'Jardim Europa', 'São Paulo', 'SP', '01449-000', 12000.00, 'Cobertura de luxo com 5 suítes e área de lazer completa', 5, 4, 220.00, 1, 'disponivel', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c');

-- Mensagens de exemplo
INSERT INTO mensagem (conteudo, dataEnvio, id_remetente, id_destinatario) VALUES
('Olá! Gostaria de mais informações sobre o imóvel na Rua das Flores.', NOW(), 2, 1),
('Tenho interesse em agendar uma visita ao apartamento na Av. Paulista.', NOW(), 3, 1);

COMMIT;
