// Cada aluno tem um nome, data de nascimento, série em que está matriculado e um identificador único.
// Cada professor tem um nome, data de nascimento, disciplina que leciona e um identificador único.
// Cada disciplina tem um nome, um professor responsável e um conjunto de alunos matriculados.
// A escola tem um conjunto de alunos matriculados, um conjunto de professores e um conjunto de disciplinas.
// Um aluno pode se matricular em uma disciplina se houver vagas disponíveis.
// Um aluno pode cancelar a matrícula de uma disciplina que ele está matriculado.
// Um professor pode ser atribuído a uma disciplina.
// Tente implementar isso em TypeScript. Comece definindo as classes para Aluno, Professor, Disciplina e Escola. Em seguida, adicione métodos para matricular um aluno em uma disciplina, cancelar a matrícula de um aluno de uma disciplina e atribuir um professor a uma disciplina. Você pode usar herança para criar uma classe Pessoa da qual Aluno e Professor herdam, já que ambos têm nome e data de nascimento. Isso pode ajudar a reduzir a duplicação de código.

class Pessoa {
  nome: string;
  dataNasc: Date;
  id: number;
  static ultimoId = 0;

  static ProxId(): number {
    Pessoa.ultimoId += 1;
    return Pessoa.ultimoId;
  }

  constructor(nome: string, dataNasc: Date) {
    this.nome = nome;
    this.dataNasc = dataNasc;
    this.id = Pessoa.ProxId();
  }
}

class Aluno extends Pessoa {
  serie: string;

  constructor(nome: string, dataNasc: Date, serie: string) {
    super(nome, dataNasc);
    this.serie = serie;
  }
}

class Professor extends Pessoa {
  disciplina: string;

  constructor(nome: string, dataNasc: Date, disciplina: string) {
    super(nome, dataNasc);
    this.disciplina = disciplina;
  }
}

class Disciplina {
  nome: string;
  professor: Professor;
  alunos: Aluno[];
  maxAlunos: number;

  constructor(
    nome: string,
    professor: Professor,
    alunos: Aluno,
    maxAlunos: number
  ) {
    this.nome = nome;
    this.professor = professor;
    this.alunos = [];
    this.maxAlunos = maxAlunos;
  }
}

class Escola {
  nome: string;
  disciplinas: Disciplina[];
  alunos: Aluno[];
  professores: Professor[];

  constructor(nome: string) {
    this.nome = nome;
    this.disciplinas = [];
    this.alunos = [];
    this.professores = [];
  }
  matricularAluno(aluno: Aluno, disciplina: Disciplina): string {
    if (disciplina.alunos.length < disciplina.maxAlunos) {
      disciplina.alunos.push(aluno);
      return `Aluno ${aluno.nome}, matriculado com sucesso na disciplina ${disciplina.nome}`;
    } else {
      return `Não foi possível matricular o aluno ${aluno.nome} na disciplina ${disciplina.nome} porque a disciplina já está cheia.`;
    }
  }
  cancelarMatricula(aluno: Aluno, disciplina: Disciplina): string {
    let index = disciplina.alunos.findIndex((a) => a.id === aluno.id);
    if (index != -1) {
      disciplina.alunos.splice(index, 1);
      return `Matricula do aluno ${aluno.nome}, removida da disciplina ${disciplina.nome}`;
    } else {
      return `O aluno ${aluno.nome}, não faz parte da disciplina ${disciplina.nome}`;
    }
  }

  atribuirProfessor(professor: Professor, disciplina: Disciplina): string {
    disciplina.professor = professor;
    return `Professor ${professor.nome} foi atribuído à disciplina ${disciplina.nome} com sucesso.`;
  }

  adicionarAluno(aluno: Aluno): string {
    this.alunos.push(aluno);
    return `Aluno ${aluno.nome}, cadastrado na escola!`;
  }

  adicionarProfessor(professor: Professor): string {
    this.professores.push(professor);
    return `Professor ${professor.nome}, cadastrado na escola!`;
  }

  adicionarDisciplina(disciplina: Disciplina): string {
    this.disciplinas.push(disciplina);
    return `Disciplina ${disciplina.nome} cadastrada na escola!`;
  }
}
