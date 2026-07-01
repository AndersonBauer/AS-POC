# 🛒 Mini E-commerce

Projeto desenvolvido para a disciplina de Programação Orientada à Componentes (POC), utilizando React e JSON Server para simular um pequeno sistema de e-commerce.

O sistema permite visualizar produtos, consultar detalhes, adicionar itens ao carrinho respeitando o estoque disponível e realizar o gerenciamento completo dos produtos através de cadastro, edição e exclusão.

---

# 🚀 Tecnologias Utilizadas

- React
- React Router DOM
- Context API
- JSON Server
- Fetch API
- Tailwind CSS
- Vite

---

# 📂 Estrutura do Projeto

src
│
├── components
│   ├── Header.jsx
│   └── ProductCard.jsx
│
├── context
│   └── CartContext.jsx
│
├── pages
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── ProductForm.jsx
│   └── NotFound.jsx
│
├── App.jsx
├── main.jsx
└── index.css

---

# 📄 Páginas

## Home

Responsável por listar todos os produtos cadastrados na API.

Cada produto apresenta:

- Imagem
- Nome
- Preço
- Estoque
- Botão para visualizar detalhes

---

## Detalhes do Produto

Exibe todas as informações do produto selecionado.

Permite:

- Visualizar descrição
- Visualizar estoque
- Adicionar ao carrinho
- Editar produto
- Excluir produto

Caso o estoque seja zero ou o limite seja atingido, o botão de adicionar é bloqueado.

---

## Carrinho

O carrinho é compartilhado globalmente utilizando Context API.

Funcionalidades:

- Adicionar produtos
- Remover produtos
- Aumentar quantidade
- Diminuir quantidade
- Cálculo automático do valor total
- Bloqueio quando o estoque máximo é atingido

---

## Cadastro de Produto

Permite cadastrar novos produtos através de um formulário.

Campos:

- Nome
- Descrição
- Preço
- URL da imagem
- Estoque

Todos os campos possuem validação.

Após o cadastro o usuário é redirecionado para a página inicial.

---

## Editar Produto

Utiliza o mesmo formulário do cadastro.

Os dados são carregados automaticamente através do ID recebido pela rota.

Após salvar, o usuário retorna para a Home.

---

## Página 404

Página exibida quando uma rota inexistente é acessada.

---

# 🛒 Context API

O carrinho foi implementado utilizando Context API.

O contexto armazena:

- Produtos adicionados
- Quantidade de cada produto
- Valor total da compra

Também disponibiliza as funções:

- addToCart()
- updateQuantity()
- removeFromCart()
- clearCart()

Esse contexto é consumido por:

- Header
- ProductDetail
- Cart

Isso evita o compartilhamento de estados através de props.

---

# 🌐 Consumo da API

Foi utilizado JSON Server para simular um backend REST.

Endpoint principal:

http://localhost:3001/products

Operações realizadas:

### GET

Listagem dos produtos

GET /products

Buscar produto por ID

GET /products/:id

---

### POST

Cadastrar produto

POST /products

---

### PUT

Editar produto

PUT /products/:id


---

### DELETE

Excluir produto

DELETE /products/:id

---

## Tratamento de erros

Durante as requisições são utilizados:

- Loading enquanto os dados são carregados
- Tratamento de erros utilizando `.catch()`
- Redirecionamento para página 404 quando o produto não é encontrado

---

# ✔ Hooks Utilizados

## useState

Controle de estados locais como:

- Produtos
- Formulários
- Loading

---

## useEffect

Responsável pelas requisições à API sempre que a página é carregada.

---

## useContext

Utilizado para compartilhar o carrinho entre todos os componentes da aplicação.

---

## useRef

Utilizado no formulário para focar automaticamente no primeiro campo inválido durante as validações.

---

## useNavigate

Responsável pelos redirecionamentos após cadastro, edição e exclusão.

---

## useParams

Captura o ID enviado pela URL para consultar ou editar um produto.

---

# ✔ Validações

## Cadastro

- Todos os campos obrigatórios
- Preço maior ou igual a zero
- Estoque maior ou igual a zero
- Mensagens de erro abaixo dos campos
- Foco automático no primeiro campo inválido

---

## Carrinho

Não permite:

- Quantidade maior que o estoque
- Adicionar produtos sem estoque
- Quantidade inferior a um

---

# ▶ Como executar o projeto

## Instalar dependências

npm install

---

## Executar React

npm run dev

---

## Executar JSON Server

npx json-server db.json --port 3001

---

A aplicação ficará disponível em:

http://localhost:5173

API:

http://localhost:3001/products

---

# 📸 Screenshots

## Home

![Tela inicial](./screenshots/Home-AS-POC.jpeg)

> Tela inicial do site, onde é carregado os iten disposiveis pelo primeiro acesso ao banco.

---

## Detalhes do Produto

![Tela de Detalhes](./screenshots/Detalhes-AS-POC.jpeg)

> Tela onde é mostrado os detalhes dos itens.

---

## Cadastro

![Tela de Cadastro](./screenshots/CadastroDeProdutoValido.jpeg)

> Tela para cadastro de produtos novos

---

## Validação do Cadastro

![Tela de demonstração de erro](./screenshots/FormularioInvalido.jpeg)

> Tela do formulario com demonstrações de erros.

---

## Edição

![Tela de Edição de Produtos](/screenshots/TelaDeEditarProduto.jpeg)

> Tela onde pode ser feita a edição das informações do produto.

---

## Carrinho

![Tela do Carrinho](./screenshots/CarrinhoComItens.jpeg)

> Tela do carrinho com 2 itens adicionado um deles sem atingir o estoque maximo e o outro atingindo o estoque maximo (sem a possibilidade de continuar adicionando caso o limite seja atingido).

---

## Estoque Máximo

![Demonstração de Limite de Estoque Atingido](./screenshots/EstoqueMaximoAtingido.jpeg)

> Tela de edição mostrando o botão desabilitado ao atingir ou zerar o estoque (No caso o produto tem 0 tem estoque).

---

## Página 404

![Pagina 404](./screenshots/404NotFound.jpeg)

> Pagina de não encontrado, para casos de erro de url ou coisas parecidas.
---

# 👨‍💻 Autores

Anderson Bauer & João Vitor Daitx

Projeto desenvolvido como avaliação prática da disciplina de Programação Orientada à Componentes.
