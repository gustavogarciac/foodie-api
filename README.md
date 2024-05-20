Foodie App:
Full stack application where user can go from buying items from a restaurant to receive it in its home.

# Requisitos Funcionais (RF):
- [x] Deve ser possível cadastrar um prato.
- [] Deve ser possível se autenticar
- [] Deve ser possível listar pratos.
- [x] Deve ser possível deletar um prato.
- [x] Deve ser possível atualizar um prato.
- [X] Deve ser possível receber dados de um prato específico.
- [] Deve ser possível adicionar um prato aos favoritos.
- [X] Deve ser possível vincular pratos a categorias.
- [X] Deve ser possível listar todos os pratos vinculados a uma categoria.
- [] Deve ser possível atualizar preços promocionais em um restaurante.
- [] Deve ser possível listar pratos em um carrinho.
- [] Deve ser possível realizar um pedido que irá conter os dados dos pratos do carrinho.
- [] Deve ser possível relatar métricas do restaurante.
- [] Deve ser possível receber o histórico de pedidos.
- [] Deve ser possível calcular a distância entre o restaurante e o usuário.

# Regras de Negócio (RN):
- [] Não deve ser possível cadastrar pratos que possuam o mesmo slug.
- [] Caso o usuário adicione duas vezes o mesmo prato ao carrinho, deve-se somar as quantidades.
- [] Se a distância entre o usuário e o restaurante exceder 25km não poderá ocorrer o pedido.
- [] A taxa de frete deverá ser de R$1,50 por km rodado.

# Requisitos Não Funcionais (RNFs):
- [] A senha do usuário deve ser criptografa.
- [] A autenticação ocorrerá através de HTTP Cookies.
- [] O backend deverá ser documentado com swagger ui.
- [] O backend deverá ser feito utilizando Fastify.
- [] A validação ocorrerá com o Zod.
- [] Todo caso de uso deve possuir seu teste unitário.
- [] Implementação do Github Overflows
- [] Os dados devem ser persistidos utilizando um banco PostgreSQL
- [] As listas de dados devem estar paginadas com até 10 itens por página.
- [] O backend deverá ser criado com a utilização do BunJS.
