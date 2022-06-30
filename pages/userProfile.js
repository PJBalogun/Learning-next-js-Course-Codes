function UserProfile(props){
    return <h1>{props.userName}</h1>
}

export default UserProfile;
export async function getServerSideProps(context){
    const {params, req , res} = context;
     
    return {
        props :{
            userName: "Max"
        }
    }
}