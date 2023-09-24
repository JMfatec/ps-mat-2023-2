import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import myfetch from '../utils/myfetch'
import Waiting from '../components/ui/Waiting'
import Notification from '../components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import InputMask  from 'react-input-mask'
import {DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ptLocale from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
//import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl } from '@mui/material'
//import { addYears } from 'date-fns'

export default function CarForm() {

  const navigate = useNavigate()
  const params = useParams()
  const buton = { inputProps: { 'aria-label': 'Switch demo' } };
  //const [value, setYear] = React.useState(year(Number))
  //const [value, setValue] = React.useState(dayjs('01-01-1940'));
  //const minDate = addYears(new Date())
  //const [imported, setImported] = React.useState(car.imported);

  const carDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: 2023,
    imported: false,
    plates: '',
    selling_date: '',
    selling_price: '',
  }

  const [state, setState] = React.useState({
    car: carDefaults,    
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    },
    openDialog: false,
    isFormModified: false
  })


  const {
    car,
    showWaiting,
    notification,
    openDialog,
    isFormModified
  } = state

   const maskFormatChars = {
      '9': '[0-9]',
      'a': '[A-Za-z]',
      '*': '[A-Za-z0-9]',
      '_': '[\s0-9]'           //Um espaço em branca ou um digito
  }
  
  // useEffect com vetor de dependências vazio. Será executado
  // uma vez, quando o componente for carregado
  React.useEffect(() => {
    // Verifica se existe o parâmetro id na rota.
    // Caso exista, chama a função fetchData() para carregar
    // os dados indicados pelo parâmetro para edição
    if(params.id) fetchData()
  }, [])

  
  async function fetchData() {
    // Exibe o backdrop para indicar que uma operação está ocorrendo
    // em segundo plano
    setState({ ...state, showWaiting: true })
    try {
      const result = await myfetch.get(`car/${params.id}`)
    
      // É necesário converter a data de venda de string para data
      // antes de carregá-la no componente DatePicker
      result.selling_date = parseISO(result.selling_date)
 
      setState({ ...state, showWaiting: false, car: result })
      
    } 
    catch(error) {
      setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message
        } 
      }) 
    }
  }

  function handleFieldChange(event) {
    console.log(event)
    const newCar = { ...car }
    newCar[event.target.name] = event.target.value
    
    setState({ 
      ...state, 
      car: newCar,
      isFormModified: true      // O formulário foi alterado
    })
  }

  async function handleFormSubmit(event) {
    setState({ ...state, showWaiting: true }) // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
    try {

      let result
      
      // Se existir o campo id no json de dados, chama o método PUT
      // para alteração
      if(car.id) result = await myfetch.put(`car/${car.id}`, car)
      
      // Senão, chama o método POST para criar um novo registro
      else result = await myfetch.post('car', car)
      console.log(AdapterDateFns)
      setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'success',
          message: 'Dados salvos com sucesso.'
        }  
      })  
    }
    catch(error) {
      setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message
        } 
      })  
    }
  }

  function handleNotificationClose() {
    const status = notification.severity
    
    // Fecha a barra de notificação
    setState({...state, notification: { 
      show: false,
      severity: status,
      message: ''
    }})

    // Volta para a página de listagem
    if(status === 'success') navigate('..', { relative: 'path' })
  }

  function handleBackButtonClose(event) {
    // Se o formulário tiver sido modificado, abre a caixa de diálogo
    // para perguntar se quer mesmo voltar, perdendo as alterações
    if(isFormModified) setState({ ...state, openDialog: true })

    // Senão, volta à página de listagem
    else navigate('..', { relative: 'path' })
  }

  function handleDialogClose(answer) {

    // Fechamos a caixa de diálogo
    setState({ ...state, openDialog: false })

    // Se o usuário tiver respondido quer quer voltar à página
    // de listagem mesmo com alterações pendentes, faremos a
    // vontade dele
    if(answer) navigate('..', { relative: 'path' })
  }

  //Importado? sim ou não/ true or false
  const handleSwitchChange = () => {
    //cópia do objeto car do state
    const newCar = { ...car };
  
    // Atualizar imported na cópia do obj
    newCar.imported = !newCar.imported;
  
    // Atualizar state com o novo obj car
    setState({
      ...state,
      car: newCar,
      isFormModified: true 
    });
  }

  function handleAnoooooooChange(event) {
  const newCar = { ...car };
  const { name, value } = event.target;

  // Se o campo for "year_manufacture", converta o valor para um número inteiro
  newCar[name] = name === "year_manufacture" ? parseInt(value, 10) : value;

  setState({
    ...state,
    car: newCar,
    isFormModified: true,
  });
}

