/**
 * Middleware para simular verificação de administrador.
 * Em um sistema real, isso verificaria a sessão ou o token JWT do usuário.
 */
module.exports = (req, res, next) => {
    // Simulação: Verificamos se existe um parâmetro 'admin=true' na query ou se uma variável local está setada
    // Para fins de teste e demonstração, vamos considerar admin se o header 'x-admin' for 'true' 
    // ou se passarmos na query string ?admin=true
    const isAdmin = req.query.admin === 'true' || req.headers['x-admin'] === 'true';

    if (isAdmin) {
        // Adiciona a informação ao objeto req para uso posterior nas rotas
        req.user = { role: 'admin' };
        next();
    } else {
        // Se não for admin, redireciona ou retorna erro
        res.status(403).render('error', { 
            message: 'Acesso negado. Esta área é restrita para administradores.',
            error: { status: 403 }
        });
    }
};
