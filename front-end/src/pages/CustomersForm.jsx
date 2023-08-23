import React from 'react'
import Typography from '@mui/material/Typography'
import TextField  from '@mui/material/TextField'
import MenuItem  from '@mui/material/MenuItem'

export default function CustomersForm() {

  const [state, setState] = React.useState({
    customer: {}          //Objeto Vazio
  })

  const {
    customer
  } = state

  const states = [
    { label: 'Distrito Federal', value: 'DF'},
    { label: 'Espirito Santo', value: 'ES'},
    { label: 'Goiás', value: 'GO'},
    { label: 'Minas Gerais', value: 'MG'},
    { label: 'Paraná', value: 'PR'},
    { label: 'São Paulo', value: 'SP'},
    { label: 'Rio de Janeiro', value: 'RJ'},
    

  ]

  return(
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de clientes
      </Typography>
       <form>

       <TextField 
       id="name" 
       name="name"
       label="Nome Completo" 
       variant="filled"
       required
       fullWidth
       value={customer.name} 
       />

       <TextField 
       id="ident_document" 
       name="ident_document"
       label="CPF" 
       variant="filled"
       required
       fullWidth
       value={customer.ident_document} 
       />

       <TextField 
       id="birth_date" 
       name="birth_date"
       label="Data de Nascimento" 
       variant="filled"
       fullWidth
       value={customer.birth_date} 
       />

       <TextField 
       id="street_name" 
       name="street_name"
       label="Logradouro (Rua, Av., etc.)" 
       variant="filled"
       required
       fullWidth
       placeholder="Ex.: Rua Principal"
       value={customer.street_name} 
       />

<TextField 
       id="house_number" 
       name="house_number"
       label="N°" 
       variant="filled"
       required
       fullWidth
       value={customer.house_number} 
       />

<TextField 
       id="complements" 
       name="complements"
       label="Complemento" 
       variant="filled"
       fullWidth
       placeholder='Apto., bloco, casa, etc...'
       value={customer.complements} 
       />

       <TextField 
       id="state" 
       name="state"
       label="UF" 
       variant="filled"
       required
       fullWidth
       value={customer.state} 
       />

<TextField 
       id="municipality" 
       name="municipality"
       label="Município" 
       variant="filled"
       required
       fullWidth
       value={customer.minicipality} 
       />

<TextField
          id="state"
          name="state"
          select
          label="UF"
          variant="filled"
          fullWidth
          required
          value={customer.state}
        >
          {states.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField 
       id="phone" 
       name="phone"
       label="Telefone/Celular" 
       variant="filled"
       required
       fullWidth
       placeholder='EX.: (16)9912090978'
       value={customer.phone} 
       />

<TextField 
       id="email" 
       name="email"
       label="E-mail" 
       variant="filled"
       required
       fullWidth
       placeholder='Ex .: adolfo@gamnil.com'
       value={customer.email} 
       />
        </form>

    </>
  )
}