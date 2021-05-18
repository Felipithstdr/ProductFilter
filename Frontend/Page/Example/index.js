import React,{useState,useEffect} from 'react';
import SearchInput from './SearchInput';
import api from '../../services/api';

export default function Example(){
    const [product, setProduct] = useState([]);
    const [text, setText] = useState('');

    useEffect(()=>{
        if(text){
            api.get(`/product?filter[productName]=${text}`)
                .then((response) =>  {
                    const products = response.data;
                    setProduct(products);
                })
            
        }
    },[text]);

    return(
        <div className="App">
            <h1>Pesquisa de produtos</h1>
            <SearchInput value={text} 
                onChange={(search) => setText(search)}
            />
            {product &&  (
                <ul>
                    {product.map(product=>(
                        <li key={product.id}>
                            {product.productName}
                        </li>
                    ))}
                </ul>
                
            )}
        </div>
    )
}