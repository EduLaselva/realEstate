// Script para inicializar dados de exemplo no sistema
// Execute este script apenas uma vez para popular o sistema com dados iniciais

function initializeExampleData() {
    // Verificar se já existem dados
    const existingUsers = localStorage.getItem('realStateUsers');
    if (existingUsers && JSON.parse(existingUsers).length > 0) {
        console.log('Dados já existem. Use clearData() para limpar antes de inicializar novamente.');
        return;
    }
    
    // Criar usuário administrador
    const adminUser = {
        id: 1000,
        nome: 'Administrador',
        email: 'admin@realstate.com',
        telefone: '(11) 99999-9999',
        password: 'admin123',
        tipo: 'admin',
        dataCadastro: new Date().toISOString()
    };
    
    // Criar alguns usuários clientes de exemplo
    const exampleUsers = [
        adminUser,
        {
            id: 1001,
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            telefone: '(11) 98888-8888',
            password: '123456',
            tipo: 'cliente',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 1002,
            nome: 'Maria Santos',
            email: 'maria.santos@email.com',
            telefone: '(11) 97777-7777',
            password: '123456',
            tipo: 'cliente',
            dataCadastro: new Date().toISOString()
        }
    ];
    
    // Criar imóveis de exemplo
    const exampleProperties = [
        {
            id: 1,
            endereco: 'Rua Augusta, 456 - Vila Madalena, São Paulo - SP',
            preco: 3500,
            quartos: 2,
            banheiros: 1,
            area: 70,
            tipo: 'apartamento',
            descricao: 'Apartamento moderno com 2 quartos, sala ampla, cozinha americana e vaga de garagem. Próximo ao metrô.',
            imagem: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Destaque',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 2,
            endereco: 'Av. Brigadeiro Faria Lima, 1011 - Itaim Bibi, São Paulo - SP',
            preco: 5800,
            quartos: 3,
            banheiros: 2,
            area: 95,
            tipo: 'apartamento',
            descricao: 'Apartamento de alto padrão com 3 suítes, varanda gourmet, 2 vagas e lazer completo.',
            imagem: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Luxo',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 3,
            endereco: 'Rua Ibirapuera, 1213 - Moema, São Paulo - SP',
            preco: 8200,
            quartos: 3,
            banheiros: 3,
            area: 130,
            tipo: 'apartamento',
            descricao: 'Cobertura duplex com vista panorâmica, piscina privativa, 3 suítes e 3 vagas.',
            imagem: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Luxo',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 4,
            endereco: 'Rua Oscar Freire, 789 - Jardins, São Paulo - SP',
            preco: 4200,
            quartos: 2,
            banheiros: 2,
            area: 85,
            tipo: 'apartamento',
            descricao: 'Apartamento reformado com 2 suítes, armários planejados e varanda. Condomínio com academia.',
            imagem: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Novo',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 5,
            endereco: 'Av. Paulista, 2100 - Cerqueira César, São Paulo - SP',
            preco: 2800,
            quartos: 1,
            banheiros: 1,
            area: 45,
            tipo: 'kitnet',
            descricao: 'Studio moderno com área integrada, armários embutidos e portaria 24h. Ideal para jovens profissionais.',
            imagem: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: '',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 6,
            endereco: 'Rua Haddock Lobo, 567 - Pinheiros, São Paulo - SP',
            preco: 6500,
            quartos: 4,
            banheiros: 3,
            area: 150,
            tipo: 'casa',
            descricao: 'Casa sobrado com 4 quartos, sendo 2 suítes, quintal com churrasqueira e 2 vagas de garagem.',
            imagem: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Destaque',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 7,
            endereco: 'Av. Rebouças, 3355 - Pinheiros, São Paulo - SP',
            preco: 7200,
            quartos: 0,
            banheiros: 2,
            area: 120,
            tipo: 'comercial',
            descricao: 'Sala comercial ampla com recepção, 3 salas privativas, copa e 2 banheiros. Prédio moderno.',
            imagem: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: '',
            dataCadastro: new Date().toISOString()
        },
        {
            id: 8,
            endereco: 'Rua Estados Unidos, 890 - Jardim América, São Paulo - SP',
            preco: 9500,
            quartos: 4,
            banheiros: 4,
            area: 180,
            tipo: 'casa',
            descricao: 'Casa de luxo com 4 suítes, piscina, sauna, espaço gourmet e 4 vagas. Bairro nobre.',
            imagem: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            classificacao: 'Luxo',
            dataCadastro: new Date().toISOString()
        }
    ];
    
    // Criar algumas mensagens de exemplo
    const exampleMessages = [
        {
            id: Date.now(),
            remetenteId: 1001,
            remetente: 'João Silva',
            assunto: 'Interesse no apartamento na Vila Madalena',
            mensagem: 'Olá, gostaria de agendar uma visita ao apartamento da Rua Augusta, 456. Tenho interesse em alugar.',
            data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            lida: false,
            imovelId: 1
        },
        {
            id: Date.now() + 1,
            remetenteId: 1002,
            remetente: 'Maria Santos',
            assunto: 'Dúvida sobre condomínio',
            mensagem: 'Boa tarde! O apartamento no Itaim Bibi possui lazer completo? Qual o valor do condomínio?',
            data: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            lida: false,
            imovelId: 2
        }
    ];
    
    // Criar algumas notificações de exemplo
    const exampleNotifications = [
        {
            id: Date.now(),
            titulo: 'Bem-vindo ao Sistema',
            mensagem: 'Sistema inicializado com dados de exemplo. Explore as funcionalidades!',
            data: new Date().toISOString(),
            lida: false
        },
        {
            id: Date.now() + 1,
            titulo: 'Novos Imóveis Cadastrados',
            mensagem: '8 novos imóveis foram adicionados ao sistema.',
            data: new Date().toISOString(),
            lida: false
        }
    ];
    
    // Salvar dados no localStorage
    localStorage.setItem('realStateUsers', JSON.stringify(exampleUsers));
    localStorage.setItem('realStateProperties', JSON.stringify(exampleProperties));
    localStorage.setItem('realStateMessages', JSON.stringify(exampleMessages));
    localStorage.setItem('realStateNotifications', JSON.stringify(exampleNotifications));
    localStorage.setItem('realStateContracts', JSON.stringify([]));
    
    console.log('✅ Dados de exemplo inicializados com sucesso!');
    console.log('');
    console.log('📋 Credenciais de Acesso:');
    console.log('');
    console.log('ADMINISTRADOR:');
    console.log('  Email: admin@realstate.com');
    console.log('  Senha: admin123');
    console.log('');
    console.log('CLIENTE DE TESTE:');
    console.log('  Email: joao.silva@email.com');
    console.log('  Senha: 123456');
    console.log('');
    console.log(`Total de imóveis: ${exampleProperties.length}`);
    console.log(`Total de usuários: ${exampleUsers.length}`);
    console.log(`Total de mensagens: ${exampleMessages.length}`);
    
    alert('✅ Sistema inicializado com sucesso!\n\n' +
          'ADMINISTRADOR:\n' +
          'Email: admin@realstate.com\n' +
          'Senha: admin123\n\n' +
          'CLIENTE DE TESTE:\n' +
          'Email: joao.silva@email.com\n' +
          'Senha: 123456\n\n' +
          'Recarregue a página para ver os dados.');
    
    return {
        users: exampleUsers.length,
        properties: exampleProperties.length,
        messages: exampleMessages.length
    };
}

function clearData() {
    if (confirm('⚠️ ATENÇÃO: Isso irá apagar TODOS os dados do sistema!\n\nDeseja continuar?')) {
        localStorage.removeItem('realStateUsers');
        localStorage.removeItem('realStateLoggedInUser');
        localStorage.removeItem('realStateProperties');
        localStorage.removeItem('realStateMessages');
        localStorage.removeItem('realStateContracts');
        localStorage.removeItem('realStateNotifications');
        
        console.log('🗑️ Todos os dados foram removidos.');
        alert('Dados limpos! Recarregue a página.');
    }
}

// Executar automaticamente ao carregar a página
console.log('==========================================');
console.log('  REAL STATE - SISTEMA DE INICIALIZAÇÃO  ');
console.log('==========================================');
console.log('');
console.log('Digite no console:');
console.log('  initializeExampleData() - Para criar dados de exemplo');
console.log('  clearData() - Para limpar todos os dados');
console.log('');
