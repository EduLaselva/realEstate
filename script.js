// Sistema Real Estate - JavaScript Principal

// ==================== BASE DE DADOS ====================
let usersDB = JSON.parse(localStorage.getItem('realStateUsers')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('realStateLoggedInUser')) || null;
let propertiesDB = JSON.parse(localStorage.getItem('realStateProperties')) || [];
let messagesDB = JSON.parse(localStorage.getItem('realStateMessages')) || [];
let contractsDB = JSON.parse(localStorage.getItem('realStateContracts')) || [];
let notificationsDB = JSON.parse(localStorage.getItem('realStateNotifications')) || [];

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    updateUserInterface();
    
    if (window.location.pathname.includes('admin.html')) {
        if (!loggedInUser || loggedInUser.tipo !== 'admin') {
            alert('Acesso negado! Faça login como administrador.');
            window.location.href = 'index.html';
            return;
        }
        loadAdminDashboard();
    }
    
    attachEventListeners();
    loadProperties();
    loadNotifications();
}

function attachEventListeners() {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (cadastroForm) cadastroForm.addEventListener('submit', handleCadastro);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
}

// ==================== AUTENTICAÇÃO ====================
function updateUserInterface() {
    const userNav = document.getElementById('user-nav');
    const loginNav = document.getElementById('login-nav');
    const userDisplayName = document.getElementById('user-display-name');
    
    if (loggedInUser) {
        if (userNav) userNav.style.display = 'block';
        if (loginNav) loginNav.style.display = 'none';
        if (userDisplayName) userDisplayName.textContent = loggedInUser.nome;
    } else {
        if (userNav) userNav.style.display = 'none';
        if (loginNav) loginNav.style.display = 'block';
    }
}

function openAuthTab(tabName) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(`${tabName}-form`).classList.add('active');
    event.currentTarget.classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const user = usersDB.find(u => u.email === email && u.password === password);
    
    if (user) {
        loggedInUser = user;
        localStorage.setItem('realStateLoggedInUser', JSON.stringify(user));
        updateUserInterface();
        showAlert('Login realizado com sucesso!', 'success');
        document.getElementById('login-form').reset();
        
        if (user.tipo === 'admin') {
            setTimeout(() => window.location.href = 'admin.html', 1000);
        }
    } else {
        showAlert('E-mail ou senha incorretos.', 'danger');
    }
}

function handleCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('cadastro-nome').value;
    const email = document.getElementById('cadastro-email').value;
    const telefone = document.getElementById('cadastro-telefone').value;
    const password = document.getElementById('cadastro-password').value;
    const confirmPassword = document.getElementById('cadastro-confirm-password').value;
    
    if (password !== confirmPassword) {
        showAlert('As senhas não coincidem.', 'danger');
        return;
    }
    
    if (usersDB.find(u => u.email === email)) {
        showAlert('E-mail já cadastrado.', 'danger');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        nome, email, telefone, password,
        tipo: 'cliente',
        dataCadastro: new Date().toISOString()
    };
    
    usersDB.push(newUser);
    localStorage.setItem('realStateUsers', JSON.stringify(usersDB));
    showAlert('Cadastro realizado! Faça login para continuar.', 'success');
    document.getElementById('cadastro-form').reset();
    setTimeout(() => openAuthTab('login'), 1500);
}

function handleLogout() {
    loggedInUser = null;
    localStorage.removeItem('realStateLoggedInUser');
    updateUserInterface();
    showAlert('Logout realizado!', 'success');
    
    if (window.location.pathname.includes('admin.html')) {
        setTimeout(() => window.location.href = 'index.html', 1000);
    }
}

// ==================== IMÓVEIS ====================
function loadProperties(filters = {}) {
    const propertiesList = document.getElementById('properties-list');
    if (!propertiesList) return;
    
    let filtered = [...propertiesDB];
    if (filters.busca) {
        const busca = filters.busca.toLowerCase();
        filtered = filtered.filter(p => 
            p.endereco.toLowerCase().includes(busca) || 
            p.descricao.toLowerCase().includes(busca)
        );
    }
    
    propertiesList.innerHTML = '';
    if (filtered.length === 0) {
        propertiesList.innerHTML = '<p>Nenhum imóvel encontrado.</p>';
        return;
    }
    
    filtered.forEach(property => {
        const card = createPropertyCard(property);
        propertiesList.appendChild(card);
    });
}

