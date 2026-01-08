/**
 * Middleware para verificação real de administrador via sessão.
 */
module.exports = (req, res, next) => {
    // Verifica se o usuário está logado e se é admin
    if (req.session && req.session.userRole === 'admin') {
        next();
    } else {
        // Se não for admin, redireciona para o login ou mostra erro
        res.status(403).render('error', { 
            message: 'Acesso negado. Você precisa ser um administrador para acessar esta área.',
            error: { status: 403 }
        });
    }
};