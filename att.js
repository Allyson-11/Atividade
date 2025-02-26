function validarFormulario(event) {
    event.preventDefault(); 

    
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let dataNascimento = document.getElementById("data_nascimento").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let valido = true; 

    
    if (nome.length > 100) {
        alert("O nome não pode ter mais de 100 caracteres.");
        valido = false;
    }

    
    if (!validarCPF(cpf)) {
        alert("CPF inválido.");
        valido = false;
    }


    const dataAtual = new Date().toISOString().split('T')[0];
    if (dataNascimento > dataAtual) {
        alert("A data de nascimento não pode ser no futuro.");
        valido = false;
    }

    
    const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/; // 
    if (!regexTelefone.test(telefone)) {
        alert("Telefone inválido. O formato deve ser (XX) XXXXX-XXXX.");
        valido = false;
    }

    
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email)) {
        alert("E-mail inválido.");
        valido = false;
    }

    
    if (valido) {
        alert("Cadastro realizado com sucesso!");
    }

    return valido; 
}


function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); 

    
    if (cpf.length !== 11) {
        return false;
    }

    const numeros = cpf.split('');
    let soma = 0;
    let resto;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(numeros[i]) * (10 - i);
    }

    resto = soma % 11;
    if (resto < 2) {
        if (numeros[9] !== '0') return false;
    } else {
        if (numeros[9] !== (11 - resto).toString()) return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(numeros[i]) * (11 - i);
    }

    resto = soma % 11;
    if (resto < 2) {
        if (numeros[10] !== '0') return false;
    } else {
        if (numeros[10] !== (11 - resto).toString()) return false;
    }

    return true;
}