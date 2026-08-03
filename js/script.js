/* Altere os três canais de contato somente neste bloco. */
const contatos = {
    whatsapp: "https://wa.me/5511952828364",
    instagram: "https://www.instagram.com/SEU_USUARIO/",
    email: "mailto:SEU_EMAIL@EXEMPLO.COM",
};

document.querySelectorAll("[data-contato]").forEach((link) => {
    const canal = link.dataset.contato;

    if (contatos[canal]) {
        link.href = contatos[canal];
    }
});

const cabecalho = document.querySelector(".cabecalho");

if (cabecalho) {
    const botaoMenu = cabecalho.querySelector(".menu-toggle");
    const menu = cabecalho.querySelector(".menu");
    const linksMenu = menu?.querySelectorAll("a") ?? [];
    const telaDesktop = window.matchMedia("(min-width: 1024px)");
    let ultimaPosicao = window.scrollY;
    let atualizacaoPendente = false;

    const definirMenuAberto = (aberto) => {
        cabecalho.classList.toggle("cabecalho--menu-aberto", aberto);
        document.body.classList.toggle("menu-aberto", aberto);
        botaoMenu?.setAttribute("aria-expanded", String(aberto));
        botaoMenu?.setAttribute(
            "aria-label",
            aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
        );

        if (aberto) {
            cabecalho.classList.remove("cabecalho--oculto");
        }
    };

    if (botaoMenu && menu) {
        botaoMenu.addEventListener("click", () => {
            const estaAberto = botaoMenu.getAttribute("aria-expanded") === "true";
            definirMenuAberto(!estaAberto);
        });

        linksMenu.forEach((link) => {
            link.addEventListener("click", () => definirMenuAberto(false));
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" && botaoMenu.getAttribute("aria-expanded") === "true") {
                definirMenuAberto(false);
                botaoMenu.focus();
            }
        });

        telaDesktop.addEventListener("change", (evento) => {
            if (evento.matches) {
                definirMenuAberto(false);
            }
        });
    }

    const atualizarCabecalho = () => {
        const posicaoAtual = Math.max(window.scrollY, 0);
        const estaNoTopo = posicaoAtual === 0;
        const rolouParaCima = posicaoAtual < ultimaPosicao;
        const rolouParaBaixo = posicaoAtual > ultimaPosicao;
        const menuEstaAberto = cabecalho.classList.contains("cabecalho--menu-aberto");

        if (estaNoTopo || rolouParaCima || menuEstaAberto) {
            cabecalho.classList.remove("cabecalho--oculto");
        } else if (rolouParaBaixo) {
            cabecalho.classList.add("cabecalho--oculto");
        }

        ultimaPosicao = posicaoAtual;
        atualizacaoPendente = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!atualizacaoPendente) {
                window.requestAnimationFrame(atualizarCabecalho);
                atualizacaoPendente = true;
            }
        },
        { passive: true }
    );
}
