<template>
  <div id="app">

    <nav>
      //Título da Página
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Agenda</a>
      </div>
    </nav>

    <div class="container">

      //Lista erros de acesso a API.
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      //Formulário para edição de um contato
      <form @submit.prevent="salvar">

          <label>NOME (Preenchimento obrigatório)</label>
          <input type="text" placeholder="" v-model="contato.tx_nome" >
          <label>TELEFONE (Preenchimento obrigatório)</label>
          <input type="text" placeholder="" v-model="contato.tx_telefone" >
          <label>EMAIL</label>
          <input type="text" placeholder="" v-model="contato.tx_email" >
          <div> 
              <label>SEXO: </label>
              //Opções para o campo sexo
              <input type="radio" id="Masculino" value="Masculino" v-model="contato.tx_sexo">
              <label claSS="campo-sexo-masculino" for="Masculino">Masculino</label>
              <input type="radio" id="Feminino" value="Feminino" v-model="contato.tx_sexo">
              <label claSS="campo-sexo-feminino" for="Feminino">Feminino</label>
          </div>
          <input type="text" placeholder="" v-model="contato.tx_sexo" >
        
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      
      </form>

      <table>

        <thead>
          //Cabeçalho da lista de contatos
          <tr>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>EMAIL</th>
            <th>SEXO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          //Lista de contatos
          <tr v-for="contato of contatos" :key="contato.id_contato">

            <td>{{ contato.tx_nome }}</td>
            <td>{{ contato.tx_telefone }}</td>
            <td>{{ contato.tx_email }}</td>
            <td>{{ contato.tx_sexo }}</td>
            
            //Botões de edição e exclusão de contato
            <td>
              <button @click="editar(contato)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="apagar(contato)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>

<script>

//Link para acesso aos dados da API
import Contato from './services/contatos'

//Estrutura de um contato retornada pela API
export default {
  name: 'app',
  data () {
    return {
      contato:{
        id_contato: '',
        tx_nome: '',
        tx_telefone: '',
        tx_email: '',
        tx_sexo: ''
      },
      contatos: [],
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  //Metodos que consomem dados da API
  methods:{
    
    //Consome todos os contatos da API
    listar(){
      Contato.listar().then(resposta => {
        this.contatos = resposta.data
      }).catch(e => {
        this.errors = e.response.data.errors
      })
    },

    //Salva um novo contato ou Atualiza um contato em edição 
    salvar(){

      //Verifica se o contato não tem ID. Só salva o contato se não tiver ID.
      //O ID é gerado automaticamente pela API.
      if(!this.contato.id_contato){

        //Verifica se os campos Nome e Telefone estão preenchidos.
        //Estes campos são de preenchimento obrigatórios.
        if(this.contato.tx_nome && this.contato.tx_telefone){

            Contato.salvar(this.contato).then(resposta => {
              this.contato = {}
              alert('Cadastrado com sucesso!')
              this.listar()
              this.errors = {}
              resposta.data = []
            }).catch(e => {
              this.errors = e.response.data.errors
            })
        } else {

            alert('Os campo Nome e Telefone são de preenchimento obrigatórios!')
        }

      //Se o contato tem ID, então salva os  valores que foram editados.
      }else{

        //Verifica se os campos Nome e Telefone estão preenchidos.
        //Estes campos são de preenchimento obrigatórios.
        if(this.contato.tx_nome && this.contato.tx_telefone){

          Contato.atualizar(this.contato).then(resposta => {
            this.contato = {}
            this.errors = {}
            alert('Atualizado com sucesso!')
            this.listar()
            resposta.data = []
          }).catch(e => {
            this.errors = e.response.data.errors
          })

        } else {

            alert('Os campo Nome e Telefone são de preenchimento obrigatórios!')
        }

      }
      
    },

    //Envia os dados do contato para o formulário de edição
    editar(contato){
        this.contato = contato
    },
    
    //Apaga um contato da lista de contatos.
    apagar(contato){

      if(confirm('Deseja excluir o contato?')){

        Contato.apagar(contato).then(resposta => {
          this.listar()
          this.errors = {}
          resposta.data = []
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }

    
  
  }

}
</script>

//Estilo do campo sexo.
<style>

   .campo-sexo-feminino { margin: 10px; 
                 cursor: pointer;
                 color:mediumvioletred;
                }
   .campo-sexo-masculino { margin: 10px; 
                 cursor: pointer;
                 color:mediumblue;
                }

</style>
