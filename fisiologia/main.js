"use strict"
const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-totaleixoy], .stock-de-atpu");
        for (let i = 0; i < inputsCelulares.length; i++) {          
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }  
    },
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        const campoDeObs = document.querySelector(".obs__input");
        inputsNaoCelulares.forEach( inputTarget => {
            inputTarget.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${inputTarget.id}`, inputTarget.value));
            inputTarget.value = localStorage.getItem(`${keyPrefix}-${inputTarget.id}`);
        });
        campoDeObs.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-input-obs`, campoDeObs.textContent));
        campoDeObs.textContent = localStorage.getItem(`${keyPrefix}-input-obs`);
    }
}
const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) { 
        if(inputTarget.dataset.totaleixox) {
            let classNameDosOperandos = inputTarget.dataset.totaleixox;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
            celulaDeSaida.value = this.somar(operandos); 
        }
        if(inputTarget.dataset.totaleixoy) {
            let classNameDosOperandos = inputTarget.dataset.totaleixoy;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            let total = this.somar(operandos);
            if(inputTarget.parentElement.matches(".grid-inf__linha--movimento-de-suplementos")) {
                let classNameDeGasto = classNameDosOperandos.split("-menos-")[1];
                const gasto = document.querySelector(`.${classNameDeGasto}`);
                total = total - gasto.value * 2;
            }
            celulaDeSaida.value = total; 
        }
        if(inputTarget.dataset.totalgeral) {
            let classNameDosOperandos = inputTarget.dataset.totalgeral;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            celulaDeSaida.value = this.somar(operandos); 
        }
        if(inputTarget.dataset.letalidade) {
            let classNameDosOperandos = inputTarget.dataset.letalidade;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.letalidadeoutput}`);
            let valorDeC = this.somar(operandos);
            let classNameDeC3 = classNameDosOperandos.split("-div-")[0];
            let valorDeC3 = document.querySelector(`.${classNameDeC3}`);
            let letalidade = valorDeC3.value / valorDeC * 100;
            letalidade = (Number.isInteger(letalidade)) ? letalidade : letalidade.toFixed(1);
            celulaDeSaida.value = `${letalidade}%`;
        }
        if(inputTarget.dataset.letalidadegeral) {
            let classNameDosOperandos = inputTarget.dataset.letalidadegeral;
            inputTarget.classList.add(`${classNameDosOperandos}`);
            const operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            const celulaDeSaida = document.querySelector(`.${inputTarget.dataset.letalidadegeraloutput}`);
            let valorDeC = this.somar(operandos);
            let classNameDeC3 = classNameDosOperandos.split("-div-")[0];
            let valorDeC3 = document.querySelector(`.${classNameDeC3}`);
            let letalidade = valorDeC3.value / valorDeC * 100;
            letalidade = (Number.isInteger(letalidade)) ? letalidade : letalidade.toFixed(1);
            celulaDeSaida.value = `${letalidade}%`;
        }
    },
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    }
}
function escutarEventos() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixoy]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}
window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




