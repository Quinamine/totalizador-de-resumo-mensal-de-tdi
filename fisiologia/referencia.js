"use strict"
const referencia = {
    retornarColuna(inputTarget) {
        let col = inputTarget.parentElement.dataset.col;
        const colOutput = document.querySelector(".reference__output--coluna");
        let inputTargetIndex = this.retornarIndiceDe1ElementoNumaColecao(inputTarget, inputTarget.parentElement.children);
        if(inputTarget.parentElement.matches(".grid-inf__linha--movimento-de-suplementos")){
            const colunas = ["F75", "F100", "ATPU"];
            col = colunas[--inputTargetIndex];
        }
        colOutput.value = col;
    },
    retornarLinha(inputTarget) {
        const inputTargetParent = inputTarget.parentElement;
        const inputTargetAndSiblings = inputTargetParent.children;
        const inputTargetGrandParent = inputTargetParent.parentElement;
        const indicadores = inputTargetGrandParent.querySelectorAll(".ficha__indicador--pad-l");
        const linhaOutput = document.querySelector(".reference__output--indicador");
        let inputTargetIndex = this.retornarIndiceDe1ElementoNumaColecao(inputTarget, inputTargetAndSiblings);
        let lineContent = indicadores[inputTargetIndex].innerText;
        if(inputTargetParent.matches(".grid-inf__linha--movimento-de-suplementos")){
            lineContent = inputTargetAndSiblings[0].querySelector(".ficha__indicador--pad-l").innerText;
        }
        linhaOutput.value = lineContent;
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const output of outputs) output.value = "";
    },
    retornarIndiceDe1ElementoNumaColecao(elemento, colecao) {
        let indiceDoElemento = 0;
        for (const i in colecao) {
            if(colecao[i] === elemento) {
                indiceDoElemento = i;
            }
        }
        return indiceDoElemento;
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixoy], .stock-de-atpu");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {;
            referencia.retornarColuna(inputCelular);
            referencia.retornarLinha(inputCelular);
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;