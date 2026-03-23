const aluno = {
    nome: "Charlinho",
    idade: 17,
    turma: 301,
    curso: "Informática"
}


aluno_copia = aluno

aluno_copia.idade = 25

console.log(aluno_copia)
console.log(aluno)