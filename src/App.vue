<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Agenda</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>NOME (Preenchimento obrigatório)</label>
          <input type="text" placeholder="" v-model="contato.tx_nome" >
          <label>TELEFONE (Preenchimento obrigatório)</label>
          <input type="text" placeholder="" v-model="contato.tx_telefone" >
          <label>EMAIL</label>
          <input type="text" placeholder="" v-model="contato.tx_email" >
          <div> 
              <label>SEXO: </label>
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

          <tr>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>EMAIL</th>
            <th>SEXO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="contato of contatos" :key="contato.id_contato">

            <td>{{ contato.tx_nome }}</td>
            <td>{{ contato.tx_telefone }}</td>
            <td>{{ contato.tx_email }}</td>
            <td>{{ contato.tx_sexo }}</td>
            
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

import Contato from './services/contatos'

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

  methods:{
    
    listar(){
      Contato.listar().then(resposta => {
        this.contatos = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.contato.id_contato){

        if(this.contato.tx_nome && this.contato.tx_telefone){

            Contato.salvar(this.contato).then(resposta => {
              this.contato = {}
              alert('Cadastrado com sucesso!')
              this.listar()
              this.errors = {}
            }).catch(e => {
              this.errors = e.response.data.errors
            })
        } else {

            alert('Os campo Nome e Telefone são de preenchimento obrigatórios!')
        }

      }else{

        if(this.contato.tx_nome && this.contato.tx_telefone){

          Contato.atualizar(this.contato).then(resposta => {
            this.contato = {}
            this.errors = {}
            alert('Atualizado com sucesso!')
            this.listar()
          }).catch(e => {
            this.errors = e.response.data.errors
          })

        } else {

            alert('Os campo Nome e Telefone são de preenchimento obrigatórios!')
        }

      }
      
    },

    editar(contato){
        this.contato = contato
    },
    
    apagar(contato){

      if(confirm('Deseja excluir o contato?')){

        Contato.apagar(contato).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }

    }

    
  
  }

}
</script>

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
