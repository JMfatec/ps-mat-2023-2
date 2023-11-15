import { z } from 'zod'


// Data de venda não pode ser posterior à data de hoje
const maxSellingDate = new Date()   // Hoje
maxSellingDate.setFullYear(maxSellingDate.getFullYear())  // não pode ser posterior à data de hoje

const minSellingDate = new Date()
minSellingDate.setFullYear(maxSellingDate.getFullYear() - 1)

const Car = z.object({
    brand: 
    z.string()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caracteres' })
    .max(25, { message: 'A marca deve ter, no maximo, 25 caracteres' }),

    model: 
    z.string()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caracteres' })
    .max(25, { message: 'O modelo deve ter, no maximo, 25 caracteres' }),
    
    color: 
    z.string()
    .min(4, { message: 'A Cor deve ter, no mínimo, 4 caracteres' })
    .max(20, { message: 'A Cor deve ter, no maximo, 20 caracteres' }),
    
    year_manufacture: 
    z.number()
    .gte(1940, { message: 'Data de fabricação não pode ser inferior a 1940'})
    .lte(2023, { message: 'Data de fabricação não pode ser superior a 2023' })
    .nullable(),
  
  
    imported : z.boolean(),
    
  
    plates: 
    z.string()
     .trim()
    .transform(v => v.replace(' ', '')) 
    .refine(v => v.length == 8, { message: 'A placa deve conter 3 letras e 4 numeros' }),
  
  
   // z.string()
    //.max(8, { message: 'O número da placa deve conter 8 caracteres' }),
    //.length(8, { message: 'O número da placa deve conter 3 letras e 4 numeros' }),

    selling_price: 
    z.coerce.number()
    //.trim()
    //.transform(v => v.replace('R$', '')) 
    .min(2000, { message: 'Valor do veículo não pode ser inferior a 2000'})
    .nullable(),

    selling_date: 
    z.coerce.date()
    .max(maxSellingDate, { message: 'A data não pode ser posterior à data de hoje'})
    .nullable(),
   
    customer_id: 
    z.number()
    .positive({message: 'Pelo menos um cliente deve ser selecionado'})
    .nullable(),
    
  
})

export default Car