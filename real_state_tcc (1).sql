-- phpMyAdmin SQL Dump
-- version 4.7.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: 19-Out-2025 às 21:04
-- Versão do servidor: 5.6.34
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `real_state_tcc`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `contrato`
--

CREATE TABLE `contrato` (
  `id` int(11) NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date NOT NULL,
  `texto_contrato` text NOT NULL,
  `id_imovel` int(11) NOT NULL,
  `id_locador` int(11) NOT NULL,
  `id_locatario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `credito`
--

CREATE TABLE `credito` (
  `id` int(11) NOT NULL,
  `dataCredito` date NOT NULL,
  `valor_credito` decimal(10,2) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `id_extrato` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `extrato_financeiro`
--

CREATE TABLE `extrato_financeiro` (
  `id` int(11) NOT NULL,
  `dataEmissao` date NOT NULL,
  `id_locador` int(11) NOT NULL,
  `total_credito` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `imovel`
--

CREATE TABLE `imovel` (
  `id` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(50) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `estado` char(2) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `descricao` text,
  `id_corretor` int(11) NOT NULL,
  `id_locador` int(11) NOT NULL,
  `status` enum('disponivel','alugado','em negociação') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `mensagem`
--

CREATE TABLE `mensagem` (
  `id` int(11) NOT NULL,
  `conteudo` text NOT NULL,
  `dataEnvio` datetime NOT NULL,
  `id_remetente` int(11) NOT NULL,
  `id_destinatario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `painel_financeiro`
--

CREATE TABLE `painel_financeiro` (
  `id` int(11) NOT NULL,
  `id_locador` int(11) NOT NULL,
  `saldo_credito` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `tipo` enum('corretor','locador','locatario') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `visita_agendada`
--

CREATE TABLE `visita_agendada` (
  `id` int(11) NOT NULL,
  `dataHora` datetime NOT NULL,
  `imovel_id` int(11) NOT NULL,
  `id_locatario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contrato`
--
ALTER TABLE `contrato`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contr_imovel` (`id_imovel`),
  ADD KEY `fk_contr_locador` (`id_locador`),
  ADD KEY `fk_contr_locatario` (`id_locatario`);

--
-- Indexes for table `credito`
--
ALTER TABLE `credito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_credito_extrato` (`id_extrato`);

--
-- Indexes for table `extrato_financeiro`
--
ALTER TABLE `extrato_financeiro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ext_financ_locador` (`id_locador`);

--
-- Indexes for table `imovel`
--
ALTER TABLE `imovel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_imovel_corretor` (`id_corretor`),
  ADD KEY `fk_imovel_locador` (`id_locador`);

--
-- Indexes for table `mensagem`
--
ALTER TABLE `mensagem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_msg_remetente` (`id_remetente`),
  ADD KEY `fk_msg_destinatario` (`id_destinatario`);

--
-- Indexes for table `painel_financeiro`
--
ALTER TABLE `painel_financeiro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_painel_financ_locador` (`id_locador`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visita_agendada`
--
ALTER TABLE `visita_agendada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vis_agend_imovel` (`imovel_id`),
  ADD KEY `fk_vis_afend_locatario` (`id_locatario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contrato`
--
ALTER TABLE `contrato`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `credito`
--
ALTER TABLE `credito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `extrato_financeiro`
--
ALTER TABLE `extrato_financeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `imovel`
--
ALTER TABLE `imovel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mensagem`
--
ALTER TABLE `mensagem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `painel_financeiro`
--
ALTER TABLE `painel_financeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visita_agendada`
--
ALTER TABLE `visita_agendada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `fk_contr_imovel` FOREIGN KEY (`id_imovel`) REFERENCES `imovel` (`id`),
  ADD CONSTRAINT `fk_contr_locador` FOREIGN KEY (`id_locador`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_contr_locatario` FOREIGN KEY (`id_locatario`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `credito`
--
ALTER TABLE `credito`
  ADD CONSTRAINT `fk_credito_extrato` FOREIGN KEY (`id_extrato`) REFERENCES `extrato_financeiro` (`id`);

--
-- Limitadores para a tabela `extrato_financeiro`
--
ALTER TABLE `extrato_financeiro`
  ADD CONSTRAINT `fk_ext_financ_locador` FOREIGN KEY (`id_locador`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `imovel`
--
ALTER TABLE `imovel`
  ADD CONSTRAINT `fk_imovel_corretor` FOREIGN KEY (`id_corretor`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_imovel_locador` FOREIGN KEY (`id_locador`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `mensagem`
--
ALTER TABLE `mensagem`
  ADD CONSTRAINT `fk_msg_destinatario` FOREIGN KEY (`id_destinatario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_msg_remetente` FOREIGN KEY (`id_remetente`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `painel_financeiro`
--
ALTER TABLE `painel_financeiro`
  ADD CONSTRAINT `fk_painel_financ_locador` FOREIGN KEY (`id_locador`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `visita_agendada`
--
ALTER TABLE `visita_agendada`
  ADD CONSTRAINT `fk_vis_afend_locatario` FOREIGN KEY (`id_locatario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_vis_agend_imovel` FOREIGN KEY (`imovel_id`) REFERENCES `imovel` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