function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.onclick = () => viewProperty(property.id);
    
    card.innerHTML = `
        <div class="property-image" style="background-image: url('${property.imagem || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d'}');">
            ${property.classificacao ? `<div class="property-badge">${property.classificacao}</div>` : ''}
        </div>
        <div class="property-info">
            <div class="property-price">R$ ${property.preco.toLocaleString('pt-BR')}/mês</div>
            <div class="property-address">${property.endereco}</div>
            <div class="property-features">
                <span>${property.quartos} quartos</span>
                <span>${property.banheiros} banheiros</span>
                <span>${property.area}m²</span>
            </div>
            <button class="btn" style="width: 100%; margin-top: 1rem;" onclick="event.stopPropagation(); solicitarAluguel(${property.id})">
                Solicitar Aluguel
            </button>
        </div>
    `;
    return card;
}

function viewProperty(propertyId) {
    const property = propertiesDB.find(p => p.id === propertyId);
    if (!property) return;
    
    const modalBody = document.getElementById('property-modal-body');
    modalBody.innerHTML = `
        <img src="${property.imagem || 'https://images.unsplash.com/photo-1600585154526-990dced4db0d'}" 
             style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
        <h3>${property.endereco}</h3>
        <p class="property-price">R$ ${property.preco.toLocaleString('pt-BR')}/mês</p>
        <p><strong>Descrição:</strong> ${property.descricao}</p>
        <button class="btn" style="width: 100%; margin-top: 1rem;" onclick="solicitarAluguel(${property.id})">Solicitar Aluguel</button>
    `;
    openModal('property-modal');
}

function solicitarAluguel(propertyId) {
    if (!loggedInUser) {
        showAlert('Faça login para solicitar aluguel.', 'warning');
        setTimeout(() => window.location.href = 'index.html#cadastro', 1500);
        return;
    }
    
    const property = propertiesDB.find(p => p.id === propertyId);
    const mensagem = {
        id: Date.now(),
        remetenteId: loggedInUser.id,
        remetente: loggedInUser.nome,
        assunto: `Solicitação - ${property.endereco}`,
        mensagem: `Interesse em alugar ${property.endereco}`,
        data: new Date().toISOString(),
        lida: false,
        imovelId: propertyId
    };
    
    messagesDB.push(mensagem);
    localStorage.setItem('realStateMessages', JSON.stringify(messagesDB));
    createNotification('Nova solicitação', `${loggedInUser.nome} quer alugar ${property.endereco}`);
    showAlert('Solicitação enviada!', 'success');
}

function searchProperties() {
    const busca = document.getElementById('search-input')?.value || '';
    loadProperties({ busca });
}

// ==================== ADMIN DASHBOARD ====================
function loadAdminDashboard() {
    updateDashboardStats();
    loadPropertiesTable();
    loadMessagesTable();
}

