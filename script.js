const api = "http://localhost:3000";

function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  fetch(`${api}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({usuario, senha})
  })
    .then(res => res.json())
    .then(data => {
      if (data.sucesso) {
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("tipo", data.tipo);
        if (data.tipo === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "professor.html";
        }
      } else {
        document.getElementById("erro").textContent = data.mensagem;
      }
    });
}

function cadastrar() {
  const usuario = document.getElementById("novoUsuario").value;
  const senha = document.getElementById("novaSenha").value;

  fetch(`${api}/cadastrar`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({usuario, senha})
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("mensagemCadastro").textContent = data.mensagem;
    });
}

function salvarGrade() {
  const linhas = document.querySelectorAll("#tabelaHorarios tr");
  const grade = Array.from(linhas).map(linha =>
    Array.from(linha.querySelectorAll("td")).map(td => td.classList.contains("active"))
  );
  const usuario = localStorage.getItem("usuario");

  fetch(`${api}/salvar-grade`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({usuario, grade})
  });
}

function carregarGrade() {
  const tabela = document.getElementById("tabelaHorarios");
  const horarios = ["07:30", "08:20", "09:10", "10:00", "10:50", "11:40"];
  horarios.forEach(horario => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${horario}</td>` + "<td></td>".repeat(5);
    tabela.appendChild(tr);
  });

  tabela.addEventListener("click", e => {
    if (e.target.tagName === "TD" && e.target.cellIndex !== 0) {
      e.target.classList.toggle("active");
    }
  });

  const usuario = localStorage.getItem("usuario");
  document.getElementById("usuarioLogado").textContent = usuario;

  fetch(`${api}/obter-grade?usuario=${usuario}`)
    .then(res => res.json())
    .then(data => {
      const linhas = tabela.querySelectorAll("tr");
      data.grade.forEach((linha, i) =>
        linha.forEach((celula, j) => {
          if (celula) linhas[i].children[j + 1].classList.add("active");
        })
      );
    });
}

function carregarGradesProfessores() {
  fetch(`${api}/grades-todos`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("gradesProfessores");
      for (const prof in data) {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${prof}</h3><pre>${JSON.stringify(data[prof])}</pre>`;
        container.appendChild(div);
      }
    });

  document.getElementById("usuarioLogado").textContent = localStorage.getItem("usuario");
}

if (document.getElementById("tabelaHorarios")) carregarGrade();
if (document.getElementById("gradesProfessores")) carregarGradesProfessores();

