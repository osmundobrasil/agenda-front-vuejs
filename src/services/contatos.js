import { http } from './config'

//Acessando as funcionalidades da API
export default	{

	//Salva um contato
	salvar:(contato)=>{
		return http.post('contatos',contato);
    },
    
	//Atualiza um contato
	atualizar:(contato)=>{
		return http.put('contatos',contato);
    },

	//Lista todos os contatos
    listar:()=>{
		return http.get('contatos')
    },
    
	//Apagar um contato
	apagar:(contato)=>{
		return http.delete('contatos', { data: contato })
	}
}