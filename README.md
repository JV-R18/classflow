
# ClassFlow 2.0 - Sistema de Disponibilidade de Professores

Este projeto é um sistema offline desenvolvido em HTML + JavaScript para controle de horários e marcação de disponibilidade de professores com controle de acesso.

## ✅ Funcionalidades

- Login com validação
- Cadastro de novos professores
- Painel individual com grade de horários interativos (Seg-Sáb, 07h–21h)
- Marcação de disponibilidade por clique (✅ livre, ❌ ocupado)
- **Painel de Administrador:** visualiza todas as grades (modo leitura)
- **Controle de acesso:** apenas `jv_rezende_` pode criar outros administradores
- Dados salvos localmente (LocalStorage)
- Sem necessidade de servidor, banco de dados ou instalação

## 🔐 Acesso Especial

Para criar outros administradores, é obrigatório estar logado como:

```
Usuário: jv_rezende_
Senha:   adm1234
```

## 💡 Como usar

1. Abra o arquivo `index.html` em qualquer navegador
2. Faça login ou crie uma conta
3. Professores acessam sua própria grade
4. Administradores visualizam todas as grades

---

## 💬 Sugestão de Commit

**Título:**  
```
Versão 2.0: Adicionada segurança de administrador
```

**Descrição:**  
```
- Apenas o usuário 'jv_rezende_' pode criar contas de administrador
- Painel de admin exibe grade de todos os professores
- Professores só veem e editam sua própria disponibilidade
- Layout e funcionamento 100% offline
```
