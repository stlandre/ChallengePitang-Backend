# Challenge Pitang - Backend

## Scripts

No diretório do projeto, rode:

### `yarn dev` ou `yarn start`

Abra [http://localhost:3333/api](http://localhost:3333/api) para usar a api.

## Observações (environment)
* Parametrizei a aplicação pelas variáveis de ambiente. No arquivo `.env.example` você encontra exemplos para as mesmas. Crie um arquivo `.env` com tais valores e rode a aplicação.
* `vacancesPerDay` representa a segunda regra de uso explicada abaixo.
* `schedulesPerHour` representa a terceira regra de uso explicada abaixo.

# O desafio

## Descrição
Diante do cenário atual, existe uma demanda gigante de pessoas para tomar a vacina para
o COVID-19. E com isso nossa cidade está precisando de um simples sistema para realizar
os agendamentos.
O processo consiste na criação de um portal onde será possível agendar pacientes para
tomar a vacina, construir uma página para consulta dos agendamentos feitos por dia e
horário.

## Regras de uso
* O agendamento deve ser feito em uma página por um formulário.
* A disponibilidade das vagas são de 20 por dia.
* Cada horário só tem a disponibilidade de 2 agendamentos para o mesmo horário.
* Deve ser criada uma página para consultar os agendamentos.
* O resultado dos agendamentos devem ser agrupados por dia e hora do
agendamento.
* O intervalo de tempo entre um agendamento e outro é de 1 hora.

## Regras de negócio
* O paciente deve informar seu nome, data de nascimento e dia e horário para o
agendamento.
* Deverá ser checado se o formulário foi preenchido.
* Os dados do paciente/agendamentos devem ser armazenados em memória.
* Dentro da página para consultar os agendamentos deve ser possível visualizar a
listagem de agendamentos feitos e informar se o agendamento foi realizado ou não,
e qual a conclusão do atendimento(se foi realizado).
* Quando o usuário der F5 ou recarregar a página os dados não podem ser perdidos.

## Regras de execução
* Portal escrito em React, utilizar o react-datepicker para o gerenciamento das datas;
* Construir uma API em Node para receber os dados do portal.
* Axios como cliente http.
* Utilizar o Formik para a validação dos dados na view.
* IDE fica a sua escolha.

## Critérios de avaliação
* Organização do código.
* Organização dos commits.
* Organização do repositório.
* O cumprimento de todas as regras estabelecidas.
* A criação de testes.

