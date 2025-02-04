document.addEventListener("DOMContentLoaded", () => {
    const btnAdicionar = document.getElementById("btnAdicionar");
    const listaTarefas = document.getElementById("listaTarefas");

    btnAdicionar.addEventListener("click", async () => {
        const titulo = document.getElementById("titulo").value;
        if (!titulo) return alert("Digite um título!");

        await fetch("/tarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo }),
        });

        location.reload();
    });

    listaTarefas.addEventListener("click", async (event) => {
        const id = event.target.getAttribute("data-id");

        if (event.target.classList.contains("btn-apagar")) {
            await fetch(`/tarefas/${id}`, { method: "DELETE" });
            location.reload();
        }

        if (event.target.classList.contains("btn-concluir")) {
            await fetch(`/tarefas/${id}`, { method: "PATCH" });
            location.reload();
        }
    });
});