function handleAnoChange(event) {
  const newCar = { ...car };
  const { name, value } = event.target;

  if (name === "year_manufacture") {
  // Converter o valor para um número inteiro
  const year = parseInt(value, 10)

  //console.log("Year:", year) 
  // Verifica se o ano está dentro do intervalo desejado
  if (year >= 1940 && year <= 2023) {
    newCar[name] = year;
  } else {
    console.log(`Ano fora do intervalo desejado ${year}`) 
  }

  } 

  setState({
    ...state,
    car: newCar,
    isFormModified: true,
  });
}

  return(
    <>

      <ConfirmDialog
        title="Atenção"
        open={openDialog}
        onClose={handleDialogClose}
      >
        Há alterações que ainda não foram salvas. Deseja realmente voltar?
      </ConfirmDialog>

      <Waiting show={showWaiting} />

      <Notification
        show={notification.show}
        severity={notification.severity}
        message={notification.message}
        onClose={handleNotificationClose}
      /> 

      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de Carros
      </Typography>

      <form onSubmit={handleFormSubmit}>

        <Box className="form-fields">
        
        <TextField 
            id="brand"
            name="brand" 
            label="Marca" 
            variant="filled"
            required
            fullWidth
            value={car.brand}
            onChange={handleFieldChange}
            autoFocus
          />

          <TextField 
            id="model"
            name="model" 
            label= "Modelo"
            variant="filled"
            required
            fullWidth
            placeholder="Ex: Palio, Gol, Ferrari, etc.."
            value={car.model}
            onChange={handleFieldChange}
          />

          <TextField 
            id="color"
            name="color" 
            label="Cor" 
            variant="filled"
            required
            fullWidth
            value={car.color}
            onChange={handleFieldChange}
          />
          
           <TextField
            type='Number'
            id="year_manufacture"
            name="year_manufacture"
            label="Ano de fabricação"
            //InputProps={{ inputProps: { min: 1940, max: 2023 } }}
            variant="filled"
            required
            fullWidth
            value={car.year_manufacture}
            onChange={handleAnoChange}
          ></TextField>

    <FormControl>
  <FormControlLabel 
    control={<Switch defaultUnchecked />} 
    label="Importado"
    id="imported"
    imported="imported"
    checked={car.imported}
    onChange={handleSwitchChange}
   />
  </FormControl>

        <InputMask
            mask="aaa-9a99"
            maskChar=" "
            value={car.plates}
            onChange={handleFieldChange} 
         >
          {
         () => <TextField 
            id="plates"
            name="plates" 
            label="Placas" 
            variant="filled"
            required
            fullWidth
          />
        }
        </InputMask>
        
        <LocalizationProvider 
         dateAdapter={AdapterDateFns} 
         adapterLocale={ptLocale}
       >

        <DatePicker
        label="Data de venda"
        value={car.selling_date}
        onChange={ value => 
        handleFieldChange({ target: { name: 'selling_date', value } }) 
        }
        slotProps={{ textField: { variant: 'filled', fullWidth: true } }}
        />

         </LocalizationProvider>

           <TextField 
            id="selling_price"
            name="selling_price" 
            label="Valor" 
            variant="filled"
            type='number'
            required
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange}
          />
         
        </Box>

        <Box sx={{ fontFamily: 'monospace' }}>
          { JSON.stringify(car) }
        </Box>

        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button 
            variant="contained" 
            color="secondary" 
            type="submit"
          >
            Salvar
          </Button>
          
          <Button 
            variant="outlined"
            onClick={handleBackButtonClose}
          >
            Voltar
          </Button>
        </Toolbar>
      
      </form>
    </>

    
  )
}