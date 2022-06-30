import fs from "fs/promises"
import path from "path";

const ProductDetails = (props) => {
    const {loadedProduct} = props;

    if(!loadedProduct){
      return <>Loading</>
    }
  return (
    <>
      <div>{loadedProduct.id}</div>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData(){
  // access database
  const filePath = path.join(process.cwd(), "data","dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function  getStaticProps(context){
    const {params} = context;
    const productId = params.pid;

    const data = await getData();

    //geting product of this page from retrived data
    const product = data.products.find(product => product.id === productId);

    if(!product){
      return {
        notFound: true
      }
    }
    return {
      props: {
        loadedProduct: product
      }
    };
}


export async function getStaticPaths(){

  //dynamically fetching paths
  const data = await getData();

  //create paths props
  const paths = data.products.map(product=> ({params: {pid: product.id}}))

  return {
    paths ,
    fallback: true
  }
  // return {
  //   paths:[
  //     {params: {pid:"p1"}},
  //     {params: {pid:"p2"}},
  //     {params: {pid:"p3"}}
  //   ],
  //   fallback: false
  // };
}
export default ProductDetails;
