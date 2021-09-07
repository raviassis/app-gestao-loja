import ReactLoading from "react-loading";

export default function Loading(props) {
    return (
        <ReactLoading 
            type="spin" 
            color="#3f51b5" 
            {...props}/> 
    );
}