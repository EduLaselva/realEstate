// Real State - Aplicação Principal
const API_URL = 'http://localhost/projetoRealEstate/api';

// Dados de imóveis (10 imóveis com preços variados)
const imoveis = [
    {
        id: 1,
        imagem: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 2500,
        endereco: 'Rua das Flores, 123 - Jardim Paulista, São Paulo',
        quartos: 2,
        banheiros: 1,
        area: 65,
        status: 'disponivel'
    },
    {
        id: 2,
        imagem: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 3800,
        endereco: 'Av. Paulista, 1500 - Bela Vista, São Paulo',
        quartos: 3,
        banheiros: 2,
        area: 85,
        status: 'disponivel'
    },
    {
        id: 3,
        imagem: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 5200,
        endereco: 'Rua Augusta, 789 - Consolação, São Paulo',
        quartos: 3,
        banheiros: 2,
        area: 95,
        status: 'alugado'
    },
    {
        id: 4,
        imagem: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 1800,
        endereco: 'Rua Vergueiro, 456 - Vila Mariana, São Paulo',
        quartos: 1,
        banheiros: 1,
        area: 45,
        status: 'disponivel'
    },
    {
        id: 5,
        imagem: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 7500,
        endereco: 'Rua Haddock Lobo, 250 - Cerqueira César, São Paulo',
        quartos: 4,
        banheiros: 3,
        area: 150,
        status: 'disponivel'
    },
    {
        id: 6,
        imagem: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 4200,
        endereco: 'Rua dos Pinheiros, 890 - Pinheiros, São Paulo',
        quartos: 2,
        banheiros: 2,
        area: 78,
        status: 'disponivel'
    },
    {
        id: 7,
        imagem: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 9800,
        endereco: 'Av. Faria Lima, 3000 - Itaim Bibi, São Paulo',
        quartos: 4,
        banheiros: 4,
        area: 180,
        status: 'disponivel'
    },
    {
        id: 8,
        imagem: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 3200,
        endereco: 'Rua Oscar Freire, 567 - Jardins, São Paulo',
        quartos: 2,
        banheiros: 1,
        area: 70,
        status: 'alugado'
    },
    {
        id: 9,
        imagem: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 6500,
        endereco: 'Rua Bela Cintra, 1234 - Consolação, São Paulo',
        quartos: 3,
        banheiros: 3,
        area: 120,
        status: 'disponivel'
    },
    {
        id: 10,
        imagem: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        preco: 12000,
        endereco: 'Av. Europa, 500 - Jardim Europa, São Paulo',
        quartos: 5,
        banheiros: 4,
        area: 220,
        status: 'disponivel'
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateUserInterface();
    loadProperties();
    attachEventListeners();
}

function attachEventListeners() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Atualizar interface do usuário
function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userNav = document.getElementById('user-nav');
    const loginNav = document.getElementById('login-nav');
    const userDisplayName = document.getElementById('user-display-name');
    
    if (user) {
        if (userNav) userNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'none';
        if (userDisplayName) userDisplayName.textContent = user.nome;
    } else {
        if (userNav) userNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'block';
    }
}

// Carregar propriedades
function loadProperties() {
    const container = document.getElementById('properties-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    imoveis.forEach(imovel => {
        const card = createPropertyCard(imovel);
        container.appendChild(card);
    });
}

// Criar card de propriedade
function createPropertyCard(imovel) {
    const card = document.createElement('div');
    card.className = 'property-card';
    
    const statusBadge = imovel.status === 'alugado' 
        ? '<div class="property-badge" style="background-color: #dc3545;">Indisponível</div>' 
        : '';
    
    const btnDisabled = imovel.status === 'alugado' ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : '';
    
    card.innerHTML = `
        <div class="property-image" style="background-image: url('${imovel.imagem}');">
            ${statusBadge}
        </div>
        <div class="property-info">
            <div class="property-price">R$ ${imovel.preco.toLocaleString('pt-BR')}/mês</div>
            <div class="property-address">${imovel.endereco}</div>
            <div class="property-features">
                <span>${imovel.quartos} quartos</span>
                <span>${imovel.banheiros} banheiros</span>
                <span>${imovel.area}m²</span>
            </div>
            <button class="btn" style="width: 100%; margin-top: 1rem;" 
                    onclick="solicitarAluguel(${imovel.id})" ${btnDisabled}>
                ${imovel.status === 'alugado' ? 'Indisponível' : 'Solicitar Aluguel'}
            </button>
        </div>
    `;
    
    return card;
}

// Solicitar aluguel
async function solicitarAluguel(imovelId) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        alert('Você precisa fazer login para solicitar o aluguel de um imóvel.');
        window.location.href = 'login.html';
        return;
    }
    
    const imovel = imoveis.find(i => i.id === imovelId);
    
    if (imovel.status === 'alugado') {
        alert('Este imóvel não está disponível.');
        return;
    }
    
    if (confirm(`Deseja solicitar o aluguel do imóvel:\n${imovel.endereco}\n\nVocê será redirecionado para conversar com o proprietário.`)) {
        // Redirecionar para o chat
        localStorage.setItem('chatImovelId', imovelId);
        window.location.href = 'chat.html';
    }
}

// Logout
function handleLogout() {
    localStorage.removeItem('user');
    updateUserInterface();
    alert('Logout realizado com sucesso!');
    window.location.href = 'index.html';
}

// Modal utilities
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}