function updateDashboardStats() {
    const stats = {
        'total-imoveis': propertiesDB.length,
        'total-clientes': usersDB.filter(u => u.tipo === 'cliente').length,
        'total-mensagens': messagesDB.length,
        'total-contratos': contractsDB.length
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

function loadPropertiesTable() {
    const tbody = document.getElementById('properties-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    propertiesDB.forEach(property => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${property.id}</td>
            <td>${property.endereco}</td>
            <td>R$ ${property.preco.toLocaleString('pt-BR')}</td>
            <td>${property.classificacao || '-'}</td>
            <td>
                <button class="btn btn-small" onclick="editProperty(${property.id})">Editar</button>
                <button class="btn btn-small btn-danger" onclick="deleteProperty(${property.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function loadMessagesTable() {
    const tbody = document.getElementById('messages-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    messagesDB.forEach(msg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${msg.remetente}</td>
            <td>${msg.assunto}</td>
            <td>${new Date(msg.data).toLocaleDateString('pt-BR')}</td>
            <td>
                <button class="btn btn-small" onclick="viewMessage(${msg.id})">Ver</button>
                <button class="btn btn-small btn-success" onclick="respondMessage(${msg.id})">Responder</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function saveProperty(e) {
    e.preventDefault();
    const id = document.getElementById('imovel-id').value;
    const data = {
        endereco: document.getElementById('imovel-endereco').value,
        preco: parseFloat(document.getElementById('imovel-preco').value),
        quartos: parseInt(document.getElementById('imovel-quartos').value),
        banheiros: parseInt(document.getElementById('imovel-banheiros').value),
        area: parseFloat(document.getElementById('imovel-area').value),
        tipo: document.getElementById('imovel-tipo').value,
        descricao: document.getElementById('imovel-descricao').value,
        imagem: document.getElementById('imovel-imagem').value,
        classificacao: document.getElementById('imovel-classificacao').value
    };
    
    if (id) {
        const index = propertiesDB.findIndex(p => p.id === parseInt(id));
        propertiesDB[index] = { ...propertiesDB[index], ...data };
        showAlert('Imóvel atualizado!', 'success');
    } else {
        propertiesDB.push({ id: Date.now(), ...data, dataCadastro: new Date().toISOString() });
        showAlert('Imóvel cadastrado!', 'success');
    }
    
    localStorage.setItem('realStateProperties', JSON.stringify(propertiesDB));
    closeModal('cadastrar-imovel-modal');
    loadPropertiesTable();
    updateDashboardStats();
}

function editProperty(id) {
    const p = propertiesDB.find(prop => prop.id === id);
    if (!p) return;
    
    document.getElementById('imovel-id').value = p.id;
    document.getElementById('imovel-endereco').value = p.endereco;
    document.getElementById('imovel-preco').value = p.preco;
    document.getElementById('imovel-quartos').value = p.quartos;
    document.getElementById('imovel-banheiros').value = p.banheiros;
    document.getElementById('imovel-area').value = p.area;
    document.getElementById('imovel-tipo').value = p.tipo;
    document.getElementById('imovel-descricao').value = p.descricao;
    document.getElementById('imovel-imagem').value = p.imagem || '';
    document.getElementById('imovel-classificacao').value = p.classificacao || '';
    openModal('cadastrar-imovel-modal');
}

function deleteProperty(id) {
    if (confirm('Excluir este imóvel?')) {
        propertiesDB = propertiesDB.filter(p => p.id !== id);
        localStorage.setItem('realStateProperties', JSON.stringify(propertiesDB));
        showAlert('Imóvel excluído!', 'success');
        loadPropertiesTable();
        updateDashboardStats();
    }
}

// ==================== MENSAGENS ====================
function viewMessage(id) {
    const msg = messagesDB.find(m => m.id === id);
    if (!msg) return;
    
    msg.lida = true;
    localStorage.setItem('realStateMessages', JSON.stringify(messagesDB));
    
    const modalBody = document.getElementById('message-modal-body');
    modalBody.innerHTML = `
        <div class="message-item">
            <strong>${msg.remetente}</strong><br>
            <small>${new Date(msg.data).toLocaleString('pt-BR')}</small>
            <h4>${msg.assunto}</h4>
            <p>${msg.mensagem}</p>
        </div>
        <button class="btn" onclick="respondMessage(${msg.id})">Responder</button>
    `;
    openModal('message-modal');
    loadMessagesTable();
}

function respondMessage(id) {
    const msg = messagesDB.find(m => m.id === id);
    if (!msg) return;
    
    closeModal('message-modal');
    const resp = prompt(`Responder para ${msg.remetente}:`);
    if (!resp) return;
    
    messagesDB.push({
        id: Date.now(),
        remetenteId: loggedInUser.id,
        remetente: 'Admin Real State',
        destinatarioId: msg.remetenteId,
        assunto: `RE: ${msg.assunto}`,
        mensagem: resp,
        data: new Date().toISOString(),
        lida: false
    });
    
    localStorage.setItem('realStateMessages', JSON.stringify(messagesDB));
    createNotification('Nova mensagem', `Resposta sobre: ${msg.assunto}`, msg.remetenteId);
    showAlert('Resposta enviada!', 'success');
    loadMessagesTable();
}

// ==================== NOTIFICAÇÕES ====================
function createNotification(titulo, mensagem, userId = null) {
    notificationsDB.push({
        id: Date.now(),
        titulo, mensagem, userId,
        data: new Date().toISOString(),
        lida: false
    });
    localStorage.setItem('realStateNotifications', JSON.stringify(notificationsDB));
    loadNotifications();
}

function loadNotifications() {
    const list = document.getElementById('notifications-list');
    const badge = document.getElementById('notification-badge');
    if (!list) return;
    
    let userNotifs = notificationsDB;
    if (loggedInUser && loggedInUser.tipo === 'cliente') {
        userNotifs = notificationsDB.filter(n => !n.userId || n.userId === loggedInUser.id);
    }
    
    const unread = userNotifs.filter(n => !n.lida).length;
    if (badge) badge.textContent = unread > 0 ? unread : '';
    
    list.innerHTML = userNotifs.slice(-10).reverse().map(n => `
        <div class="notification-item ${!n.lida ? 'unread' : ''}" onclick="markAsRead(${n.id})">
            <strong>${n.titulo}</strong><br>
            <small>${n.mensagem}</small><br>
            <small>${new Date(n.data).toLocaleDateString('pt-BR')}</small>
        </div>
    `).join('');
}

function markAsRead(id) {
    const notif = notificationsDB.find(n => n.id === id);
    if (notif) {
        notif.lida = true;
        localStorage.setItem('realStateNotifications', JSON.stringify(notificationsDB));
        loadNotifications();
    }
}

// ==================== MODAL E UTILIDADES ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function showAlert(message, type) {
    alert(message);
}
