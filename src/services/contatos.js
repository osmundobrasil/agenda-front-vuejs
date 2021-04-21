import { http } from './config'

export default	{

	salvar:(contato)=>{
		return http.post('contatos',contato);
    },
    
	atualizar:(contato)=>{
		return http.put('contatos',contato);
    },

    listar:()=>{
		return http.get('contatos')
    },
    
	apagar:(contato)=>{
		return http.delete('contatos', { data: contato })
	}
}